import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CompanyList from './CompanyList';
import Graph from './Graph';

function App() {
  // const [company, setCompany] = useState([])

  // useEffect(() => {
  //   fetch('http://localhost:8080/api/all')
  //   .then(response => response.json())
  //   .then(data => {
  //   setState(data);
  //   })
  //   }, []);
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/all' exact={true} element={<CompanyList/>}/>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/graphs" element={<Graph />} />
      </Routes>
    </Router>
  );
}

export default App;
