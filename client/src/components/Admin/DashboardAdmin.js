import React, { useState } from "react";
import "./DashboardAdmin.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  banUser,
  unbanUser 
} from "../../Redux/actions/actionBanning/actionBanning";
import { deletedUser, setUsers } from "../../Redux/actions/actionAdmin/actionAdmin";

function DashboardAdmin() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminReducer.users);

  const handleDelete = (id) => {
    dispatch(deletedUser(id));
  };

  const toggleBan = (user) => {
    const shouldBan = !user.isBanned;
    shouldBan ? dispatch(banUser(user._id)) : dispatch(unbanUser(user._id));

    const updatedUsers = users.map((u) => {
      if (u._id === user._id) {
        return { ...u, isBanned: shouldBan };
      } else {
        return u;
      }
    });
  
    dispatch(setUsers(updatedUsers));
  };
  

  return (
    <div>
      <h1 className="admin-dashboard">Dashboard Admin</h1>
      <table>
        <thead>
          <tr>
            <th>ProfilePicture</th>
            <th>Name</th>
            <th>Email</th>
            <th>ContactInfo</th>
            <th>Country</th>
            <th>Occupation</th>
            <th>Role</th>
            <th>Banned</th>
            <th>Toggle Ban</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              {user.profilePicture && (
                <Link to={`/admin/editadmin/${user._id}`}>
                  <img
                    className="img-users"
                    src={user.profilePicture}
                    alt={user.name}
                  />
                </Link>
              )}
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contactInfo}</td>
              <td>{user.country}</td>
              <td>{user.occupation}</td>
              <td>{user.role}</td>
              <td>{user.isBanned ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => toggleBan(user)}>
                  {user.isBanned ? "Unban" : "Ban"}
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(user._id)}>
                  <i className="delete-user-icon fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardAdmin;
