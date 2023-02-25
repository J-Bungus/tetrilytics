import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading';

const LeaderBoard = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  let slowDownComponent = <div></div>

  useEffect(() => {
    const getTopPlayers = async () => {
        const response = await axios.get('http://localhost:8080/https://ch.tetr.io/api/users/lists/league/?limit=100')
        setPlayers(response.data.data.users)
        if (response.status === 429) {
            slowDownComponent = <div>Woooooaaah! Too many requests. Please wait before refreshing the page.</div>
            setIsError(true);
        }
        setIsLoading(false);
    }

    getTopPlayers();
  }, []);

  if (isLoading) {
    return <Loading/>
  }

  if (isError) {
    return (
        {slowDownComponent}
    )
  }
  return (
    <div className="board-wrapper">
        <div className="leaderboard">
        <h1>Top 100 Players</h1>
        <table>
            <thead>
            <tr>
                <th>Place</th>
                <th>Name</th>
                <th>Rank</th>
                <th>Rating</th>
                <th>Ranked Games Played</th>
                <th>Ranked Games Won</th>
                <th>PPS</th>
                <th>APM</th>
                <th>VS</th>
            </tr>
            </thead>
            <tbody>
            {players.map((player, index) => (
                <tr>
                    <th>{index+1}</th>
                    <th><Link className="top-player-names" to={`/users/${player.username}`}>{player.username}</Link></th>
                    <th><img className="rank-img" src={require(`../images/${player.league.rank}.png`)} alt={player.league.rank}/></th>
                    <th>{Math.round(player.league.rating * 100)/100}</th>
                    <th>{player.league.gamesplayed}</th>
                    <th>{player.league.gameswon}</th>
                    <th>{player.league.pps}</th>
                    <th>{player.league.apm}</th>
                    <th>{player.league.vs}</th>
                </tr>
            ))}
            </tbody>
            <div className="filler">filler</div>
        </table>
        </div>
    </div>
  );
}

export default LeaderBoard;
