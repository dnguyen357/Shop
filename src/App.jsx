import { useState,useEffect } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import Cart from './pages/Cart';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Products from './pages/Products';
import { ShopContextProvider } from './components/shopList';
import Navbar from './Navbar';
import SignOut from './components/SignOut';
import ProductDetail from './pages/ProductDetail';

function App() {
  const [user,setUser] =useState("")
  const [products,setProducts] =useState([]);
  const [search,setSearch] = useState("");
  

  const [filtered,setFiltered] =useState([]);

  async function fetchProducts() {
    const response = await fetch('https://store-dcq8.onrender.com/api/products',{
      headers: {
        'Access-Control-Allow-Origin': '*',
        },
        mode: 'cors',
        method: "GET",
    })
    const result = await response.json()
    setProducts(result)
    setFiltered(result)
  }

  useEffect(() => {
    fetchProducts();
  }, []) 
  
  function filterFromSearch(){
    return products.filter((product)=>product.title.toLowerCase().includes(search.toLowerCase()))
  }
  
  const handleSearchChange =(e)=>{
    setSearch(e.target.value);
  }

  

  function filterProducts(products,search){
    let filteredProducts = products
    
    if(search){
      filteredProducts = filterFromSearch()
    }
    
    return filteredProducts
  }

  useEffect(() => {
    setFiltered(filterProducts(products,search));
  }, [search]) 

  return (
    <>
    <Navbar search={search} handleSearchChange={handleSearchChange} user={user}/>
    <div id="main-section">
      <ShopContextProvider>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Products" element={<Products filtered={filtered}/>}/>
          <Route path="/Product/:id" element={<ProductDetail/>}/>
          <Route path="/SignIn" element={<SignIn setUser={setUser}/>}/>
          <Route path="/SignOut" element={<SignOut setUser={setUser}/>}/>
          <Route path="/SignUp" element={<SignUp />}/>
          <Route path="/Cart" element={<Cart products={products}/>}/>
        </Routes> 
      </ShopContextProvider>
      </div>
     
    </>
  )
}

export default App
