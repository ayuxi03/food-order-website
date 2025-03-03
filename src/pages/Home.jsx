import React, { useContext, useState } from "react";
import Nav from "../components/Nav";
import Categories from "../Category";
import Card from "../components/Card";
import { food_items } from "../food";
import { dataContext } from "../context/UserContext";
import { RxCross2 } from "react-icons/rx";
import Card2 from "../components/Card2";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


function Home() {
  let {cat, setCat, input, showCart, setShowCart} = useContext(dataContext)

  function filter(category) {
    
    if (category === "ALL" ) {
      setCat(food_items)
    } else {
      let newList = food_items.filter((item) => (item.food_category === category))
      setCat(newList)
    }
  }

  let items = useSelector(state => state.cart)
  let subtotal = items.reduce((total, item) => total + item.qty * item.price, 0)
  let deliveryFee = 20;
  let taxes = subtotal * 0.005
  let total = Math.floor(subtotal + deliveryFee + taxes)

  return (
    <div className="main-container bg-slate-200 w-full min-h-screen">
      <Nav />

      {/* Category section - Shown only if no input in the search bar */}
      
      {!input?
        <div className="categories-container flex flex-wrap justify-center items-center gap-6 w-[100%]">
        {Categories.map((item) => {
          return (
            <div className="category-card w-[140px] h-[150px] bg-white flex flex-col items-center justify-center gap-2 p-5 text-[17px] font-bold text-gray-600 rounded-lg shadow-xl hover:bg-green-100 active:bg-green-200 cursor-pointer transition-all duration-200" onClick={() => filter(item.name)} key={item.id}>
              {item.icon}
              {item.name}
            </div>
          );
        })}
      </div> : null
      }
      


      {/* Shows food cards, after filtering if match found in >=1 cards */}

      <div className="food-card-container w-full flex flex-wrap gap-5 px-5 justify-center items-center py-8">
        {cat.length >= 1 ? 
          cat.map((item) => (
          <Card key={item.id} name={item.food_name} image={item.food_image} price={item.price} id={item.id} type={item.food_type} />
        )) : <div className="font-semibold text-gray-700">No results found...</div>
        }
        
      </div>

      <div className={`cart w-full h-[100%] fixed top-0 right-0 pb-10 bg-white shadow-lg shadow-black border-l-3 border-green-600 rounded-tl-2xl flex flex-col items-center overflow-auto ${showCart ? "translate-x-0" : "translate-x-full"} transition-all duration-300 md:w-[40vw] lg:w-[30vw]`}>

        <header className="cart-header w-[100%] flex justify-between items-center bg-green-600 pl-7 py-5 pr-4 rounded-tl-xl text-white">

          <span className="text-[18px] font-semibold">Order Items</span>
          <RxCross2 className="cross-btn h-[40px] w-[40px] p-[10px] cursor-pointer hover:bg-green-900 active:bg-green-800 rounded-full transition-all" onClick={() => setShowCart(false)} />

        </header>



        {/* Shows cards in cart if items exist */}
        
        {items.length > 0 ?
        <>

          <div className="cart-card-container w-full">
            {items.map((item) => (
              <Card2 name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty} />
            ))}
          </div>

          <div className="calculate-section w-[94%] border-y-2 border-gray-400 py-8 px-3 mt-5 mx-auto">          
            <div className="w-full flex justify-between">
              <span className="text-md text-gray-600 font-semibold">Subtotal</span>
              <span className="text-green-400 font-semibold text-md">Rs {subtotal}/-</span>
            </div>

            <div className="w-full flex justify-between">
              <span className="text-md text-gray-600 font-semibold">Delivery fee</span>
              <span className="text-green-400 font-semibold text-md">Rs {deliveryFee}/-</span>
            </div>

            <div className="w-full flex justify-between">
              <span className="text-md text-gray-600 font-semibold">Taxes</span>
              <span className="text-green-400 font-semibold text-md">Rs {taxes}/-</span>
            </div>
          </div>
          
          <div className="total w-[94%] flex justify-between mx-auto pt-4 px-3">
              <span className="text-md text-gray-600 font-semibold">Total</span>
              <span className="text-green-400 font-semibold text-md">Rs {total}/-</span>
          </div>

          <button className="place-order-btn w-[90%] mt-10 mx-auto p-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500 active:bg-green-600 transition-all cursor-pointer" onClick={() => toast.success("Order placed")}>Place Order</button>
        
        </> : 
        <div className="empty-cart m-10 text-md text-gray-600 font-semibold ">
          Add items to continue...
        </div>
        }
        

      </div>

    </div>
  );
}

export default Home;
