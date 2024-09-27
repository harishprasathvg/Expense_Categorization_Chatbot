import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

const AuthManager = () => {
  const [currentForm, setCurrentForm] = useState('login');

  const handleSwitchForm = (form) => {
    setCurrentForm(form);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {currentForm === 'login' ? (
        <Login onSwitchForm={handleSwitchForm} />
      ) : (
        <Register onSwitchForm={handleSwitchForm} />
      )}
    </div>
  );
};

export default AuthManager;
