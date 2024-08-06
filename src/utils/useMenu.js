import React, {useState, useEffect } from 'react'
import useFindLocation from './useFindLocation';

const useMenu = (resId) => {

    const [menu, setMenu] = useState([]);
    const [rest, setRes] = useState(null);
    const usersLocation = useFindLocation()
    useEffect(() => {
        getResInfo();
      }, []);

    
  const getResInfo = async () => {
    const {latitude, longitude} = usersLocation
    const data = await fetch(
      `https://projects-proxy.onrender.com/api/menu?lat=${latitude}&lng=${longitude}&restaurantId=${resId}`
    );

    const json = await data.json();
    setRes(json?.data?.cards[2]?.card?.card?.info);
    let cards =
      json?.data?.cards[4]?.groupedCard?.cardGroupMap?.["REGULAR"]?.cards;

    let menuArray = [];

    cards?.forEach((eachCard) => {
      if (eachCard?.card?.card?.itemCards) {
        eachCard?.card?.card?.itemCards.forEach((item) => {
          menuArray.push({
            name: item?.card?.info?.name || "",
            price: item?.card?.info?.price || item?.card?.info?.defaultPrice || "",
          });
        });
      }
    });
    setMenu(menuArray);
  };

    return {menu , rest}
}

export default useMenu