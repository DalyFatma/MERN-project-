import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editUserByAdmin, getUserById } from "../../Redux/actions/actionAdmin/actionAdmin";


function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const previousUser = useSelector((state) => state.adminReducer.users);
  const userToEdit = previousUser && previousUser.find(user => user._id === id);
  const [newUser, setNewUser] = useState(userToEdit);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id]);

  useEffect(() => {
    if (previousUser && id) {
      const updatedUser = previousUser.find((user) => user._id === id);
      if (updatedUser) {
        setNewUser(updatedUser);
      }
    }
  }, [previousUser, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", newUser.name);
    data.append("country", newUser.country);
    data.append("occupation", newUser.occupation);
    data.append("contactInfo", newUser.contactInfo);
    data.append("email", newUser.email);
    data.append("role", newUser.role);
    data.append("file", newUser.profilePicture);
    dispatch(editUserByAdmin(newUser._id, data, navigate));
    dispatch(getUserById(id));

    
  };

  return (
    <div>
    <div>
      <div className="container bootstrap snippets bootdey">
        <div className="row row-profil">
          <div className="profile-nav col-md-3">
            <div className="panel">
            <div className="user-heading round">
                <a href="#">
                  <img
                    src={userToEdit.profilePicture}
                    alt
                  />
                </a>
                <h1>{userToEdit.name}</h1>
                <p>{userToEdit.email}</p>
              </div>
              <ul className="nav nav-pills nav-stacked icon-flew">
                <li className="active icon-color">
                  <Link to="/dashboard">
                    <i className="fa fa-user icon-color" /> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/editprofile">
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
                        value={newUser.name}
                        onChange={(e) =>
                            setNewUser({
                            ...newUser,
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
                        value={newUser.country}
                        onChange={(e) =>
                            setNewUser({
                            ...newUser,
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
                        value={newUser.occupation}
                        onChange={(e) =>
                            setNewUser({
                            ...newUser,
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
                        value={newUser.email}
                        onChange={(e) =>
                            setNewUser({
                            ...newUser,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="bio-row">
                      <label htmlFor="name-input">Role:</label>
                      <input
                        id="name-input"
                        type="text"
                        value={newUser.role}
                        onChange={(e) =>
                            setNewUser({
                            ...newUser,
                            role: e.target.value,
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
                        value={newUser.contactInfo}
                        onChange={(e) =>
                            setNewUser({
                            ...newUser,
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
                    setNewUser({
                      ...newUser,
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

export default EditUserPage;
