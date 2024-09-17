import {useContext} from "react";
import {Route, Routes} from "react-router-dom"; // No more BrowserRouter here
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Store from "./components/Store";
import Cart from "./components/Cart";
import {ProductContext} from "./context/StoreContext";

function App() {
  const productContext = useContext(ProductContext);
  if (!productContext) {
    throw new Error("ProductList must be used within a ProductProvider");
  }
  const {loading} = productContext;

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
