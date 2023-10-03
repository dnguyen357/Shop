import { ShopContext } from './shopList';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react"
export default function SignOut({setUser}){
    const { token,userId,setUserId,setToken}= useContext(ShopContext)
    const navigate=useNavigate();

    useEffect(() => {
        setToken("")
        setUserId("")
        setUser("")
        navigate('/')
        console.log("You are logout")
    }, [])
    

    return (
        <>
        
        </>  
    )
}