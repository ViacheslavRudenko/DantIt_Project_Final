import { useSelector } from "react-redux";
import ProductCard from "./ProductCard/ProductCard";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { categorieProductList, isLoading, hasError } = useSelector(
    (state) => state.catalog
  );

  return (
    <div className="productlist-wrapper">
      {categorieProductList.length === 0 && (
        <span>Sorry, we have nothing to offer you based on these filter</span>
      )}
      {hasError ? (
        <span>Opps, error! Please, try again!</span>
      ) : isLoading ? (
        <span className="">Loading...</span>
      ) : (
        categorieProductList.map((card) => {
          return (
            <Link
              to={card.productUrl}
              className="productlist-wrapper__card"
              key={card._id}
            >
              <ProductCard
                image={card.imageUrls[0]}
                name={card.name}
                price={card.currentPrice}
              />
            </Link>
          );
        })
      )}
    </div>
  );
};

export default ProductList;
