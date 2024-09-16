// Favorites.tsx
import {useContext} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {ProductContext} from "../context/StoreContext.tsx";

export default function Favorites() {
  const productContext = useContext(ProductContext);
  if (!productContext) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }
  const {productData, setFilteredItems, setToggleFav, toggleFav} =
    productContext;

  const favoriteItems = productData.filter((item) => item.favorite);
  const handleFavorites = () => {
    toggleFavoriteFilter();
  };

  const toggleFavoriteFilter = () => {
    setToggleFav((prevToggleFav) => {
      const newToggleFav = !prevToggleFav;

      if (newToggleFav) {
        if (favoriteItems.length > 0) {
          console.log("Showing favorites");
          setFilteredItems(favoriteItems);
        } else {
          setFilteredItems([]);
        }
      } else {
        setFilteredItems(productData);
      }

      console.log(newToggleFav, "favorites!");
      return newToggleFav;
    });
  };
  return (
    <div className="relative flex items-center" onClick={handleFavorites}>
      {" "}
      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-xs px-2">
        {favoriteItems.length > 0 ? favoriteItems.length : 0}
      </span>
      <Link to="/shopping">
        {toggleFav ? (
          <FontAwesomeIcon icon={faHeartSolid} className="w-6 h-6 mt-1" />
        ) : (
          <FontAwesomeIcon icon={faHeartRegular} className="w-6 h-6 mt-1" />
        )}{" "}
      </Link>
    </div>
  );
}
