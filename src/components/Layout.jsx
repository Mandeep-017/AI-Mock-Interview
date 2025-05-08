// components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import './Layout.css'; // Optional

const Layout = ({ children, noBackground = false }) => {
  return (
    <div className={`layout ${noBackground ? 'simple' : ''}`}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
