import React from "react";
import { CLOUDINARY_IMG_ID } from "../constants";
import { Link } from "react-router-dom";

const RestaurantCard = ({
  name,
  id,
  rating,
  imgId,
  costForTwo,
  addToFavs,
  removeFromFavs,
  favs,
}) => {


  const isFav = favs.includes(name)

  return (
    <div className="w-60 shadow-lg bg-orange-100 rounded-lg m-3 py-5 px-3 text-left">
      <Link to={`/restmenu/${id}`}>
        <img src={CLOUDINARY_IMG_ID + imgId} className="w-56 h-52 rounded-lg" />
      </Link>
      <h3 className="mt-2 font-semibold">{name}</h3>
      <h4>{costForTwo}</h4>
      <h4>{rating} stars</h4>
      <div className="flex justify-between flex-wrap align-middle">
        
        <button onClick={() => isFav ? removeFromFavs(name) : addToFavs(name)} className="pr-10 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFav ? "pink":"none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="brown"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;