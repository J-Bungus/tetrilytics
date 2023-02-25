import React from 'react';

function AboutPage() {
  return (
    <div className="about-container">
      <h1>About</h1>
      <p className="about-description">
        Hi, I'm Justin Wang and I like to play tetris. Throughout the years, I've always wanted a 
        website that can display various stats about the Tetrio player base. A place where I can 
        clearly see how I compare to people for each rank. I couldn't really find anything that 
        I wanted, which is why I endeavoured to make this website. Although this data is only for 
        players that are ranked, it is still a valid source of information regarding stats such 
        as PPS, APM, and user info. I will continue to make updates and changes to this website as 
        the Tetrio API changes. I hope you find this website useful, and thanks for stopping by!
      </p>

      <h3>Some Information About the Site</h3>
      <p className="about-description">
        This website uses the Tetrio API to fetch the data. It uses the CORS-Anywhere API as a proxy to bypass the CORS restrictions.
        Also, some players choose to not disclose some of their in-game statistics, and thus results in a -1 instead of an actual value.
      </p>
    </div>
  );
}

export default AboutPage;
