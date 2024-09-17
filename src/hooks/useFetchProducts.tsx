const useFetchProducts = () => {
  const fetchProductsByCategory = async (category: string) => {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await response.json();
    return data.products;
  };

  const fetchAllProducts = async () => {
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

      const electronics = [...smartphones, ...laptops].map((product) => ({
        ...product,
        subcategory: "Electronics",
        inCart: false,
        quantity: 1,
        favorite: false,
      }));
      const fashion = [...mensJackets, ...womensDresses].map((product) => ({
        ...product,
        subcategory: "Fashion",
        inCart: false,
        quantity: 1,
        favorite: false,
      }));
      const selfCare = [...skinCare, ...beauty].map((product) => ({
        ...product,
        subcategory: "Self Care",
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
