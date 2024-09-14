import HomeCarousel from "./HomeCarousel.tsx";
import Product from "../interfaces/Product.tsx";

interface HomeProps {
  products: Product[];
}
export default function Home({products}: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-center mb-2">
        Welcome, it's amazin. here
      </h1>
      <h2 className="text-lg text-center mb-4">
        Discover your favorite products
      </h2>
      <div>
        {" "}
        <HomeCarousel products={products} />
      </div>
    </div>
  );
}
