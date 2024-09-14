import {Route, Routes, Link} from "react-router-dom";
import {MdOutlineShoppingBag} from "react-icons/md";
import Product from "../interfaces/Product.tsx";
interface Navbar {
  filteredItems: Product[];
}
export default function Navbar({filteredItems}: Navbar) {
  return (
    <>
      <nav className="flex justify-start items-start w-full p-4 ">
        <div className="flex  flex-row flex-start ml-10 p-2 gap-10">
          <Link to="/">
            <h1 className="text-4xl font-bold text-center mb-2"> amazin. </h1>
          </Link>
          <ul className="flex justify-around gap-10 m-3">
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
                <h1 className="text-lg font-semibold text-center mb-2">
                  {" "}
                  Store
                </h1>
              </li>
            </Link>
          </ul>
        </div>{" "}
        <div className="flex justify-end w-full p-4 mr-10">
          <div className="relative">
            <Link to="/bag">
              <MdOutlineShoppingBag className="w-6 h-6 mt-0.5" />
            </Link>
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-xs px-2">
              {filteredItems ? filteredItems.length : 0}
            </span>
          </div>
        </div>
      </nav>{" "}
    </>
  );
}
