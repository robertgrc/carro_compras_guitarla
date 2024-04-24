import { useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {
const [data , setData ] = useState(db)
const [cart, setCart] = useState([])


function addToCart(item){
  const itemExists = cart.findIndex((guitar)=>guitar.id===item.id)
  console.log('itemExists',itemExists)
 if( itemExists>=0){
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
    if(item.id===id){
      return{
        ...item,
        quantity: item.quantity+1
      }  
    }
    return item
  })
  setCart(updatedCart)
}

  return (
    <>
    <Header 
      cart={cart}
      removeFormCart={removeFormCart}
      increaseQuantity={increaseQuantity}
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar)=>(
            <Guitar 
              guitar = {guitar}
              key={guitar.id}
              addToCart={addToCart}
            />
           )
          )}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
