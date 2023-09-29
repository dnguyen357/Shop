import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
export default function ProductDetail(){
    const { id } = useParams();
    const [product, setProduct] =useState([]);
    const BASE_URL = `http://store-dcq8.onrender.com/api/products`
    useEffect(() => {
        async function fetchProduct() {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await response.json();
            setProduct(data);

        }
        fetchProduct();
        

    }, [])

    function ProductPage({product}){
        return(
            <>
                <div className="single-product-left">
                    <div className="single-product-left-sub">
                        <img src={product.image} alt="product-image"/>
                    </div>
                    <div className="single-product-left-sub">
                        <p className="single-product-title">{product.title}</p>
                        <p className="single-product">About this item</p>
                        <ul>
                            <li>
                                <p className="single-product-discription">{product.description}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                    
                <div className="single-product-right">
                <p className="single-product-price">Price:</p>
                    <p className="single-product-price">${product.price}</p>
                    <button className="single-product-add-to-cart" onClick={()=> addToCart(product.id)}>Add To Cart</button>
                </div>
                
            </>
        )

    }
    return(
        <div className="product-detail"> 
        {
            <ProductPage product={product}/>
        }
        </div>
    )
}