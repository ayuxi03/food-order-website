import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { DecrementQty, IncrementQty, RemoveItem } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';


function Card2({name, id, price, image, qty}) {

  let dispatch = useDispatch()

  return (

    <div className='cart-card w-[97%] h-auto p-4 mt-3 mx-2 shadow-md rounded-lg flex justify-between'>
      <div className='left-section w-[75%] h-full flex justify-between'>
        <div className='cart-img-container w-[48%] h-full rounded-lg'>
          <img src={image} alt="" className='w-full h-full max-h-40 object-cover rounded-lg' />
        </div>
        <div className='w-[50%] h-auto flex flex-col justify-between items-start ml-2'>
          <div className='text-lg text-gray-600 font-semibold'>{name}</div>
          <div className='cart-btn w-[80%] max-w-30 h-[30%] md:h-[33%] md:w-[70%] flex rounded-lg overflow-hidden shadow-lg text-green-500 border-2 border-green-300 font-semibold'>
            <button className='w-[30%] h-full bg-white flex justify-center items-center hover:bg-green-100 active:bg-green-200 cursor-pointer' onClick={() => qty>1 ? dispatch(DecrementQty(id)) : qty}>-</button>
            <span className='w-[40%] h-full bg-slate-200 flex justify-center items-center'>{qty}</span>
            <button className='w-[30%] h-full bg-white flex justify-center items-center hover:bg-green-100 active:bg-green-200 cursor-pointer' onClick={() => dispatch(IncrementQty(id))}>+</button>
          </div>
        </div>
      </div>
      <div className='right-section flex flex-col items-end justify-between'>
        <span className='text-md text-green-400 font-semibold'>Rs {price}/-</span>
        <RiDeleteBin6Line className='remove-item-btn w-[20px] h-[20px] text-red-600 cursor-pointer hover:text-red-400 active:text-red-600 transition-all' onClick={() => dispatch(RemoveItem(id))} />

      </div>
    </div>    

    
  )
}

export default Card2