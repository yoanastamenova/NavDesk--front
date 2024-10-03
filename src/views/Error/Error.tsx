import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import './Error.css';

export const Error = () => {
  return (
    <>
      <Navbar />
      <div className="error-container">
        <h1 className="error-code">404</h1>
        <p className="error-message">Oops! The page you're looking for isn't here.</p>
        <p className="suggestion-text">You might have the wrong address, or the page may have moved.</p>
        <button onClick={() => window.history.back()} className="go-back-btn">Go Back</button>
      </div>
    </>
  );
}