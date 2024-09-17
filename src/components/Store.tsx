import React, {useContext} from "react";
import Product from "../interfaces/Product.tsx";
import {useProducts} from "../hooks/useProducts.tsx";
import {MdOutlineShoppingBag} from "react-icons/md";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import Sidebar from "../components/Sidebar.tsx";
import useProductContext from "../hooks/useProductContext.tsx";

export default function Store() {
  const {productData, setProductData, setFilteredItems, filteredItems} =
    useProductContext();
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
      <div className="flex	">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 max-w-screen-2xl">
          {/* Sorting Dropdown */}
          <div className="flex justify-end mb-6 ">
            <select
              onChange={handleSortChange}
              className="block w-48 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              defaultValue=""
            >
              <option value="" disabled>
                Sort By
              </option>
              <option value="lowToHigh">Price: Low To High</option>
              <option value="highToLow">Price: High To Low</option>
            </select>
          </div>

          {/* Products Grid */}
          {filteredItems.length === 0 ? (
            <p className="text-center text-gray-700">
              No products match the selected subcategories.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {filteredItems.map((item: Product) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="object-contain h-4/5 w-4/5 p-2"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-4">${item.price}</p>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => addToCart(item.id)}
                        className="flex items-center text-blue-500 hover:text-blue-700"
                      >
                        <MdOutlineShoppingBag className="mr-1" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => addToFavorites(item.id)}
                        className={`flex items-center ${
                          item.favorite ? "text-red-500" : "text-gray-500"
                        } hover:text-red-700`}
                      >
                        <FontAwesomeIcon icon={faHeart} className="mr-1" />
                        Favorite
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
