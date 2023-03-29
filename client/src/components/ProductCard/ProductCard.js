import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletedProduct } from "../../Redux/actions/actionProduct/actionProduct";
import "./ProductCard.css";

function ProductCard({el}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.currentUser);
  const createdAt = new Date(el.createdOn).toLocaleDateString();
  const canEditOrDelete = user._id === el.user?._id;
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
          <div id="card-description">
        <span>createdAt:</span><p>{createdAt}</p>
          </div>
          <div id="card-description">
        <span>createdBy:</span><p>{el.user.name}</p>
          </div>

          {canEditOrDelete && (
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
          )}
        </li>
      </ul>
    </div>
  );
}

export default ProductCard;
