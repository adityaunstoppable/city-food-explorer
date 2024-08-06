import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import { lazy, Suspense, useState } from "react";
import Shimmer from "./components/Shimmer";
import AboutUs from "./components/AboutUs";
import ErrorPage from "./components/ErrorPage";
import Accordion from "./components/Accordion";
import FavoriteResContext from "./utils/FavoriteRestaurant";
import { Provider } from "react-redux";
import store from "./utils/store";
import Cart from "./components/Cart";


function App() {

    const [favs , setFavs] = useState([])

    const addToFavs = (restaurant) => {
      setFavs((prevFavs) => [...prevFavs , restaurant])
    }

  const removeFromFavs = (restaurant) => {
    setFavs(prevFavs => prevFavs.filter(eachElement=> eachElement != restaurant))
  }

  const contextValue = {
    favs, 
    addToFavs, 
    removeFromFavs
  }

  return (
    <div className="App">
      <Provider store={store}>
      <FavoriteResContext.Provider value={contextValue} >
      <Header />
      <Outlet />
      </FavoriteResContext.Provider>
      </Provider>
    </div>
  );
}

const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/shimmer", element: <Shimmer /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/cart", element: <Cart /> },
      { path: "/contact", element: <Accordion /> },
      { path: "/restmenu/:id", element: <Suspense><RestaurantMenu /></Suspense> },
    ],
  },
]);

export default App;
