import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './pages/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RankInfo from './pages/RankInfo';
import LeaderBoard from './pages/LeaderBoard';
import User from './pages/User';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path="" element={<HomePage />} /> 
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ranks" element={<RankInfo />} />
          <Route path="/leaderboards" element={<LeaderBoard />} />
          <Route path="/users/:userName" element={<User/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
