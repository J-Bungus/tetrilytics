import React from 'react';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <h1 className="title">Tetrilytics</h1>
        <div className="search-container">
          <SearchBar/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
