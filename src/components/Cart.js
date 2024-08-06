import React, { useEffect, useState } from "react";
import { createDispatchHook, useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  clearCart,
  decreaseCount,
  increaseCount,
} from "../utils/cartSlice";

const Cart = () => {
  const cartState = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const decreaseCountFn = (name) => {
    dispatch(decreaseCount(name));
  };

  const increaseCountFn = (name) => {
    dispatch(increaseCount(name));
  };
  useEffect(() => {
    let totalTemp = 0;
    if (cartState) {
      cartState.map((eachItem) => {
        let priceOfSingleItem = Number(
          eachItem.price.substring(1, eachItem.price.length)
        );
        totalTemp = totalTemp + (eachItem.count * priceOfSingleItem) ;
      });
    }
    setTotal(totalTemp);
  }, [cartState]);

  return (
    <>
      <div className="mt-2 font-semibold">CART</div>
      <div className="mt-2 font-semibold">Total - ₹{total}</div>
      <button
        onClick={() => dispatch(clearCart())}
        className="rounded-lg bg-red-200 p-1 m-1 px-3"
      >
        Clear Cart
      </button>
      {cartState.length > 0 && (
        <ul>
          {cartState?.map((eachCartItem) => (
            <li className="my-2 p-1">
              {eachCartItem.name} - {eachCartItem.price}
              <button
                onClick={() => decreaseCountFn(eachCartItem.name)}
                className="ml-2 px-2 py-1 bg-red-200 rounded-full shadow-lg"
              >
                -
              </button>
              <button className="ml-1 p-1 cursor-text font-semibold">{eachCartItem.count}</button>
              <button
                onClick={() => increaseCountFn(eachCartItem.name)}
                className="ml-1 px-2 py-1 bg-green-200 shadow-lg rounded-full"
              >
                +
              </button>
              <button
                onClick={() => dispatch(removeItem(eachCartItem.name))}
                className=" ml-2 p-1"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Cart;
