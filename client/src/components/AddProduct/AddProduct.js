import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../Redux/actions/actionProduct/actionProduct';
import './AddProduct'
function AddProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [img, setImg] =useState("");
  const [rating, setRating] = useState('')
  const [category, setCategory] = useState("SKIN");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name)
    data.append("rating", rating)
    data.append("file", img)
    data.append("category", category);
    dispatch(addProduct(data, navigate))
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
        <h2 className="title-add">Add Product Review</h2>
        <div>
          <label className="description-add" htmlFor="title">
            Name
          </label>
          <input
            type="text"
            id="title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="description-add" htmlFor="description">
            Rating
          </label>
          <input
            id="description"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
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
              onChange={(e) => setImg(e.target.files[0])}
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
  )
}

export default AddProduct