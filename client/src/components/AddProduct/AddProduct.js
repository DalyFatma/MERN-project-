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
  const [category, setCategory] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name)
    data.append("rating", rating)
    data.append("file", img)
    data.append("category", category);
    dispatch(addProduct(data, navigate))
  };
  return (
    <>
      <div>
      <h2 className='title-add'>Add a new ProductReview</h2>
      <form className='add-form' onSubmit={handleSubmit}>
        <div>
          <label className='description-add' htmlFor="title">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className='description-add' htmlFor="description">Rating</label>
          <input
            id="description"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <input
          type="file" 
          name='file'
          onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <label> choose category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}  name="category" id="pet-select">
            <option value="NAILS">NAILS</option>
            <option value="HAIR">HAIR</option>
            <option value="MAKEUP">MAKEUP</option>
            <option value="SKIN">SKIN</option>
          </select>
        <button type="submit">Add</button>
      </form>
    </div>  
    </>
  )
}

export default AddProduct