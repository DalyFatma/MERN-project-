import React from "react";
import {ProductCard} from "../ProductCard/ProductCard";

function ProductList() {
  const productReview = useSelector((state) => state.hackProduct.products);
  
  return (
    <>
      <div className="flex">
        {productReview.map((el) => (
          <ProductCard key={el._id} el={el} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
