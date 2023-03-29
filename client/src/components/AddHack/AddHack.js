import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addHack } from "../../Redux/actions/actionHack/actionHack";
import "./AddHack.css";


function AddHack() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [imagesrc, setImgesrc] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("SKIN");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("file", imagesrc);
    data.append("category", category);
    dispatch(addHack(data, navigate));
  };
  function handleGoBack() {
    navigate(-1); 
  }

  return (
    <div>
      <form className="add-form" onSubmit={handleSubmit}>
      <section className="add">
        <div className="background-add" />
        <div className="add-content-area">
        <h2 className="title-add">Add Hack</h2>
        <div>
          <label className="description-add" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="description-add" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="flex-choice">
          <div className="flex-category">
            <div className="box">
              <label className="description-add">Choose category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                name="category"
                id="pet-select"
              >
                <option value="NAILS">NAILS</option>
                <option value="HAIR">HAIR</option>
                <option value="MAKEUP">MAKEUP</option>
                <option value="SKIN">SKIN</option>
              </select>
            </div>
          </div>
          
          <div className="flex-category">
          <label className="description-add">Upload Image</label>
          <div className="file-input">
            <input
              type="file"
              name="file"
              onChange={(e) => setImgesrc(e.target.files[0])}
            />
            <label>Choose File</label>
            </div>
          </div>
        </div>
        </div>
        <div className="flex-btn">
          <button type="submit">Add</button>
          
            <button onClick={handleGoBack} type="submit">Cancel</button>
          
        </div>
        </div>
      </section>
      </form>
    </div>
  );
}

export default AddHack;
