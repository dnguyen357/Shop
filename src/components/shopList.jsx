import { createContext, useState,useEffect } from "react";
export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {

    const [products,setProducts]= useState([])
    const [isAdded, setIsAdded] = useState(false);
    async function fetchProducts() {
        const response = await fetch('https://fakestoreapi.com/products');
        const result = await response.json();
        setProducts(result)
    }
    useEffect(() => {
        fetchProducts();
        
      }, [])
      
    const getCartArray =()=> {
        let cart ={}
        for(let i = 1; i< products.length +1;i++){
            cart[i]=0;
        }
        return cart;
    }
   
    const [cartList,setCartList] = useState({})

    useEffect(() => {
        setCartList(getCartArray());

      }, [products])

    const updateCart = (amount,itemId)=>{
        setCartList((prev)=> ({...prev, [itemId]: amount }))
    }
    const addToCart = (itemId) => {
        setIsAdded(true);
            setTimeout(() => {
            setIsAdded(false);
            }, 1000);

        setCartList((prev)=> ({...prev, [itemId]: prev[itemId] + 1 }))
    }
    const deleteFromCart = (itemId) => {
        setCartList((prev)=> ({...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCost = () =>{
        let total=0;
        for(const item in cartList){
            if(cartList[item]>0){
                let itemDetail = products.filter(product=>product.id == item)
                total += cartList[item] * itemDetail[0].price
            }
        }
        return total;
    }
    

    const contextValue={ cartList,addToCart,deleteFromCart,updateCart,getTotalCost,isAdded}
    return <ShopContext.Provider value={contextValue}> {props.children}</ShopContext.Provider>
}