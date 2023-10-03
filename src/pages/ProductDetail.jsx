import { Link } from "react-router-dom"
import { ShopContext } from '../components/shopList';
import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';

export default function ProductDetail(){
    const { addToCart,isAdded,userId,token}=useContext(ShopContext)
    const { id } = useParams();
    const [product, setProduct] =useState([]);
    const [quantity, setQuantity] = useState(1);
    const BASE_URL = `http://store-dcq8.onrender.com/api/products`
    useEffect(() => {
        async function fetchProduct() {
            const response = await fetch(`http://store-dcq8.onrender.com/api/products/${id}`);
            const data = await response.json();
            console.log(data)
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
                    <button className="single-product-add-to-cart" onClick={(e)=> addToCart(e,token,userId,product._id,quantity,product.price,product.title,product.image)}>Add To Cart</button>
                </div>
                
            </>
        )

    }
    return(
        <div className="product-detail"> 
        {
            <ProductPage key={product._id} product={product}/>
        }
        </div>
    )
}