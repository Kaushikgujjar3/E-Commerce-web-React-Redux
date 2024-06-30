// Axios
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Categories = () => {

    const [allCategories, setAllCategories] = useState([]);

    // get all categories
    useEffect(() => {
        axios.get('https://dummyjson.com/products/categories')
            .then(function (response) {
                // console.log(response.data);
                setAllCategories(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    return (
        <>
            {/* <div>Categories</div> */}
            <div className="categories-box">
                <div className="inner-box">
                    <span className="title">Filters</span>
                    <div className="p-3">
                        <h6 className='mb-3'>CATEGORIES</h6>
                        <ul className='m-0 p-0'>
                            <li className='mb-2 d-block'>
                                <Link to='/'>
                                    <input type="button" className='form-control text-capitalize' value="all" />
                                </Link>
                            </li>
                            {
                                allCategories.map((item,index) => {
                                    return (
                                        <li className='mb-2 d-block' key={index}>
                                            <Link to={`/${item.slug}`}>
                                                <input type="button" className='form-control text-capitalize' value={item.slug} />
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories;