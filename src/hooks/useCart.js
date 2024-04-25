import { useEffect, useMemo, useState } from "react"
import { db } from "../data/db"

export const useCart = () =>{
    const initialCart=()=>{
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart):[]
      }
      
      const [data , setData ] = useState(db)
      const [cart, setCart] = useState(initialCart)
      
      const MaxNumberItems = 7
      const MinNumberItems = 1
      
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])
      
      
      function addToCart(item){
        const itemExists = cart.findIndex((guitar)=>guitar.id===item.id)
        console.log('itemExists',itemExists)
       if( itemExists>=0){
        if(cart[itemExists].quantity>=MaxNumberItems)return
        console.log('ya Existe ... incrementando su valor')
        const updatedCart = [...cart]
        updatedCart[itemExists].quantity++
        setCart(updatedCart)
       } else {
        item.quantity = 1
        setCart([...cart, item])
       }
      }
      
      function removeFormCart(id){
        console.log('eliminando...', id)
        setCart(prevCart => prevCart.filter(guitar=>guitar.id!==id))
      }
      
      function increaseQuantity(id){
        console.log('incrementando', id)
        const updatedCart = cart.map(item=>{
          if(item.id===id && item.quantity<MaxNumberItems){
            return{
              ...item,
              quantity: item.quantity+1
            }  
          }
          return item
        })
        setCart(updatedCart)
      }
      
      function decreaseQuantity(id){
        console.log('decrementando', id)
        const updatedCart = cart.map(item=>{
          if(item.id===id && item.quantity>MinNumberItems){
            return{
              ...item,
              quantity: item.quantity-1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
      
      function clearCart(){
        console.log('Vaciando el Carrito')
        setCart([])
      }

          //State Derivado
    const isEmpty = useMemo(() => cart.length===0, [cart])
    const cartTotalPagar = cart.reduce((total, item)=>total+(item.quantity*item.price),0)

      return {
        data,
        cart,
        addToCart,
        removeFormCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotalPagar
      }
}
