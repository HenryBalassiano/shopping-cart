import React, {createContext} from "react";
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

export {ProductContext};
