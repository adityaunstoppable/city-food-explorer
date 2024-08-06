import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMenu from "../utils/useMenu";
import Shimmer from "./Shimmer";
import { addItem , removeItem } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const RestaurantMenu = () => {
  const { menu, rest } = useMenu(useParams().id);
  const [filteredMenu , setFilteredMenu] = useState([])
  const [searchString , setSearchString] = useState("")
  const dispatch = useDispatch()
  const cartState = useSelector(state => state.cart.items)
  
  useEffect(() => {
    let timer
    if(!searchString){
      setFilteredMenu(menu)
    }else{

      timer = setTimeout(() => {
        let filteredData = menu.filter(eachObj => eachObj?.name.toLowerCase().includes(searchString.toLowerCase()))
        setFilteredMenu(filteredData)
        }, 500);
  
    }

    return () => {
      clearTimeout(timer)
    }

  },[searchString])

  const addThisItem = (name , price) => {
    let count = 0
    cartState.length > 0 && cartState.map(eachCartItem =>{
      if(eachCartItem?.name == name){
        count = eachCartItem.count
      }
    })
    count = count + 1
    dispatch(addItem({ name , price , count}))
  }

  useEffect(() => {
    menu.length > 0 && setFilteredMenu(menu)
  },[menu])
  return menu.length <= 0 ? <Shimmer /> :(
    <>
      {menu.length && (
        <>
          <h1 className="my-3 font-semibold">Menu of {rest?.name}</h1>

          <input type="search" onChange={(e) => setSearchString(e.target.value)} placeholder="Search Food Items" className="border border-slate-900 rounded-lg focus:border-slate-100 p-2"/>

          <ul>
            {filteredMenu.map((eachItem) => {
              let price = `₹${JSON.stringify(eachItem.price)?.substring(
                0,
                JSON.stringify(eachItem.price).length - 2
              )}`
              return(
              <li className="my-2 p-1 ">
                {eachItem?.name} - {price}
                <button onClick={() => addThisItem(eachItem?.name , price)} className="ml-4 bg-green-100 rounded px-3 shadow-lg ">
                  Add
                </button>
              </li>
            )})}
          </ul>
        </>
      )}
    </>
  );
};

export default RestaurantMenu;
