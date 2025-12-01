import React, { useState, useEffect } from 'react';
import './App.css';
import pfp from './images/pfp1.gif';
import view from './images/viewW.svg';
import twitter from './images/x.png';
import insta from './images/insta.png';
import yt from './images/yt.png';
import discord from './images/discord.png';
import cover from './images/cover.png';
import stop from './song/stopplayin.mp3';
import bg from './videos/car.mp4';
import git from './images/git2.png';
import tiktok from './image/tiktok.pnh';

function App() {
  const [viewCount, setViewCount] = useState(5);
  const [currentTime, setCurrentTime] = useState(0);
  const maxTime = 128;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isOverlayClicked, setIsOverlayClicked] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [cssLabel, setCssLabel] = useState('Copy W3eklyMC Ip');
  const [cssLabel1, setCssLabel1] = useState('Copy W3eklyMC Tiktok Username');
  const [bio, setBio] = useState('');
  const [entered, setEntered] = useState(false); // State for animation

  // Typewriter effect
  const [bioText, setBioText] = useState("Owner of W3eklyMC");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isTyping) {
        if (index < bioText.length) {
          setBio(prevBio => prevBio + bioText.charAt(index));
          setIndex(prevIndex => prevIndex + 1);
        } else {
          setIsTyping(false);
        }
      } else {
        if (index >= 0) {
          setBio(prevBio => prevBio.slice(0, index));
          setIndex(prevIndex => prevIndex - 1);
        } else {
          setIsTyping(true);
        }
      }
    }, 50);

    return () => clearInterval(timer); // Cleanup the timer
  }, [bioText, index, isTyping]);

  useEffect(() => {
    fetch('/increment-view')
      .then(response => response.json())
      .then(data => setViewCount(data.viewCount))
      .catch(error => console.error('Error:', error));

    // Other side effects...

  }, []);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    return formattedTime;
  }

  useEffect(() => {
    const audioElement = document.getElementById('audio');

    if (!isPlaying && isOverlayClicked) {
      audioPlay();
      setIsPlaying(true);
    }

    const interval = setInterval(() => {
      const elapsedTime = Math.round(audioElement.currentTime);
      setCurrentTime(elapsedTime);

      if (elapsedTime >= maxTime) {
        audioElement.currentTime = 0;
        setCurrentTime(0);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, isOverlayClicked, maxTime]);

  const handleCopyAddress = (address, label) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        setCopyStatus('Copied');
        setCssLabel('Copied');
        setTimeout(() => {
          setCopyStatus('');
          setCssLabel('Copy BTC Address');
        }, 2000);
      })
      .catch(error => console.error('Error copying address to clipboard:', error));
  };
  
  const handleCopyAddress1 = (address, label) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        setCopyStatus('Copied');
        setCssLabel1('Copied');
        setTimeout(() => {
          setCopyStatus('');
          setCssLabel1('Copy LTC Address');
        }, 2000);
      })
      .catch(error => console.error('Error copying address to clipboard:', error));
  };
  
  function audioPlay() {
    var audio = document.getElementById('audio');
    audio.volume = 1;
    audio.play();
  }

  const handlePlayPause = () => {
    const audioElement = document.getElementById('audio');
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleOverlayClick = () => {
    setShowOverlay(false);
    setIsOverlayClicked(true);
    audioPlay();
    setEntered(true); // Trigger the animation
  };

  return (
    <div className='app-container'>
      <video autoPlay loop muted className='video-background'>
        <source src={bg} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      {showOverlay && (
        <div className='overlay' onClick={handleOverlayClick}>
          <p1 className='click'>Click Anywhere to see my bio :)</p1>
        </div>
      )}
      <div className={`main-container ${entered ? 'entered' : ''}`}>
        <img src={view} className='view' alt="View Icon" />
        <p1 className='num'>{viewCount}</p1>
        <img src={pfp} className='pfp' alt="Profile Picture" />
        <div className='info' >
          <h1 className='name'>W3ekly_Play_TT</h1>
          <h1 className='bio'>{bio}</h1> {/* Bio with typewriter effect */}
        </div>
        <div className='links'>
          <a href="https://discord.gg/pAS4XgFKaK" target="_blank" rel="noopener noreferrer">
            <img src={discord} className='link1' alt="Twitter" />
          </a>
          <a href="https://github.com/weeklydrawing" target="_blank" rel="noopener noreferrer">
            <img src={git} className='link2' alt="GitHub" />
          </a>
          <a href="https://tiktok.com/@w3ekly_play_tt" target="_blank" rel="noopener noreferrer">
            <img src={tiktok} className='link3' alt="Tiktok" />
          </a>
          <a href="https://www.youtube.com/@W3ekly_play_TT" target="_blank" rel="noopener noreferrer">
            <img src={yt} className='link4' alt="YouTube" />
          </a>
          <a href="1090711200305791046" target="_blank" rel="noopener noreferrer">
            <img src={discord} className='link5' alt="Discord" />
          </a>
        </div>
        <div className='div1'></div>
        <div className='song'>
          <div className='progress-bar-container'>
            <div className='progress-bar' style={{ width: `${(currentTime / maxTime) * 100}%` }} />
          </div>
          <a href='https://soundcloud.com/trapdailysounds/glokk40spaz-sg-lul-ki-stop-playin-prod-by-khroam' target='_blank' rel='noopener noreferrer'>
            <img src={cover} className='songcover' alt='' />
          </a>
          <div className='songinfo'>
            <p1 className='songtitle'>Carol Of Bells</p1>
            <p1 className='artist'>by Mykola Leontovych</p1>
            <p1 className='album' href>on Youtube</p1>
          </div>
          <div className='time-label'>
            {formatTime(currentTime)} / {formatTime(maxTime)}
          </div>
          <audio id='audio' src={stop} />
        </div>
        <div className='div2'></div>
        <button
          className='button2'
          onClick={() => handleCopyAddress1('w3eklymc.net', 'Copy W3eklyMC Ip')}
          data-label={cssLabel1}
        >
          LTC
        </button>
        <button
          className='button1'
          onClick={() => handleCopyAddress('@w3eklymc', 'Copy W3eklyMC Tiktok Username')}
          data-label={cssLabel}
        >
          BTC
        </button>
      </div>
    </div>
  );
}

export default App;
