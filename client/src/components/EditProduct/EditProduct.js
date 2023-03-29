import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editProduct, getOneProduct } from '../../Redux/actions/actionProduct/actionProduct';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const oldProduct = useSelector((state) => state.productReducer.oneProduct);
  const [productUpdated, setProductUpdated] = useState(oldProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneProduct(id));
  }, [id]);
  useEffect(() => {
    setProductUpdated(oldProduct);
  }, [oldProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", productUpdated.name);
    data.append("rating", productUpdated.rating);
    data.append("category", productUpdated.category);
    data.append("file",productUpdated.imagesrc)
    dispatch(editProduct(oldProduct._id, data, navigate));
  };
  function handleGoBack() {
    navigate(-1); 
  }
  return (
    <div>
 <div>
    <form className="add-form" onSubmit={handleSubmit}>
    <section className="add">
      <div className="background-add" />
      <div className="add-content-area">
      <h2 className="title-add">Update Product</h2>
      <div>
        <label className="description-add" htmlFor="title">
          Name
        </label>
        <input
          type="text"
          id="title"
          value={productUpdated.name}
          onChange={(e) => setProductUpdated({ ...productUpdated, name: e.target.value })}
        />
      </div>
      <div>
        <label className="description-add" htmlFor="description">
          Rating
        </label>
        <input
          id="description"
          type="number"
          value={productUpdated.rating}
          onChange={(e) =>  setProductUpdated({ ...productUpdated, rating: e.target.value })}
        />
        <div className="flex-choice">
        <div className="flex-category">
          <div className="box">
            <label className="description-add">Choose category:</label>
            <select
              value={productUpdated.category}
              onChange={(e) => setProductUpdated({ ...productUpdated, category: e.target.value })}
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
            onChange={(e) => setProductUpdated({ ...productUpdated, imagesrc: e.target.files[0] })}
          />
          <label>Choose File</label>
          </div>
        </div>
      </div>
      </div>
      <div className="flex-btn">
        <button type="submit">Save Changes</button>
        
          <button onClick={handleGoBack} type="button">Cancel</button>
        
      </div>
      </div>
    </section>
    </form>
  </div>
        
    </div>
  )
}

export default EditProduct