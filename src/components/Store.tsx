import React, {useContext} from "react";
import Product from "../interfaces/Product.tsx";
import {useProducts} from "../hooks/useProducts.tsx";
import {MdOutlineShoppingBag} from "react-icons/md";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import Sidebar from "../components/Sidebar.tsx";
import {ProductContext} from "../context/StoreContext.tsx";

export default function Store() {
  const productContext = useContext(ProductContext);
  if (!productContext) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }
  const {
    productData,
    setProductData,
    setFilteredItems,
    filteredItems,
    setToggleFav,
  } = productContext;
  const {hasProducts} = useProducts(productData);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = e.target.value;

    if (sortOption === "lowToHigh") {
      const sorted = [...productData].sort((a, b) => a.price - b.price);
      console.log("hi i just re ran the sort thing");
      setFilteredItems(sorted);
    } else if (sortOption === "highToLow") {
      const sorted = [...productData].sort((a, b) => b.price - a.price);
      setFilteredItems(sorted);
    }
  };
  const addToCart = (id: number) => {
    const updatedProducts = productData.map((item) =>
      item.id === id ? {...item, inCart: true} : item
    );

    setProductData(updatedProducts);
  };
  const addToFavorites = (id: number) => {
    const updatedProducts = productData.map((item) =>
      item.id === id ? {...item, favorite: true} : item
    );
    setProductData(updatedProducts);
  };
  if (filteredItems.length === 0) {
    return <div className="mx-auto max-w-screen-lg">No favorites found.</div>;
  }

  if (hasProducts) {
    return (
      <div className="mx-auto max-w-screen-lg">
        <Sidebar />
        <div className="flex justify-end mb-4">
          <select
            onChange={handleSortChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="lowToHigh">Price: Low To High</option>
            <option value="highToLow">Price: High To Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="w-60 mx-auto">
              <div className="rounded-md bg-gray-300 h-60 w-60">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="object-contain h-full w-full max-w-60 max-h-60"
                />
              </div>
              <span className="block font-normal text-lg mt-2">
                <span className="block font-bold text-lg">
                  {item.subcategory}
                </span>{" "}
                {item.title}
              </span>

              <div className="flex items-center mt-1">
                <span className="font-semibold text-lg">${item.price}</span>
                <MdOutlineShoppingBag
                  onClick={() => addToCart(item.id)}
                  className="w-6 h-6  text-gray-700 cursor-pointer"
                />{" "}
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() => addToFavorites(item.id)}
                  className="w-6 h-6 text-gray-700 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
