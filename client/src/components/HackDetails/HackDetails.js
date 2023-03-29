import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deletedHack } from "../../Redux/actions/actionHack/actionHack";

function HackDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const hack = useSelector((state) =>
    state.hackReducer.hacks.find((hack) => hack._id === id)
  );
  const [comment, setComment] = useState("");
  const createdAt = new Date(hack.createdAt).toLocaleDateString();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log(comment);
    setComment("");
  };

  return (
    <>
        <img src={hack.imagesrc} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{hack.title}</h5>
          <p className="card-text">
          {hack.description}
          </p>
          <p className="card-text">
          <span>createdBy:</span> {hack.user && <p>By: {hack.user.name}</p>}
          </p>
          <p className="card-text">
          {hack.description}
          </p>
          <Link to={`/edithack/${hack._id}`}>
            <button className="button-56" type="submit">
              Edit
            </button>
          </Link>
          <button
            className="button-56"
            type="submit"
            onClick={() => dispatch(deletedHack(hack._id))}
          >
            Delete
          </button>
        </div>
      

     
    </>
  );
}

export default HackDetails;
