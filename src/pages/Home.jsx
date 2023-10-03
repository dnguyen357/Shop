import { useState,useEffect, useContext } from 'react'
import { useLocation,Link } from 'react-router-dom';
import React from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import '../components/home.css'

export default function Home(){
    const [products,setProducts] =useState([]);
    const categories =["men's clothing","jewelery","electronics","women's clothing"]
    // const [filtered,setFiltered] =useState([]);
    const [category,setCategory] = useState("jewelery")
    const BASE_URL = `https://store-dcq8.onrender.com/api`

    async function fetchProducts() {
        const response = await fetch(`${BASE_URL}/products`)
        const result = await response.json()
        console.log(result)
        setProducts(result)
        const randomNumber = Math.floor(Math.random()*categories.length);
        const category = categories[randomNumber];
        setCategory(category)
    }

    
    useEffect(()=>{
        fetchProducts()
    },[])
    const filtered= products.filter((product)=> product.category === category)
    

    // function Products({product}){
    //     return(
    //         <div className="product">
    //             {/* <Link to={`/Product/${product.id}`} style={{ textDecoration: 'none' ,color: 'black',}}> */}
    //                 <img src={product.image} alt="product-image" className='image'/>
    //                 <h4>{product.title}</h4>
    //             {/* </Link> */}
    //             <h4>Price: ${product.price}</h4>
    //         </div>
            
    //     )
    // }
    return (
        <>
            {
                <Slider autoplay={5000}>
	                    {filtered.map((product, index) => (
                            
		            <div key={index}>
                        <Link to={`/Product/${product._id}`} style={{ textDecoration: 'none' ,color: 'black',}} >
                            <div className="center">
			                    <div className="center-left">
                                    <img src={product.image} alt="product-image" className='image'/>
			                    </div>
                                <div className="center-right">
                                    <p className='center-right-title'>{product.title}</p>
                                    <p className="center-right-p">About this item</p>
                                    <p className='center-right-description'>{product.description}</p>
                                </div>
                            </div>
                        </Link>
		            </div>
                   
	                ))}
                </Slider>
            
            }
        </>
    )
}