{showOverlay && (
  <div className='overlay' onClick={handleOverlayClick}>
    <p className='click'>Click Anywhere to see my bio :)</p>
  </div>
)}

<div className={`main-container ${entered ? 'entered' : ''}`}>
  <img src={view} className='view' alt="View Icon" />
  <p className='num'>{viewCount}</p>

  <img src={pfp} className='pfp' alt="Profile Picture" />

  <div className='info'>
    <h1 className='name'>W3ekly_Play_TT</h1>
    <h1 className='bio'>{bio}</h1>
  </div>

  <div className='links'>
    <a href="https://discord.gg/pAS4XgFKaK" target="_blank">
      <img src={discord} className='link1' alt="Discord" />
    </a>

    <a href="https://github.com/weeklydrawing" target="_blank">
      <img src={git} className='link2' alt="GitHub" />
    </a>

    <a href="https://tiktok.com/@w3ekly_play_tt" target="_blank">
      <img src={tiktok} className='link3' alt="TikTok" />
    </a>

    <a href="https://www.youtube.com/@W3ekly_play_TT" target="_blank">
      <img src={yt} className='link4' alt="YouTube" />
    </a>

    <a href="https://discord.com/users/1090711200305791046" target="_blank">
      <img src={discord} className='link5' alt="Discord Profile" />
    </a>
  </div>

  <div className='song'>
    <div className='progress-bar-container'>
      <div className='progress-bar' style={{ width: `${(currentTime / maxTime) * 100}%` }} />
    </div>

    <a href="https://soundcloud.com/trapdailysounds/glokk40spaz-sg-lul-ki-stop-playin-prod-by-khroam" target="_blank">
      <img src={cover} className='songcover' alt="" />
    </a>

    <div className='songinfo'>
      <p className='songtitle'>Carol Of Bells</p>
      <p className='artist'>by Mykola Leontovych</p>
      <p className='album'>on Youtube</p>
    </div>

    <div className='time-label'>
      {formatTime(currentTime)} / {formatTime(maxTime)}
    </div>

    <audio id='audio' src={stop} />
  </div>

  {/* Corrected Buttons */}
  <button
    className='button2'
    onClick={() => handleCopyAddress1('w3eklymc.net')}
    data-label={cssLabel1}
  >
    W3eklyMC IP
  </button>

  <button
    className='button1'
    onClick={() => handleCopyAddress('@w3eklymc')}
    data-label={cssLabel}
  >
    TikTok Username
  </button>
</div>
