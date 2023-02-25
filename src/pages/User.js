import UserNotFound from "./UserNotFound";
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from "../components/Loading";

const User = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
      "success": false,
      "data": {
          "user": {
              "league": {}
          }
      }
  });
  const [recordInfo, setRecordInfo] = useState({
      "data": {
          "records": {
              "40l": {
                  "record": {
                      "endcontext": {}
                  }
              },
              "blitz": {
                  "record": {
                      "endcontext": {}
                  }
              }
          }
      }
  });
  let rankComponent = <div></div>
  let sprintComponent = <div></div>
  let blitzComponent = <div></div>
  let avatar = <img></img>
  let banner = <img></img>
  const param = useParams();
  const userName = param.userName;
  
  useEffect(() => {
      const search = async (userName) => {
          const response = await axios.get(`http://localhost:8080/https://ch.tetr.io/api/users/${userName}`);
          setUserInfo(response.data);
          const response2 = await axios.get(`http://localhost:8080/https://ch.tetr.io/api/users/${userName}/records`);
          setRecordInfo(response2.data)
          setIsLoading(false)
      }

      search(userName);
  }, []);

  if (isLoading) {
    return <Loading/>
  }
  if (userInfo.success === false) {
      return <UserNotFound/>
  }

  let rankImage = <img className="rank-img" src={require(`../images/${userInfo.data.user.league.rank}.png`)}/>

  if (userInfo.data.user.league.rank === "z") {
    rankComponent = (
      <div> 
        <p className="rank">Current Rank: {rankImage}</p>
        <p className="rating">Current Rating: Unrated</p>
      </div>
    )
  } else{
    let bestRankImage = <img className="rank-img" src={require(`../images/${userInfo.data.user.league.bestrank}.png`)}/>
    rankComponent = (
      <div>
        <p className="rank">Current Rank: {rankImage}</p>
        <p className="rating">Current Rating: {Math.round(userInfo.data.user.league.rating)}</p>
        <p className="best-rank">Best Rank: {bestRankImage}</p>
      </div>
    )
  }

  if (recordInfo.data.records["40l"].record === null) {
    sprintComponent = <p className="stat-value"> Unplayed </p>
  } else {
    sprintComponent =  <p className="stat-value">{Math.round((recordInfo.data.records["40l"].record.endcontext.finalTime)/10)/100}s</p>
  }

  if (recordInfo.data.records.blitz.record === null) {
    blitzComponent = <p className="stat-value"> Unplayed </p>
  } else {
    blitzComponent = <p className="stat-value">{recordInfo.data.records.blitz.record.endcontext.score}</p>
  }

  if(userInfo.data.user.avatar_revision) {
    avatar = <img src={`https://tetr.io/user-content/avatars/${userInfo.data.user._id}.jpg?rv=${userInfo.data.user.avatar_revision}`} alt={`${userInfo.data.user.username}'s avatar`}/>
  } else {
    avatar = <img src={require('../images/emptyAvatar.png')} alt="no avatar"/>
  }

  if(userInfo.data.user.banner_revision) {
    banner = <img src={`https://tetr.io/user-content/banners/${userInfo.data.user._id}.jpg?rv=${userInfo.data.user.banner_revision}`} />
  } else {
    banner = <img/>
  }

  return (
    <div className="user-wrapper">
      <div className="banner">
        {banner}
      </div>
      <div className="user-profile">
        <div className="user-profile-header">
          <div className="user-avatar">
            {avatar}
          </div>
          <div className="user-info">
            <h2 className="username">{userInfo.data.user.username}</h2>
            {rankComponent}
          </div>
        </div>
        <div className="user-stats">
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-value">{userInfo.data.user.league.pps}</div>
              <div className="stat-label" id="pps">PPS (Pieces/Sec)</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{userInfo.data.user.league.apm}</div>
              <div className="stat-label" id="apm">APM (Attacks/Min)</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{userInfo.data.user.league.vs}</div>
              <div className="stat-label" id="vs">VS Score</div>
            </div>
          </div>
          <div className="stats-row">
            <div className="stat-item">
              {sprintComponent}
              <div className="stat-label">40L Sprint</div>
            </div>
            <div className="stat-item">
              {blitzComponent}
              <div className="stat-label">2 Minute Blitz Score</div>
            </div>
          </div>
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-value">{userInfo.data.user.gamesplayed}</div>
              <div className="stat-label">Games Played</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{userInfo.data.user.gameswon}</div>
              <div className="stat-label">Games Won</div>
            </div>
          </div>
        </div>
      </div>    
    </div>
  );
}

export default User;