import React, { useState, useEffect } from 'react';
import './App.css';
import pfp from './images/pfp1.gif';
import view from './images/viewW.svg';
import tiktok from './images/tiktok.png';
import yt from './images/yt.png';
import discord from './images/discord.png';
import cover from './images/cover.png';
import stop from './song/stopplayin.mp3';
import bg from './videos/car.mp4';
import git from './images/git2.png';

function App() {
  const [viewCount, setViewCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const maxTime = 128;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isOverlayClicked, setIsOverlayClicked] = useState(false);
  const [cssLabel, setCssLabel] = useState('Copy W3eklyMC TikTok Username');
  const [cssLabel1, setCssLabel1] = useState('Copy W3eklyMC IP');
  const [bio, setBio] = useState('');
  const [entered, setEntered] = useState(false);

  // Typewriter effect
  const bioText = "Owner of W3eklyMC";
  const [index, setIndex] = useState(0);
  const [typingForward, setTypingForward] = useState(true);

  // Typing animation
  useEffect(() => {
    const timer = setInterval(() => {
      if (typingForward) {
        if (index < bioText.length) {
          setBio(bioText.slice(0, index + 1));
          setIndex(index + 1);
        } else {
          setTypingForward(false);
        }
      } else {
        if (index > 0) {
          setBio(bioText.slice(0, index - 1));
          setIndex(index - 1);
        } else {
          setTypingForward(true);
        }
      }
    }, 80);

    return () => clearInterval(timer);
  }, [index, typingForward]);

  // Fetch view count
  useEffect(() => {
    fetch('/increment-view')
      .then(res => res.json())
      .then(data => setViewCount(data.viewCount))
      .catch(e => console.error("View fetch error:", e));
  }, []);

  // Audio progress tracking
  useEffect(() => {
    const audio = document.getElementById("audio");
    if (!audio) return;

    const interval = setInterval(() => {
      setCurrentTime(audio.currentTime);
      if (audio.currentTime >= maxTime) {
        audio.currentTime = 0;
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text, setLabel, defaultLabel) => {
    navigator.clipboard.writeText(text).then(() => {
      setLabel("Copied!");
      setTimeout(() => setLabel(defaultLabel), 1500);
    });
  };

  const handleOverlayClick = () => {
    setShowOverlay(false);
    setIsOverlayClicked(true);
    setEntered(true);

    // Play audio directly inside the click handler (allowed by browser autoplay)
    const audio = document.getElementById('audio');
    audio.volume = 1;
    audio.play();
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    const audio = document.getElementById("audio");
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='app-container'>
      
      <video autoPlay loop muted className='video-background'>
        <source src={bg} type='video/mp4' />
      </video>

      {showOverlay && (
        <div className='overlay' onClick={handleOverlayClick}>
          <p className='click'>Click anywhere to enter :)</p>
        </div>
      )}

      <div className={`main-container ${entered ? 'entered' : ''}`}>
        
        <img src={view} className='view' alt="Views" />
        <p className='num'>{viewCount}</p>

        <img src={pfp} className='pfp' alt="Profile" />

        <div className='info'>
          <h1 className='name'>W3ekly_Play_TT</h1>
          <h1 className='bio'>{bio}</h1>
        </div>

        {/* Links */}
        <div className='links'>
          <a href="https://discord.gg/pAS4XgFKaK" target="_blank" rel="noopener noreferrer">
            <img src={discord} className='link1' alt="Discord" />
          </a>

          <a href="https://github.com/weeklydrawing" target="_blank" rel="noopener noreferrer">
            <img src={git} className='link2' alt="GitHub" />
          </a>

          <a href="https://tiktok.com/@w3ekly_play_tt" target="_blank" rel="noopener noreferrer">
            <img src={tiktok} className='link3' alt="TikTok" />
          </a>

          <a href="https://www.youtube.com/@W3ekly_play_TT" target="_blank" rel="noopener noreferrer">
            <img src={yt} className='link4' alt="YouTube" />
          </a>

          <a href="https://discord.com/users/1090711200305791046" target="_blank" rel="noopener noreferrer">
            <img src={discord} className='link5' alt="Discord Profile" />
          </a>
        </div>

        {/* Song UI */}
        <div className='song'>
          <div className='progress-bar-container'>
            <div className='progress-bar'
              style={{ width: `${(currentTime / maxTime) * 100}%` }}
            />
          </div>

          <a href='https://soundcloud.com/trapdailysounds/glokk40spaz-sg-lul-ki-stop-playin-prod-by-khroam'
            target='_blank' rel='noopener noreferrer'>
            <img src={cover} className='songcover' alt="Song" />
          </a>

          <div className='songinfo'>
            <p className='songtitle'>Carol Of Bells</p>
            <p className='artist'>by Mykola Leontovych</p>
            <p className='album'>on YouTube</p>
          </div>

          <div className='time-label'>
            {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, "0")}
            /
            {Math.floor(maxTime / 60)}:{String(maxTime % 60).padStart(2, "0")}
          </div>

          <audio id='audio' src={stop} />
        </div>

        {/* Copy Buttons */}
        <button
          className='button2'
          onClick={() => handleCopy('w3eklymc.net', setCssLabel1, 'Copy W3eklyMC IP')}
          data-label={cssLabel1}
        >
          Server IP
        </button>

        <button
          className='button1'
          onClick={() => handleCopy('@w3eklymc', setCssLabel, 'Copy W3eklyMC TikTok Username')}
          data-label={cssLabel}
        >
          TikTok
        </button>

      </div>
    </div>
  );
}

export default App;
