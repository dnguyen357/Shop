import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom"
import {AiOutlineShoppingCart, AiOutlineSearch} from 'react-icons/ai'
import logo from './components/DN-logos_transparent.png'; 
import { useState } from "react";
import { ShopContext } from './components/shopList';
import { useContext } from 'react';
export default function Navbar({search,handleSearchChange,user}) {
  const navigate =useNavigate()
  const [isOpen, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    
  <>
    <nav className={`nav`}>
      <div className="nav-left-side">
          <Link to="/" className="site-title">
            <img src={logo} alt="Logo" className="logo"/>
          </Link>
        <div className="search-bar">
            <input onChange={handleSearchChange} type="text" className="search" value={search} placeholder="Search"/>
            <button className="search-button" onClick={(e)=>{navigate('/products')}}>
              <AiOutlineSearch/>
          </button>
        </div>
      </div>
      
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""} onClick={() => setMenuOpen(!menuOpen)}>
        <CustomLink to="/products">Products</CustomLink>
        {user==""?<CustomLink to="/signin" >Sign in</CustomLink>:<CustomLink to="/SignOut" >SignOut</CustomLink>}
        <CustomLink to="/cart" ><AiOutlineShoppingCart/></CustomLink>
      </ul>
    </nav>
  </>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
  return (
    <li id={isActive ? "active" : ""} >
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

