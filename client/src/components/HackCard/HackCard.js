import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addHack, deletedHack } from "../../Redux/actions/actionHack/actionHack";
import "./HackCard";

function HackCard({ el }) {
  const user = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();
  console.log(el.user);
  console.log(user._id);
  const [newHack, setNewHack] = useState({});

  useEffect(() => {
    if (newHack) {
      dispatch(addHack(newHack));
    }
  }, [dispatch, newHack]);

  console.log("comp", el.user == user._id);
  return (
    <>
      <ul id="card-list">
        <li id="card">
          <div id="card-image">
            <img id="img-card" src={el.imagesrc} alt="src_img" />
          </div>
          <div id="card-description">
            <h1>{el.title}</h1>
            <p>
              <span>Description:</span> {el.description}
            </p>
          </div>
          <div className="btn-flex">
            <Link to={`/edithack/${el._id}`}>
              <button className="button-56" type="submit">
                Edit
              </button>
            </Link>
            {el.user && el.user._id === user._id ? (
              <button
                className="button-56"
                type="submit"
                onClick={() => dispatch(deletedHack(el._id))}
              >
                Delete
              </button>
            ) : null}
          </div>
        </li>
      </ul>
    </>
  );
}

export default HackCard;
