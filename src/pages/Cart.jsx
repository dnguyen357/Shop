import { useState,useEffect } from 'react'
import '../App.css'
import { ShopContext } from '../components/shopList';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Cart({products}){
    const { cartList,addToCart,deleteFromCart,updateCart,getTotalCost }= useContext(ShopContext)
    const totalAmount =getTotalCost()
    const navigate=useNavigate();
    function Cart({product}){
        return (
            <div key={product.id} className="product-cart">
                 <Link to={`/Product/${product.id}`} style={{ textDecoration: 'none' ,color: 'black',}}>
                    <img src={product.image} alt="product-image" className='image'/>
                    <h4>{product.title}</h4>
                </Link>
                <h4>Price: {product.price}</h4>
                <div>
                    <button onClick={()=>{deleteFromCart(product.id)}}>-</button>
                    <input value={cartList[product.id]} onChange={(e)=>{updateCart(parseInt(e.target.value),product.id)}} />
                    <button onClick={()=>{addToCart(product.id)}}>+</button>
                </div>
            </div>
           
        )
    }
    return (
        <>
        <div>
            {
               products.map((product)=>{
                    return (cartList[product.id] >= 1 ? <Cart key={product.id} product={product} />:<div key={product.id}></div>)
               })
            }
        </div>
        <div>
            <p>Subtotal: ${totalAmount.toFixed(2) }</p>
            <button onClick={()=>{navigate('../Products')}}>Continue Shopping</button>
            <button>Checkout</button>
        </div>
        </>
        
    )
}