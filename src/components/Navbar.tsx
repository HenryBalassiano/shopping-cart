import {Route, Routes, Link} from "react-router-dom";
import {useEffect, useContext} from "react";
import {MdOutlineShoppingBag} from "react-icons/md";
import Product from "../interfaces/Product.tsx";
import Favorites from "../components/Favorites.tsx";
import {ProductContext} from "../context/StoreContext.tsx";

export default function Navbar() {
  const productContext = useContext(ProductContext);
  if (!productContext) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }
  const {productData, setFilteredItems, setToggleFav} = productContext;

  const cartItems = productData.filter((item) => item.inCart);
  const favoriteItems = productData.filter((item) => item.favorite);
  console.log(productData, "eat shit");
  if (!productContext) {
    throw new Error("ProductList must be used within a ProductProvider");
  }

  return (
    <>
      <nav className="flex justify-start items-start w-full p-4 ">
        <div className="flex  flex-row flex-start ml-10 p-2 gap-10">
          <Link to="/">
            <h1 className="text-4xl font-bold text-center mb-2"> amazin. </h1>
          </Link>
          <ul
            className="flex justify-around gap-10 m-3"
            onClick={() => setFilteredItems(productData)}
          >
            <Link to="/">
              <li className="flex justify-around gap-10 m-0">
                <h1 className="text-lg font-semibold text-center mb-2">
                  {" "}
                  Home
                </h1>
              </li>
            </Link>
            <Link to="/shopping">
              <li>
                {" "}
                <h1
                  className="text-lg font-semibold text-center mb-2"
                  onClick={() => setToggleFav(false)}
                >
                  {" "}
                  Store
                </h1>
              </li>
            </Link>
          </ul>
        </div>{" "}
        <div className="flex justify-end w-full p-4 mr-10 space-x-4 items-center">
          {" "}
          <Favorites />
          <div className="relative flex items-center">
            <Link to="/bag">
              <MdOutlineShoppingBag
                className="w-6 h-6 mb-2"
                onClick={() => setToggleFav(false)}
              />
            </Link>

            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-xs px-2">
              {cartItems.length > 0 ? cartItems.length : 0}
            </span>
          </div>{" "}
        </div>
      </nav>{" "}
    </>
  );
}
