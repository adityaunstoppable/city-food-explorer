import React, { useContext, useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import SearchBar from "./SearchBar";
import Shimmer from "./Shimmer";
import FavoriteResContext from "../utils/FavoriteRestaurant";
import useFindLocation from "../utils/useFindLocation";

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRes, setFilterRes] = useState([]);
  const [favsState, setFavsState] = useState([]);
  const [showFavs , setShowFavs] = useState(true) 
  const { addToFavs, removeFromFavs, favs } = useContext(FavoriteResContext);
  const usersLocation = useFindLocation()
  useEffect(() => {
    getSwiggyRestaurants();
  }, []);

  useEffect(() => {
    let favsArray = [];
    if (allRestaurants.length && favs.length) {
      favs.map((eachFav) => {
        allRestaurants.map((eachResInfo) => {
          if (eachResInfo?.info?.name == eachFav) {
            favsArray.push(eachResInfo);
          }
        });
      });
    }
    setFavsState(favsArray);
  }, [favs]);

  const getSwiggyRestaurants = async () => {
    const {latitude , longitude} = usersLocation

    const data = await fetch(
      `https://projects-proxy.onrender.com/api/restaurants?lat=${latitude}&lng=${longitude}`
        );
    const json = await data.json();

    let dataResourceIndexes = [3,4]

    let restaurantsData = []
    restaurantsData = json?.data?.cards[dataResourceIndexes[0]]?.card?.card?.gridElements?.infoWithStyle?.restaurants 
    if(restaurantsData?.length){
      setAllRestaurants(restaurantsData);
      setFilterRes(restaurantsData);
    }else{
      restaurantsData = json?.data?.cards[dataResourceIndexes[1]]?.card?.card?.gridElements?.infoWithStyle?.restaurants 
    setAllRestaurants(restaurantsData);
      setFilterRes(restaurantsData);
    }

  };



  return allRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <>
      <SearchBar filterResultsFunction={setFilterRes} allRes={allRestaurants} />

      <div className="bg-pink-100">
      <h1 className="font-semibold text-lg ">Favorites</h1>
      <button onClick={() => setShowFavs(!showFavs)} className="rounded-lg border border-slate-300 bg-pink-50 p-2 m-2">{showFavs ? "Hide" :  "Show"} Favorites</button>
      </div>
      
      {showFavs && 
      <div className="flex flex-wrap justify-center bg-pink-100">
        {favsState.length > 0 ? (
          favsState?.map((eachFav) => (
            <RestaurantCard
              key={eachFav.info.id}
              id={eachFav.info.id}
              name={eachFav.info.name}
              rating={eachFav.info.avgRating}
              imgId={eachFav.info.cloudinaryImageId}
              costForTwo={eachFav.info.costForTwoString}
              addToFavs={addToFavs}
              removeFromFavs={removeFromFavs}
              favs={favs}
            />
          ))
        ) : (
          <h1 className="m-2 p-2">You have not added any restaurant in favorites</h1>
        )}
      </div>
      }

      <div className="flex flex-wrap justify-center bg-gray-50">
        {filteredRes?.map((eachRes) => (
          <RestaurantCard
            key={eachRes.info.id}
            id={eachRes.info.id}
            name={eachRes.info.name}
            rating={eachRes.info.avgRating}
            imgId={eachRes.info.cloudinaryImageId}
            costForTwo={eachRes.info.costForTwoString}
            addToFavs={addToFavs}
            removeFromFavs={removeFromFavs}
            favs={favs}
          />
        ))}
      </div>
    </>
  );
};

export default Body;
