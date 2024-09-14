import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useProducts} from "../hooks/useProducts.tsx";
import Product from "../interfaces/Product.tsx";
import FilterDropdown from "./FilterDropdown.tsx";
interface HomeProps {
  products: Product[];
}

export default function HomeCarousel({products}: HomeProps) {
  const {hasProducts} = useProducts(products);
  const [selectedOption, setSelectedOption] = useState<string>("All Products");
  const [isOpen, setIsOpen] = useState<bbesoolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,

          initialSlide: 1,
        },
      },
    ],
  };
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    setSelectedOption(option);

    if (option !== "All Products") {
      const filteredData = products.filter(
        (item) => item.subcategory === option
      );
      setFilteredProducts(filteredData);
    } else {
      setFilteredProducts(products);
    }
    setIsOpen(false);
  };

  if (hasProducts) {
    return (
      <div className="relative w-full max-w-80 sm:max-w-3xl mx-auto">
        <div className="relative h-12">
          <FilterDropdown
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            selectedOption={selectedOption}
            handleSelect={handleSelect}
          />
        </div>
        <Slider {...settings}>
          {filteredProducts.slice(0, 9).map((item) => (
            <div key={item.id} className="p-1">
              <div className="rounded-md bg-gray-300 h-60 w-65 flex items-center justify-center overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="object-contain h-full w-full max-w-60 max-h-60"
                />{" "}
              </div>{" "}
              <span className="font-normal text-lg text-center mb-4">
                {" "}
                {item.title} <br />
                <span className="font-semibold">${item.price}</span>
              </span>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
