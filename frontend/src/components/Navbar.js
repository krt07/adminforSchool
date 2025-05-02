import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/students">Demo</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          <li className="nav-item">
            <Link className="nav-link" to="/students">Students</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/teachers">Teachers</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/subjects">Subjects</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/assign-subjects">Assign Student</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/assign-teacher-subjects">Assign Teacher</Link>
          </li>
        </ul>
        <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
