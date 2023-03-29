import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletedHack } from "../../Redux/actions/actionHack/actionHack";
import "./HackCard";

function HackCard({ el }) {
  const user = useSelector((state) => state.userReducer.currentUser);
  const dispatch =useDispatch()
  const createdAt = new Date(el.createdAt).toLocaleDateString();
 const canEditOrDelete = user._id === el.user?._id;
  return (
    <>
      <ul id="card-list">
        <li id="card">
          <div id="card-image">
            <img id="img-card" src={el.imagesrc} alt="src_img" />
          </div>
          <div id="card-description">
            <h1>{el.title}</h1>
          </div>
          <div id="card-description">
            {el.description}
          </div>
          <div id="card-description">
        <span>createdAt:</span><p>{createdAt}</p>
          </div>
          <div id="card-description">
        <span>createdBy:</span><p>{el.user.name}</p>
          </div>

          {canEditOrDelete && (
            <div className="btn-flex">
              <Link to={`/edithack/${el._id}`}>
                <button className="button-56" type="submit">
                  Edit
                </button>
              </Link>
              <button
                className="button-56"
                type="submit"
                onClick={() => dispatch(deletedHack(el._id))}
              >
                Delete
              </button>
            </div>
          )}
          
        </li>
      </ul>
    </>
  );
}

export default HackCard;
