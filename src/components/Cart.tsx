import React from "react";
import Product from "../interfaces/Product.tsx";
import {RiDeleteBin6Line} from "react-icons/ri";
import {useProducts} from "../hooks/useProducts.tsx";

interface CartProps {
  products: Product[];
  filteredItems: Product[];
  deleteCartItem: (id: number) => void;
}
export default function Cart({filteredItems, deleteCartItem}: CartProps) {
  const {hasProducts} = useProducts(filteredItems);
  console.log(filteredItems);
  if (hasProducts) {
    return (
      <div>
        <div className="space-y-4">
          <div className="flex items-center ml-10 p-2">
            <h1 className="text-2xl font-bold mb-2">Shopping Bag</h1>
          </div>

          {filteredItems.map((item) =>
            item.inCart ? (
              <div key={item.id} className="flex items-center p-2 m-10">
                <div className="rounded-md bg-gray-300 h-40 w-40">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="object-contain h-full w-full"
                  />
                </div>

                <div className="ml-4">
                  <span className="block font-bold text-lg">
                    {item.subcategory}
                  </span>
                  <span className="block font-normal text-lg">
                    {item.title}
                  </span>
                  <span className="font-semibold text-lg">${item.price}</span>
                  <RiDeleteBin6Line
                    onClick={() => deleteCartItem(item.id)}
                    className="text-red-500 w-6 h-6 mt-2 cursor-pointer"
                  />
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  }

  return <div>Cart is empty...</div>;
}
