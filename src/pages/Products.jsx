import { useState,useEffect, useContext } from 'react'
import '../App.css'
import { ShopContext } from '../components/shopList';
import { useLocation,Link } from 'react-router-dom';
import AdvFilter from '../components/AdvFilter';

export default function Products({filtered}){
    const { addToCart,isAdded,userId,token}=useContext(ShopContext)
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [quantity, setQuantity] = useState(1);
    const applyFilters = (brand, price) => {
        setSelectedBrand(brand);
        setSelectedPrice(price);
        
        // Apply filters based on brand and price
        let filteredProducts = filtered;
        
        if (brand.length > 0) {
            filteredProducts = filteredProducts.filter((product) => product.category == brand);
          }
        
        if (price.length > 0) {
            filteredProducts = filteredProducts.filter((product) => product.price <= parseInt(price));
        }
        
        setFilteredProducts(filteredProducts);
    }
    function Products({product}){
        return(
            <li className="product">
                <Link to={`/Product/${product._id}`} style={{ textDecoration: 'none' ,color: 'black',}}>
                    <img src={product.image} alt="product-image" className='image'/>
                    <h4>{product.title}</h4>
                </Link>
                <h4>Price: ${product.price}</h4>
                <button className={`add-to-cart`} onClick={(e)=>  {addToCart(e,token,userId,product._id,quantity,product.price,product.title,product.image)}}>Add to Cart</button>
            </li>
        )
    }
    
    return (
        <div className='product-page'>
            <div className='sidebar'>
                <AdvFilter applyFilters={applyFilters}/>
            </div>
            < div className='products-list'>
                <ul>
            {
             
              (filteredProducts.length>0?filteredProducts:filtered).map((product)=>{
                    return (<Products key={product._id} product={product}/>)
              })
            }
            </ul>
          </div>
        </div>
    )
}