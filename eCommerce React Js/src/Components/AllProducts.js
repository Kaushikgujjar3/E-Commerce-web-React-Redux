// Axios
import axios from 'axios';
import { useEffect, useState } from 'react';

// icon
import { IoMdStar } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../Redux/slice';


const AllProducts = () => {

    // Example API endpoints
    const apiUrl1 = 'https://dummyjson.com/products';
    const apiUrl2 = 'https://dummyjson.com/products/categories';

    // Function to make multiple API calls
    async function makeMultipleApiCalls() {
        try {
            // Make multiple requests in parallel
            const responseArray = await axios.all([
                axios.get(apiUrl1),
                axios.get(apiUrl2),
                // Add more API calls as needed
            ]);

            // Extract data from responses
            const responseData1 = responseArray[0].data;
            const responseData2 = responseArray[1].data;
            // Extract data from additional responses as needed

            // Process the data or perform further actions
            console.log('Response from API 1:', responseData1);
            console.log('Response from API 2:', responseData2);
            // Process additional responses as needed
        } catch (error) {
            console.error('Error making API calls:', error);
        }
    }

    // Call the function to make multiple API calls
    makeMultipleApiCalls();


    // --------------------------------------------------------
    const dispatch = useDispatch()

    // Search
    const searchData = useSelector((state) => state.dataSlice.searchProducts)

    const searchInputValue = useSelector((state) => state.dataSlice.searchInput)

    // console.log(SearchData.products);

    // All 
    const [allProducts, setAllProducts] = useState([]);

    const { category } = useParams();

    // get products
    useEffect(() => {

        let url;
        if (!category) {
            // get all Products
            url = 'https://dummyjson.com/products?limit=100&skip=0';
        }
        else {
            // get multiple product of one Categories in arrayOfObject with All Details
            url = `https://dummyjson.com/products/category/${category}`;
        }
        axios.get(url)
            .then(function (response) {
                // console.log(response.data.products);

                setAllProducts(response.data.products)
            })
            .catch(function (error) {
                console.log(error);
            })

    }, [category]);



    return (
        <>
            {/* <h1>AllProducts</h1> */}
            <div className="products-box">

                <div className="inner-box">
                    {
                        searchInputValue !== '' ?
                            searchData.map((value, index) => {
                                return (
                                    <div className="product-item" key={index}>

                                        <div className="item-box d-flex align-items-center text-black">

                                            <div className="col-4 product-img">
                                                <img src={value.thumbnail} alt="" />
                                            </div>

                                            <div className="col-8 product-details d-flex">
                                                <div className="left-details col-8">

                                                    <h4>{value.title}</h4>

                                                    <div className="rate-and-review d-flex align-items-center my-2">
                                                        <div className='green-rate d-flex align-items-center'>
                                                            <span className='pe-1'>4.3</span> <IoMdStar />
                                                        </div>
                                                        {/* Stock and Rating , Stock=Review */}
                                                        <div className='rating-stock ms-2'>
                                                            <span>{value.rating} Ratings & </span>
                                                            <span>{value.stock} Reviews</span>
                                                        </div>
                                                    </div>

                                                    <ul className='m-0 p-0 description-box'>
                                                        <li className='mb-1'>{value.description}</li>
                                                        <li className='mb-1'>{value.brand}</li>
                                                        <li>{value.category}</li>
                                                    </ul>

                                                </div>
                                                <div className="right-details col-4">
                                                    <div className='price-menu'>
                                                        <h5 className='m-0'>₹{value.price}</h5>
                                                        <div className='price-discount'>
                                                            <span className='strike-price'>₹{value.price * 2} </span>
                                                            <span className='discount-percentage'>{value.discountPercentage}% off</span>
                                                        </div>
                                                    </div>
                                                    <div className="addCart-btn mt-2">
                                                        <button onClick={() => dispatch(addCart(value))}>Add To Cart</button>
                                                    </div>
                                                    <div className="addCart-btn mt-2">
                                                        <Link to={`/product/${value.id}`}>
                                                            <button>View Product</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) :

                            allProducts.map((value, index) => {
                                return (
                                    <div className="product-item" key={index}>

                                        <div className="item-box d-flex align-items-center text-black">

                                            <div className="col-4 product-img">
                                                <img src={value.thumbnail} alt="" />
                                            </div>

                                            <div className="col-8 product-details d-flex">
                                                <div className="left-details col-8">

                                                    <h4>{value.title}</h4>

                                                    <div className="rate-and-review d-flex align-items-center my-2">
                                                        <div className='green-rate d-flex align-items-center'>
                                                            <span className='pe-1'>4.3</span> <IoMdStar />
                                                        </div>
                                                        {/* Stock and Rating , Stock=Review */}
                                                        <div className='rating-stock ms-2'>
                                                            <span>{value.rating} Ratings & </span>
                                                            <span>{value.stock} Reviews</span>
                                                        </div>
                                                    </div>

                                                    <ul className='m-0 p-0 description-box'>
                                                        <li className='mb-1'>{value.description}</li>
                                                        <li className='mb-1'>{value.brand}</li>
                                                        <li>{value.category}</li>
                                                        {
    console.log("www",(value.category))

                                                        }
                                                    </ul>
                                                </div>
                                                <div className="right-details col-4">
                                                    <div className='price-menu'>
                                                        <h5 className='m-0'>₹{value.price}</h5>
                                                        <div className='price-discount'>
                                                            <span className='strike-price'>₹{value.price * 2} </span>
                                                            <span className='discount-percentage'>{value.discountPercentage}% off</span>
                                                        </div>
                                                    </div>
                                                    <div className="addCart-btn mt-2">
                                                        <button onClick={() => dispatch(addCart(value))}>Add To Cart</button>
                                                    </div>
                                                    <div className="addCart-btn mt-2">
                                                        <Link to={`/product/${value.id}`}>
                                                            <button>View Product</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </>
    )
}

export default AllProducts;