// hooks/useFetchProducts.tsx

import {useEffect, useState} from "react";
import Product from "../interfaces/Product";

// Define the category mapping within this file
const categoryMapping: {
  [key: string]: {mainCategory: string; subcategory: string};
} = {
  smartphones: {mainCategory: "Electronics", subcategory: "Smartphones"},
  laptops: {mainCategory: "Electronics", subcategory: "Laptops"},
  "mens-jackets": {mainCategory: "Fashion", subcategory: "Mens Jackets"},
  "womens-dresses": {mainCategory: "Fashion", subcategory: "Womens Dresses"},
  "skin-care": {mainCategory: "Self Care", subcategory: "Skin Care"},
  beauty: {mainCategory: "Self Care", subcategory: "Beauty"},
  // Add more mappings as needed
};

const useFetchProducts = () => {
  const fetchProductsByCategory = async (category: string) => {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch category: ${category}`);
    }
    const data = await response.json();
    return data.products;
  };

  const fetchAllProducts = async (): Promise<Product[]> => {
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

      const electronics = smartphones.concat(laptops).map((product: any) => ({
        ...product,
        category: categoryMapping[product.category].mainCategory,
        subcategory: categoryMapping[product.category].subcategory,
        inCart: false,
        quantity: 1,
        favorite: false,
      }));

      const fashion = mensJackets.concat(womensDresses).map((product: any) => ({
        ...product,
        category: categoryMapping[product.category].mainCategory,
        subcategory: categoryMapping[product.category].subcategory,
        inCart: false,
        quantity: 1,
        favorite: false,
      }));

      const selfCare = skinCare.concat(beauty).map((product: any) => ({
        ...product,
        category: categoryMapping[product.category].mainCategory,
        subcategory: categoryMapping[product.category].subcategory,
        inCart: false,
        quantity: 1,
        favorite: false,
      }));

      return [...electronics, ...fashion, ...selfCare];
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  return fetchAllProducts;
};

export default useFetchProducts;
