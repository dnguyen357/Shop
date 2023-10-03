import { useState,useEffect } from 'react'
import '../App.css'
import { ShopContext } from '../components/shopList';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Cart(){
    const { getCart,addToCart,deleteFromCart,updateCart,token,setToken,id,setId,userId,setUserId,products,isAdded}= useContext(ShopContext)
    const navigate = useNavigate();
    const [cartList,setCartList] =useState([])
    const [totalAmount,setTotalAmount]= useState(0)
    const [quantityUp, setQuantityUp] = useState(1);
    const [quantityDown, setQuantityDown] = useState(1);

    const fetchCart = async () => {
        try {
          const result = await getCart(userId,token);
          setCartList(result);
          console.log(cartList)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    useEffect(() => {
        fetchCart();
      }, [isAdded]);

    function Cart({product}){
        return (
            <div className="product-cart">
                 <Link to={`/Product/${product._id}`} style={{ textDecoration: 'none' ,color: 'black',}}>
                    <img src={product.image} alt="product-image" className='image'/>
                    <h4>{product.title}</h4>
                </Link>
                <h4>Price: {product.price}</h4>
                <div>
                    <button onClick={(e)=>{updateCart(e,token,userId,product.productId,product.quantity-1,product.price,product.title,product.image)}}>-</button>
                    <input readOnly value={product.quantity}/>
                    <button onClick={(e)=>{updateCart(e,token,userId,product.productId,product.quantity+1,product.price,product.title,product.image)}}>+</button>
                </div>
            </div>
           
        )
    }
    const getTotalCost = () =>{
        let total=0;
        for(const item in cartList){
            total += cartList[item].price * cartList[item].quantity
        }
        return total
    }
    useEffect(()=>{
        setTotalAmount(getTotalCost());
    },[cartList])
    return (
        <>
        <div>
            {
               cartList.map((product)=>{
                    // return (cartList[product._id] >= 1 ? <Cart key={product._id} product={product} />:<div key={product._id}></div>)
                    return <Cart key={product._id} product={product} />
               })
            }
        </div>
        <div>
            <p>Subtotal: ${totalAmount.toFixed(2) }</p>
            <button onClick={()=>{navigate('/Products')}}>Continue Shopping</button>
            <button>Checkout</button>
        </div>
        </>
        
    )
}