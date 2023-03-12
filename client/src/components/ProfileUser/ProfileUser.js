import React from "react";
import "./ProfileUser.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function ProfileUser() {
  const currentUser = useSelector((state) => state.userReducer.currentUser);  
  return (
    <div>
      <div>
        <div className="container bootstrap snippets bootdey">
          <div className="row row-profil">
            <div className="profile-nav col-md-3">
              <div className="panel">
                <div className="user-heading round">
                <Link to={`/editprofile/${currentUser._id}`}>
                    <img
                      src={currentUser.profilePicture}
                      alt='img-src'
                    />
                  </Link>
                  <h1>{currentUser.name}</h1>
                  <p>{currentUser.email}</p>
                </div>
                <ul className="nav nav-pills nav-stacked icon-flew">
                  <li className="active icon-color">
                    <Link to="/dashboard">
                      <i className="fa fa-user icon-color" /> Profile
                      </Link>
                  </li>
                  <li>
                    <Link to={`/editprofile/${currentUser._id}`}>
                      <i className="fa fa-edit icon-color" /> Edit profile
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="profile-info col-md-9">
              <div className="panel">
                <div className="bio-graph-heading">
                  Welcome to Beauty Hub, {currentUser.name}! Let's embark on a
                  personalized beauty journey together, where we'll discover
                  your unique beauty needs and create a customized plan just for
                  you.
                </div>
                <div className="panel-body bio-graph-info">
                  <h1>Bio Graph</h1>
                  <div className="row">
                    <div className="bio-row">
                      <p>
                        <span>Full Name </span>: {currentUser.name}
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span>Country </span>: {currentUser.country}
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span>Occupation </span>: {currentUser.occupation}
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span>Email </span>: {currentUser.email}
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span>Mobile </span>: {currentUser.contactInfo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
