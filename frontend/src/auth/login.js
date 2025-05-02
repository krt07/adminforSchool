import React, { useState } from 'react';
import API from '../apis/apis';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { username, password });
      saveToken(res.data.token);
      navigate('/students');
    } catch (error) {
      console.error(error);  
      console.error("Login failed:", error.response?.data || error.message);
      alert('Login failed');
    }
  };
  
  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" className="form-control" value={username}
            onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group mt-3">
          <label>Password:</label>
          <input type="password" className="form-control" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary mt-4" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
