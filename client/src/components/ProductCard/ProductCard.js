import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletedProduct } from "../../Redux/actions/actionProduct/actionProduct";
import "./ProductCard.css";

function ProductCard({el}) {
  const dispatch = useDispatch();
  return (
    <div>
      <ul id="card-list">
        <li id="card">
          <div id="card-image">
            <img id="img-card" src={el.imagesrc} alt="src_img" />
          </div>
          <div id="card-description">
            <h1>{el.name}</h1>
            <p>
              <span>Rating:</span> {el.rating}
            </p>
          
          </div>

          <div className="btn-flex">
            <Link to={`/editproduct/${el._id}`}>
              <button className="button-56" type="submit">
                Edit
              </button>
            </Link>
            <button
              className="button-56"
              type="submit"
              onClick={() => dispatch(deletedProduct(el._id))}
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ProductCard;
