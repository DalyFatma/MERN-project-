import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { edithack, getOneHack } from "../../Redux/actions/actionHack/actionHack";


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
    console.log(hackUpdated);
    const data = new FormData();
    data.append("title", hackUpdated.title);
    data.append("description", hackUpdated.description);
    data.append("file",hackUpdated.imagesrc)
    dispatch(edithack(oldHack._id, data, navigate));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={hackUpdated.title}
          onChange={(e) =>
            setHackUpdated({ ...hackUpdated, title: e.target.value })
          }
        />
        <input
          type="text"
          value={hackUpdated.description}
          onChange={(e) =>
            setHackUpdated({ ...hackUpdated, description: e.target.value })
          }
        />
        <input
          type="file"
          name="imagesrc"
          onChange={(e) =>
            setHackUpdated({ ...hackUpdated, imagesrc: e.target.files[0] })
          }
        />
        <button type="submit">Save Changes</button>
        <Link to="/dashboard">
          <button>Cancel</button>
        </Link>
      </form>
    </div>
  );
}

export default EditHack;
