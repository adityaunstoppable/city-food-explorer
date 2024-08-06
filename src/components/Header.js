import React,{ useEffect, useState} from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () => {

  const [isLogin , setIslogin]  = useState(false)
  const buttonCss= "px-2 cursor-pointer border  bg-zinc-100 m-2 rounded-lg p-2"
  const [cartCount , setCartCount] = useState(0)
  const userOnlineStatus = useOnlineStatus()
  const cartState = useSelector(state => state.cart.items)

  useEffect(()=> {
    let count = 0
    if(cartState.length > 0 ){
      cartState.map(eachCartItem => {
        count = count + eachCartItem.count
      })
    }
    setCartCount(count)
  }, [cartState])

  return (
    <div className="flex justify-between shadow-lg p-2 h-20 items-center">
      <img
        src="https://i.pinimg.com/736x/71/0a/26/710a26d2c8b24b71f99d4714bce66225--food-logo-design-food-logos.jpg"
        className="h-20 p-2 rounded-3xl"
      />

      <div className="nav-items">
        <ul className="flex py-10">
          <Link to="/">
            <li className={buttonCss}>
              Home
            </li>
          </Link>
          <Link to="/cart">
            <li className={buttonCss}>
              Cart - <span className=" text-orange-700">{cartCount}</span>
            </li>
          </Link>
          <Link to="/about">
            <li className={buttonCss}>
              About us
            </li>
          </Link>
          {/* <Link to="/contact">
            <li className={buttonCss}>
              Accordion 
            </li>
          </Link> */}
        </ul>
      </div>

      <p className="border border-none">{userOnlineStatus ? "✔️" : "❌"}</p>

      <button onClick={()=> setIslogin(!isLogin)} className={buttonCss }>
        {isLogin ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Header;
