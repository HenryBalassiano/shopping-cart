import React, {useState, useEffect} from "react";
import Product from "../interfaces/Product.tsx";
import {useProducts} from "../hooks/useProducts.tsx";
import {MdOutlineShoppingBag} from "react-icons/md";

interface Store {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setFilteredItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function Store({
  products,
  setProducts,
  setFilteredItems,
}: Store) {
  const {hasProducts} = useProducts(products);

  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const sorted = [...products].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = e.target.value;

    if (sortOption === "lowToHigh") {
      const sorted = [...products].sort((a, b) => a.price - b.price);
      console.log("hi i just re ran the sort thing");
      setSortedProducts(sorted);
    } else if (sortOption === "highToLow") {
      const sorted = [...products].sort((a, b) => b.price - a.price);
      setSortedProducts(sorted);
    }
  };
  const addToCart = (id: number) => {
    const updatedProducts = products.map((item) =>
      item.id === id ? {...item, inCart: true} : item
    );

    setProducts(updatedProducts);

    const updatedItems = updatedProducts.filter((item) => item.inCart);
    setFilteredItems(updatedItems);
  };
  if (hasProducts) {
    return (
      <div className="mx-auto max-w-screen-lg">
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
          {sortedProducts.map((item) => (
            <div key={item.id} className="w-60 mx-auto">
              <div className="rounded-md bg-gray-300 h-60 w-60">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="object-contain h-full w-full max-w-60 max-h-60"
                />
              </div>
              <span className="block font-normal text-lg mt-2">
                {item.title}
              </span>

              <div className="flex justify-between items-center mt-1">
                <span className="font-semibold text-lg">${item.price}</span>

                <MdOutlineShoppingBag
                  onClick={() => addToCart(item.id)}
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
