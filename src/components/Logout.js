
import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    
    console.log('User logged out');
   
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
