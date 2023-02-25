import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
    const [userName, setUserName] = useState('');

    return (
        <>
        <input type="text" className="search-bar" placeholder="Enter Username" onChange={e => setUserName(e.target.value)}/>
        <Link to={`/users/${userName}`}><button className="search-button">Search</button></Link>
        </>
    )
}

export default SearchBar;