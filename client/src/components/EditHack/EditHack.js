import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  edithack,
  getOneHack,
} from "../../Redux/actions/actionHack/actionHack";

function EditHack() {
  const { id } = useParams();
  const navigate = useNavigate();
  const oldHack = useSelector((state) => state.hackReducer.oneHack);
  const [hackUpdated, setHackUpdated] = useState(oldHack);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneHack(id));
  }, [id]);
  useEffect(() => {
    setHackUpdated(oldHack);
  }, [oldHack]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", hackUpdated.title);
    data.append("description", hackUpdated.description);
    data.append("category", hackUpdated.category);
    data.append("file", hackUpdated.imagesrc);

    dispatch(edithack(oldHack._id, data, navigate));
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
            <h2 className="title-add">Update Hack</h2>
            <div>
              <label className="description-add" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={hackUpdated.title}
                onChange={(e) =>
                  setHackUpdated({ ...hackUpdated, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="description-add" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                value={hackUpdated.description}
                onChange={(e) =>
                  setHackUpdated({
                    ...hackUpdated,
                    description: e.target.value,
                  })
                }
              ></textarea>
              <div className="flex-choice">
                <div className="flex-category">
                  <div className="box">
                    <label className="description-add">Choose category:</label>
                    <select
                      value={hackUpdated.category}
                      onChange={(e) =>
                        setHackUpdated({
                          ...hackUpdated,
                          category: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setHackUpdated({
                          ...hackUpdated,
                          imagesrc: e.target.files[0],
                        })
                      }
                    />
                    <label>Choose File</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-btn">
              <button type="submit">Save Changes</button>

              <button onClick={handleGoBack} type="button">
                Cancel
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

export default EditHack;
