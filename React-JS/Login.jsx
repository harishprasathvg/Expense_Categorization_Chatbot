import React, { useState } from 'react';
import './newcss.css'; // Import the CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

const Login = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formData.username === '') {
      alert("Enter Valid Username");
    } else if (formData.password === '') {
      alert("Enter Valid Password");
    } else {
      try {
        // Simulate login process
        const response = await axios.post('http://localhost:8080/api/users/login', null, {
          params: {
           username: formData.username,
             password: formData.password
          }
         });
         localStorage.setItem('userdetails', response.data);
        localStorage.setItem('username', formData.username);
        navigate('/predict', { replace: true });
      } catch (error) {
        // console.error('Login failed:', error.message);
        setError('Invalid username or password. Please try again.'); // Set an error message
      }
    }
  };

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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData_register.username === '') {
      alert("Enter Valid Username");
    } else if (formData_register.password === '') {
      alert("Enter Valid Password");
    } else if (formData_register.email === '') {
      alert("Enter Valid Confirm Password");
    } else {
      setLoading(true);
      try {
        // Simulate registration process
         const response = await axios.post('http://localhost:8080/api/users/register', formData_register);
         localStorage.setItem('userdetails', response.data);
        localStorage.setItem('username', formData_register.username);
        navigate('/predict', { replace: true });
      } catch (error) {
         console.error('Registration failed:', error.message);
        setError('Registration failed. Please try again.'); // Set an error message
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleForm = () => {
    setIsLoginFormVisible(prevState => !prevState);
  };

  return (
    <div className="form-structor">
      {loading && <LoadingScreen />}
      <div className={`signup ${isLoginFormVisible ? '' : 'slide-up'}`}>
        <h2 className="form-title" id="signup" onClick={toggleForm}><span>or</span>Sign In</h2>
        <div className="form-holder">
          <form>
            <input type="email" className="input" placeholder="Email" name="username" value={formData.username} onChange={handleChange} />
            <input type="password" className="input" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
          </form>
        </div>
        <button className="submit-btn" onClick={handleLogin}>Sign In</button>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className={`login ${isLoginFormVisible ? 'slide-up' : ''}`}>
        <div className="center">
          <h2 className="form-title" id="login" onClick={toggleForm}><span>or</span>Sign Up</h2>
          <div className="form-holder">
            <form>
              <input type="text" className="input" placeholder="Name" name='username' value={formData_register.username} onChange={handleChange_register} />
              <input type="email" className="input" placeholder="Email" name='email' value={formData_register.email} onChange={handleChange_register} />
              <input type="password" className="input" placeholder="Password" name='password' value={formData_register.password} onChange={handleChange_register} />
              <input type="password" className="input" placeholder="Confirm Password" name='confirmpassword' value={formData_register.confirmpassword} onChange={handleChange_register} />
            </form>
          </div>
          <button className="submit-btn" type="submit" onClick={handleRegister}>Sign Up</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
