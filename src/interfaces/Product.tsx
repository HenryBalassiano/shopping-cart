interface Product {
  brand: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  title: string;
  id: number;
  electronics: Product[];
  fashion: Product[];
  subcategory: string;
  inCart: boolean;
}
export default Product;
