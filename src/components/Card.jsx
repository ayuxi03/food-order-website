import React from "react";
import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import { AddItem } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


function Card({name, image, id, price, type}) {
  let dispatch = useDispatch()

  return (
    <div className="food-card w-[300px] h-[400px] bg-white p-3 rounded-lg flex flex-col gap-3 shadow-lg hover:border-3 border-green-300 transition-all duration-50">
      <div className="food-img-container w-[100%] h-[60%] overflow-hidden rounded-lg">
        <img src={image} alt="" className="object-cover"/>
      </div>
      <div className="text-2xl font-semibold">{name}</div>
      <div className="price-type-container w-full flex justify-between items-center">
        <div className="text-l font-bold text-green-500">Rs {price}/-</div>
        <div className="flex justify-center items-center gap-2 text-l font-semibold">
          {type === "veg" ? <LuLeafyGreen className="text-green-500" /> : <GiChickenOven className="text-red-700" />}
          {type === "veg" ? <span className="text-green-500">{type}</span> : <span className="text-red-700">{type}</span>}
        </div>
      </div>
      <button className="add-btn w-full p-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-400 active:bg-green-500 transition-all cursor-pointer" onClick={() => {
        dispatch(AddItem({id:id, name:name, price:price, image:image, qty:1}));
        toast.success("Item added");        
      }}>Add to cart</button>
    </div>
  );
}

export default Card;
