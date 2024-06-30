// Axios
import axios from "axios";
import { useEffect, useState } from "react";

// Icon
import { IoMdStar } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

const SingleProductView = () => {

    const { id } = useParams();
    const [singleProductView, setSingleProductView] = useState(null)
    const [singleImage, setSingleImage] = useState();

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${id}`)
            .then(function (response) {
                // console.log(response.data);
                setSingleProductView(response.data);

                // store default Image in state
                setSingleImage(response.data.thumbnail);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    // View Single Image
    const viewSingleImage = (img) => {
        setSingleImage(img);
    }

    return (
        singleProductView != null &&
        <>
            <section className="single-product-box">
                {/* BreadCrumb */}
                <div className="my-breadcrumb ms-5 mt-4">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <Link to='/'>
                                    Home
                                </Link>
                            </li>
                            <li class="breadcrumb-item active text-capitalize" aria-current="page">
                                {singleProductView.category}
                            </li>
                        </ol>
                    </nav>
                </div>
                {/* Product */}
                <div className='product-view'>
                    <div className="main-box p-3 d-flex flex-wrap align-items-center">
                        <div className="col-5 px-2">
                            <div className="left-img-box d-flex">
                                <div className="small-img-box col-2 me-2">
                                    {
                                        singleProductView != null && singleProductView.images.map((imgItem) => {
                                            return (
                                                <>
                                                    <a href="#">
                                                        <div className="s-img p-1 mb-3">
                                                            <img src={imgItem} alt="" onClick={() => viewSingleImage(imgItem)} />
                                                        </div>
                                                    </a>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                                <div className="big-img-box col-10">
                                    <div className="big-img h-100 d-flex align-items-center p-2">
                                        <img src={singleImage} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-7 px-2">
                            <div className="details-box ms-4">
                                <h4 className=''>{singleProductView.title}</h4>

                                <div className="rate-and-review d-flex align-items-center my-2">
                                    <div className='green-rate d-flex align-items-center'>
                                        <span className='pe-1'>4.3</span> <IoMdStar />
                                    </div>
                                    {/* Stock and Rating , Stock=Review */}
                                    <div className='rating-stock ms-2'>
                                        <span>{singleProductView.rating} Ratings & </span><span> {singleProductView.stock} Reviews</span>
                                    </div>
                                </div>

                                <div className="price-box">
                                    <span className='extra-off'>Extra ₹500 off</span>
                                    <div className="d-flex align-items-center">
                                        <div className='real-price'>
                                            <span>₹{singleProductView.price}</span>
                                        </div>
                                        <div className='sub-price'>
                                            <span>₹{singleProductView.price * 2}</span>
                                        </div>
                                        <div className='discount-price'>
                                            <span>{singleProductView.discountPercentage}% off</span>
                                        </div>
                                    </div>
                                </div>

                                <ul className='description-box m-0 p-0'>
                                    <span className="description">Description</span>
                                    <li className='ms-3'>{singleProductView.description}</li>
                                    <li className='ms-3'>{singleProductView.brand}</li>
                                    <li className='ms-3'>{singleProductView.category}</li>
                                </ul>

                                <div className="buy-btn d-flex mt-3">
                                    <div className='col-4'>
                                        <button className='w-100 btn-1'>ADD TO CART</button>
                                    </div>
                                    <div className='col-4 ms-2'>
                                        <button className='w-100 btn-2'>BUY NOW</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleProductView;