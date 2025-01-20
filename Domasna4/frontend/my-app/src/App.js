import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CompanyList from './CompanyList';
import Graph from './Graph';
import TechAnalysisChart from './TechAnalysisChart';
import Login from './Login';  
import Register from './Register';  
import FundamentalAnalysis from './FundAnalysis';
function App() {


  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/all' exact={true} element={<CompanyList/>}/>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/graphs" element={<Graph />} />
        <Route path='/tech-analysis' element={<TechAnalysisChart/>}/>
        <Route path='/fund-analysis' element={<FundamentalAnalysis/>}/>
      </Routes>
    </Router>
  );
}

export default App;
