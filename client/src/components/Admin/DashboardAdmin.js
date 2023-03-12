import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardAdmin.css'
import { Link } from 'react-router-dom';

function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  
  return (
    <div>
      <h1 className='admin-dashboard'>Admin Dashboard</h1>
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
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
             {user.profilePicture && (
                  <Link to={`/admin/editadmin/${user._id}`}>
                    <img className='img-users' src={user.profilePicture} alt={user.name} />
                  </Link>
                )}
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contactInfo}</td>
              <td>{user.country}</td>
              <td>{user.occupation}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardAdmin;
