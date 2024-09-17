import HomeCarousel from "./HomeCarousel.tsx";

export default function Home() {
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
        <HomeCarousel />
      </div>
    </div>
  );
}
