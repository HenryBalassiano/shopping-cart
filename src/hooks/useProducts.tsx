import Product from "../interfaces/Product.tsx";
export const useProducts = (products: Product[]) => {
  const hasProducts = products && products.length > 0;
  return {products, hasProducts};
};
