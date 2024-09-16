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
  quantity: number;
  favorite: boolean;
  rating: number;
}
export default Product;
