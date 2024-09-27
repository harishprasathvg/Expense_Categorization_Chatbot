import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';
import LoadingScreen from './LoadingScreen';


const Register = ({ onSwitchForm }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
 
  const [formData_register, setFormData_register] = useState({
    username: '',
    password: '',
    email: '',
    role: 'Buyer',
  });

  const handleChange_register = (e) => {
    setFormData_register({
      ...formData_register,
      [e.target.name]: e.target.value,
    });
  };

  const [error, setError] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData_register.username === '') {
      alert("Enter Valid Username");
    } else if (formData_register.password === '') {
      alert("Enter Valid Password");
    } else if (formData_register.email === '') {
      alert("Enter Valid Confirm Password");
    } else {
      setLoading(true);
      navigate('/buy', { replace: true });
    }
  };
  

  return (
    <div>
      <h2 style={{color:'white'}}>Welcome To Auction !!!</h2>
    <div className="first">
      {loading && <LoadingScreen />}
      <h2>User Registration</h2>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input type="text" name="username" value={formData_register.username} onChange={handleChange_register} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData_register.password} onChange={handleChange_register} />
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" name="confirmpassword" value={formData_register.confirmpassword} onChange={handleChange_register} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData_register.email} onChange={handleChange_register} />
        </label>
        <br />
        <label>
          Role:
          <select name="role" value={formData_register.role} onChange={handleChange_register}>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
        </label>
        <br />
        <button type="submit">Register</button>
        <p>
          Already have an account? Click here to{' '}
          <button type='button' onClick={() => onSwitchForm('login')}>Login</button>
          {error && <p className="error-message">{error}</p>}
        </p>
      </form>
      
    </div>
    </div>
  );
};

export default Register;
