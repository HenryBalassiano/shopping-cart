// src/components/Sidebar.tsx

import {useState, useEffect, useRef} from "react";
import useProductContext from "../hooks/useProductContext";
import Product from "../interfaces/Product";

interface Category {
  category: string;
  subcategories: string[];
}

export default function Sidebar() {
  const {productData, setFilteredItems} = useProductContext();
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );

  const getCategories = (products: Product[]): Category[] => {
    const categoryMap: {[key: string]: Set<string>} = {};

    products.forEach((product) => {
      const mainCategory = product.category;
      const subcategory = product.subcategory;

      if (!categoryMap[mainCategory]) {
        categoryMap[mainCategory] = new Set<string>();
      }
      categoryMap[mainCategory].add(subcategory);
    });

    return Object.entries(categoryMap).map(([category, subcategoriesSet]) => ({
      category,
      subcategories: Array.from(subcategoriesSet),
    }));
  };

  const categories: Category[] = getCategories(productData);

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories((prevSelected) =>
      prevSelected.includes(subcategory)
        ? prevSelected.filter((item) => item !== subcategory)
        : [...prevSelected, subcategory]
    );
  };

  const handleCategoryChange = (
    subcategories: string[],
    isChecked: boolean
  ) => {
    setSelectedSubcategories((prevSelected) => {
      if (isChecked) {
        return Array.from(new Set([...prevSelected, ...subcategories]));
      } else {
        return prevSelected.filter((item) => !subcategories.includes(item));
      }
    });
  };

  useEffect(() => {
    if (selectedSubcategories.length === 0) {
      setFilteredItems(productData);
    } else {
      const filtered = productData.filter((product) =>
        selectedSubcategories.includes(product.subcategory)
      );
      setFilteredItems(filtered);
    }
  }, [selectedSubcategories, productData, setFilteredItems]);

  return (
    <div className="w-56 p-8 bg-white sticky top-0 h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Filter by Subcategory</h2>
      {categories.map((categoryItem) => {
        const allSubSelected = categoryItem.subcategories.every((subcat) =>
          selectedSubcategories.includes(subcat)
        );
        const someSubSelected = categoryItem.subcategories.some((subcat) =>
          selectedSubcategories.includes(subcat)
        );

        const checkboxRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
          if (checkboxRef.current) {
            checkboxRef.current.indeterminate =
              !allSubSelected && someSubSelected;
          }
        }, [allSubSelected, someSubSelected]);

        return (
          <div key={categoryItem.category} className="mb-4">
            <label
              htmlFor={`category-${categoryItem.category}`}
              className="flex items-center"
            >
              <input
                id={`category-${categoryItem.category}`}
                type="checkbox"
                checked={allSubSelected}
                ref={checkboxRef}
                onChange={(e) =>
                  handleCategoryChange(
                    categoryItem.subcategories,
                    e.target.checked
                  )
                }
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 font-medium">{categoryItem.category}</span>
            </label>
            <div className="ml-6 mt-2">
              {categoryItem.subcategories.map((subcat) => (
                <label
                  key={subcat}
                  htmlFor={`subcategory-${subcat}`}
                  className="flex items-center mb-1"
                >
                  <input
                    id={`subcategory-${subcat}`}
                    type="checkbox"
                    checked={selectedSubcategories.includes(subcat)}
                    onChange={() => handleSubcategoryChange(subcat)}
                    className="form-checkbox h-3 w-3 text-blue-500"
                  />
                  <span className="ml-2 text-sm">{subcat}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
      <button
        onClick={() => setSelectedSubcategories([])}
        className="mt-6 w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-black transition-colors"
      >
        Clear All
      </button>
    </div>
  );
}
