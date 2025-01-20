import React from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
     
      <nav className="navbar">
        <div className="logo">
          <NavLink to="/" className="nav-link">StocksMK</NavLink>
        </div>
        <div className="nav-links">
          <NavLink 
            to="/" 
            className="nav-link" 
            activeClassName="active-link"
            exact
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/tech-analysis" 
            className="nav-link" 
            activeClassName="active-link"
            exact
          >
            Tech Analysis
          </NavLink>

          <NavLink 
            to="/fund-analysis" 
            className="nav-link" 
            activeClassName="active-link"
            exact
          >
            Fundamental Analysis
          </NavLink>
          <NavLink 
            to="/login" 
            className="nav-link" 
            activeClassName="active-link"
          >
            
            Login
          </NavLink>
          <NavLink 
            to="/register" 
            className="nav-link" 
            activeClassName="active-link"
          >
            Register
          </NavLink>
        </div>
      </nav>

      
      <div className="home-container">
        <h1 className="title">Welcome to StocksMK!</h1>
        <p className="description">Explore the list of companies and their stock details.</p>
        <div className="link-container">
            <NavLink to="/all" className="btn-link">See Stocks List</NavLink>
        </div>
      </div>
    </>
  );
}

export default Home;
