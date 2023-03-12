import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  getCurrent,
} from "../../Redux/actions/actionsUser/actionsUser";
import './EditProfileUser.css'

function EditeProfileUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const oldUser = useSelector((state) => state.userReducer.currentUser);
  const [userUpdated, setUserUpdated] = useState(oldUser);
  useEffect(() => {
    dispatch(getCurrent(id));
  }, [id]);
  useEffect(() => {
    setUserUpdated(oldUser);
  }, [oldUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userUpdated.name);
    data.append("country", userUpdated.country);
    data.append("occupation", userUpdated.occupation);
    data.append("contactInfo", userUpdated.contactInfo);
    data.append("email", userUpdated.email);
    data.append("file", userUpdated.profilePicture);

    dispatch(editUser(oldUser._id, data, navigate));
  };
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div>
        <div className="container bootstrap snippets bootdey">
          <div className="row row-profil">
            <div className="profile-nav col-md-3">
              <div className="panel">
              <div className="user-heading round">
                  <a href="#">
                    <img
                      src={userUpdated.profilePicture}
                      alt
                    />
                  </a>
                  <h1>{userUpdated.name}</h1>
                  <p>{userUpdated.email}</p>
                </div>
                <ul className="nav nav-pills nav-stacked icon-flew">
                  <li className="active icon-color">
                    <Link to="/dashboard">
                      <i className="fa fa-user icon-color" /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to={`/editprofile/${userUpdated._id}`}>
                      <i className="fa fa-edit icon-color" /> Edit profile
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="profile-info col-md-9">
              <div className="panel">
                <div className="bio-graph-heading">
                  Edit Profile Informations
                </div>
                <div className="panel-body bio-graph-info">
                  <h1>Bio Graph</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="bio-row">
                        <label htmlFor="name-input">Full Name:</label>
                        <input
                          id="name-input"
                          type="text"
                          value={userUpdated.name}
                          onChange={(e) =>
                            setUserUpdated({
                              ...userUpdated,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="bio-row">
                        <label htmlFor="name-input">Country:</label>
                        <input
                          id="name-input"
                          type="text"
                          value={userUpdated.country}
                          onChange={(e) =>
                            setUserUpdated({
                              ...userUpdated,
                              country: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="bio-row">
                        <label htmlFor="name-input">Occupation:</label>
                        <input
                          id="name-input"
                          type="text"
                          value={userUpdated.occupation}
                          onChange={(e) =>
                            setUserUpdated({
                              ...userUpdated,
                              occupation: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="bio-row">
                        <label htmlFor="name-input">Email:</label>
                        <input
                          id="name-input"
                          type="email"
                          value={userUpdated.email}
                          onChange={(e) =>
                            setUserUpdated({
                              ...userUpdated,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="bio-row">
                        <label htmlFor="name-input">Contact Number:</label>
                        <input
                          id="name-input"
                          type="number"
                          value={userUpdated.contactInfo}
                          onChange={(e) =>
                            setUserUpdated({
                              ...userUpdated,
                              contactInfo: e.target.value,
                            })
                          }
                          required
                        />
                        <input
                        id="input-img"
                    type="file"
                    name="file"
                    onChange={(e) =>
                      setUserUpdated({
                        ...userUpdated,
                        profilePicture: e.target.files[0],
                      })
                    }
                  />
                      </div>
                    </div>
                    <button type="submit">Save</button>
                    <Link to="/dashboard">
                      <button>Cancel</button>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditeProfileUser;
