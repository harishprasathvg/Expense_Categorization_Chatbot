import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import './predictiopage.css'; // Import your CSS file

const PredictionPage = ({ userData = {}, onLogout }) => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/predict', formData);
      
      
       // This line assumes that the response is JSON
     
      setResult(response.data);
      setError(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error uploading image. Please try again.'); // You can set a more specific error message based on the error
      setResult(null); // Clear result if there was an error
    } finally {
      setLoading(false);
    }
    
  };

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing user data from localStorage
    // Then navigate to the "/auth" route
    localStorage.removeItem('username');
    navigate('/auth');
  };

  return (
    <div className="container">
      {loading && <LoadingScreen />}
      <div>
        
        <div className="content">
          <div className="prediction-result">
            <p>Predicted Category: {result ? result.category : 'N/A'}</p>
            
          </div>
          <div className="image-container">
            <input type="file" accept="image/*" className='imageinput' onChange={handleImageChange} />
            <br></br>
            <button className="uploadbutton"  onClick={handleUpload}>Upload</button>
            <br></br>
            {error && <p className="error">{error}</p>}
            <br></br>
            {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PredictionPage;
