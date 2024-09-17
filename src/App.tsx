import {useContext} from "react";
import Home from "./components/Home.tsx";
import Navbar from "./components/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import Store from "./components/Store.tsx";
import Product from "./interfaces/Product.tsx";
import Cart from "./components/Cart.tsx";
import {ProductContext} from "./context/StoreContext.tsx";

function App() {
  const productContext = useContext(ProductContext);
  if (!productContext) {
    throw new Error("ProductList must be used within a ProductProvider");
  }
  const {loading, productData} = productContext;
  return (
    <>
      <Navbar />
      {!loading ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopping" element={<Store />} />
          <Route path="/bag" element={<Cart />} />
        </Routes>
      ) : (
        <div className="flex justify-center align-center">Please wait..</div>
      )}
    </>
  );
}

export default App;
