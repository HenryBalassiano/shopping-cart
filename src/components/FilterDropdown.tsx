import {useState} from "react";
import {IoFilter} from "react-icons/io5";
interface FilterDropdown {
  isOpen: boolean;
  toggleDropdown: () => void;
  selectedOption: string;
  handleSelect: (option: string) => void;
}

const FilterDropdown = ({
  isOpen,
  toggleDropdown,
  selectedOption,
  handleSelect,
}: FilterDropdown) => {
  return (
    <div className="relative w-full max-w-80 sm:max-w-3xl mx-auto">
      <div className="relative h-12 flex items-center">
        <button
          onClick={toggleDropdown}
          className="w-full bg-gray-100 py-2 px-4 text-left flex justify-between items-center border border-gray-300 rounded-md"
        >
          <span>{selectedOption}</span>
          <IoFilter className="text-3xl" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded-md w-full z-10">
          <div
            className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect("All Products")}
          >
            All Products
          </div>
          {["Fashion", "Electronics", "Self Care"].map((item, index) => (
            <div
              key={index}
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
