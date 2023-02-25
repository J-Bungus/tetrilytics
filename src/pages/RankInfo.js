import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RankStats from '../components/RankStats';
import Loading from '../components/Loading';

const RankInfo = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let res = await axios.get('http://localhost:8080/https://ch.tetr.io/api/users/lists/league/all');
            setPlayerData(res.data.data.users);
            setIsLoading(false);
        }

        getData();
    }, []);

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div className="graphs-container">
        <div className="graph rank-distribution">
            <h2>Rank Distribution</h2>
            {/* code for Rank Distribution graph */}
        </div>
        <div className="graph average-winrate">
            <h2>Average Winrate</h2>
            {/* code for Average Winrate graph */}
        </div>
        <div className="graph stat-averages">
            <h2>Stat Averages for Each Rank</h2>
            {<RankStats playerData={playerData}/>}
        </div>
        </div>
    );
}

export default RankInfo;
