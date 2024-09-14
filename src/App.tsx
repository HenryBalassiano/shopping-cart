import {useState, useEffect} from "react";
import Home from "./components/Home.tsx";
import Navbar from "./components/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import Store from "./components/Store.tsx";
import Product from "./interfaces/Product.tsx";
import Cart from "./components/Cart.tsx";

const fetchProductsByCategory = async (category: string) => {
  const response = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  const data = await response.json();
  return data.products;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const [
          smartphones,
          laptops,
          mensJackets,
          womensDresses,
          skinCare,
          beauty,
        ] = await Promise.all([
          fetchProductsByCategory("smartphones"),
          fetchProductsByCategory("laptops"),
          fetchProductsByCategory("mens-jackets"),
          fetchProductsByCategory("womens-dresses"),
          fetchProductsByCategory("skin-care"),
          fetchProductsByCategory("beauty"),
        ]);

        const electronics = [...smartphones, ...laptops].map((product) => ({
          ...product,
          subcategory: "Electronics",
          inCart: false,
        }));
        const fashion = [...mensJackets, ...womensDresses].map((product) => ({
          ...product,
          subcategory: "Fashion",
          inCart: false,
        }));
        const selfCare = [...skinCare, ...beauty].map((product) => ({
          ...product,
          subcategory: "Self Care",
          inCart: false,
        }));

        setLoading(false);
        setProductData([...electronics, ...fashion, ...selfCare]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const itemsInCart = productData.filter((item) => item.inCart === true);
    console.log(itemsInCart, "");
    setFilteredItems(itemsInCart);
  }, [productData]);

  const deleteCartItem = (id: number) => {
    const updatedProducts = productData.map((item) =>
      item.id === id ? {...item, inCart: false} : item
    );

    setProductData(updatedProducts);

    const updatedItems = updatedProducts.filter((item) => item.inCart);
    setFilteredItems(updatedItems);
  };
  return (
    <>
      <Navbar filteredItems={filteredItems} />
      {!loading ? (
        <Routes>
          <Route path="/" element={<Home products={productData} />} />
          <Route
            path="/shopping"
            element={
              <Store
                products={productData}
                setFilteredItems={setFilteredItems}
                setProducts={setProductData}
              />
            }
          />
          <Route
            path="/bag"
            element={
              <Cart
                products={productData}
                filteredItems={filteredItems}
                deleteCartItem={deleteCartItem}
              />
            }
          />
        </Routes>
      ) : (
        <div className="flex justify-center align-center">Please wait..</div>
      )}
    </>
  );
}

export default App;
