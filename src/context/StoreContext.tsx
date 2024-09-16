import React, {createContext, useEffect, useState} from "react";
import Product from "../interfaces/Product";

interface ProductContextType {
  productData: Product[];
  loading: boolean;
  toggleFav: boolean;
  setToggleFav: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredItems: React.Dispatch<React.SetStateAction<Product[]>>;
  filteredItems: Product[];
  setProductData: React.Dispatch<React.SetStateAction<Product[]>>;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);
interface ProductProviderProps {
  children: React.ReactNode;
}
function ProductProvider({children}: ProductProviderProps) {
  const [productData, setProductData] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [toggleFav, setToggleFav] = useState<boolean>(false);
  const fetchProductsByCategory = async (category: string) => {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await response.json();

    return data.products;
  };
  const [loading, setLoading] = useState(true);

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
          quantity: 1,
          favorite: false,
        }));
        const fashion = [...mensJackets, ...womensDresses].map((product) => ({
          ...product,
          subcategory: "Fashion",
          inCart: false,
          quantity: 1,
          favorite: false,
        }));
        const selfCare = [...skinCare, ...beauty].map((product) => ({
          ...product,
          subcategory: "Self Care",
          inCart: false,
          quantity: 1,
          favorite: false,
        }));
        console.log(selfCare, "henry balassianop");

        setLoading(false);

        const allProducts = [...electronics, ...fashion, ...selfCare];

        setProductData(allProducts);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);
  console.log(toggleFav, "sdsd");
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
export {ProductContext, ProductProvider};
