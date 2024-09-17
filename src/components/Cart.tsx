import {useContext} from "react";
import {RiDeleteBin6Line} from "react-icons/ri";
import Product from "../interfaces/Product.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquarePlus} from "@fortawesome/free-regular-svg-icons/faSquarePlus";
import {faSquareMinus} from "@fortawesome/free-regular-svg-icons/faSquareMinus";
import useProductContext from "../hooks/useProductContext.tsx";
export default function Cart() {
  const {productData, setProductData} = useProductContext();

  const handleQuantityIncrement = (id: number) => {
    setProductData((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {...product, quantity: product.quantity + 1}
          : product
      )
    );
  };

  const handleQuantityDecrement = (id: number) => {
    setProductData((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? {...product, quantity: product.quantity - 1}
          : product
      )
    );
  };

  const deleteCartItem = (id: number) => {
    setProductData((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? {...product, inCart: false} : product
      )
    );
  };

  const cartItems = productData.filter((item) => item.inCart);

  if (cartItems.length > 0) {
    return (
      <div>
        <div className="space-y-4">
          <div className="flex items-center ml-10 p-2">
            <h1 className="text-2xl font-bold mb-2">Shopping Bag</h1>
          </div>

          {cartItems.map((item) => (
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
                <span className="block font-normal text-lg">{item.title}</span>

                <div className="flex items-center mt-2">
                  <span className="font-semibold text-lg">
                    ${Math.round(item.price * item.quantity * 100) / 100}
                  </span>
                  <div className="ml-12 flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faSquarePlus}
                      onClick={() => handleQuantityIncrement(item.id)}
                      className="cursor-pointer h-6 text-neutral-400"
                    />
                    <div>{item.quantity}</div>
                    <FontAwesomeIcon
                      icon={faSquareMinus}
                      onClick={() => handleQuantityDecrement(item.id)}
                      className="cursor-pointer h-6 text-neutral-400 "
                    />
                  </div>
                </div>

                <RiDeleteBin6Line
                  onClick={() => deleteCartItem(item.id)}
                  className="text-red-500 w-6 h-6 mt-2 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div>Cart is empty...</div>;
}
