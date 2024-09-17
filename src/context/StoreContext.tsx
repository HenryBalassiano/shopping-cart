import React, {useState, useEffect} from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import {ProductContext} from "./productContext";
import Product from "../interfaces/Product";

interface ProductProviderProps {
  children: React.ReactNode;
}

function ProductProvider({children}: ProductProviderProps) {
  const [productData, setProductData] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [toggleFav, setToggleFav] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const fetchAllProducts = useFetchProducts();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const allProducts = await fetchAllProducts();
        setProductData(allProducts);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        productData,
        loading,
        toggleFav,
        setToggleFav,
        filteredItems,
        setFilteredItems,
        setProductData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export {ProductProvider, ProductContext};
