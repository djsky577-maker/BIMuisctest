let currentShortsTab = 'foryou';
let shortsObserver = null;
let globalAudio = new Audio();
let currentAudioCard = null;

function switchShortsTab(tab) {
    if (currentShortsTab === tab) return;
    currentShortsTab = tab;
    
    const tabForyou = document.getElementById('tab-foryou');
    const tabAudios = document.getElementById('tab-audios');
    
    if (globalAudio) {
        globalAudio.pause();
        globalAudio.src = '';
    }
    
    if (tab === 'foryou') {
        tabForyou.style.color = '#fff';
        tabForyou.style.fontWeight = '900';
        tabAudios.style.color = 'rgba(255,255,255,0.6)';
        tabAudios.style.fontWeight = '700';
        loadShortsFeed('foryou');
    } else {
        tabForyou.style.color = 'rgba(255,255,255,0.6)';
        tabForyou.style.fontWeight = '700';
        tabAudios.style.color = '#fff';
        tabAudios.style.fontWeight = '900';
        loadShortsFeed('audios');
    }
}

async function loadShortsFeed(tab) {
  const feed = document.querySelector('.shorts-feed');
  if (!feed) return;
  
  if (shortsObserver) shortsObserver.disconnect();
  feed.innerHTML = '<div style="color:#00e0d0;text-align:center;padding:50px;font-size:16px;">Loading...</div>';
  
  try {
    let queries = tab === 'foryou' 
        ? ['afrobeats #shorts', 'hip hop #shorts', 'rnb #shorts', 'amapiano #shorts']
        : ['trending music audio', 'afrobeats lyrics', 'hip hop audio', 'rnb lyrics', 'amapiano audio'];
    
    const q = queries[Math.floor(Math.random() * queries.length)];
    if (!window.pget) return;
    const res = await window.pget('/search?q=' + encodeURIComponent(q) + '&filter=videos');
    
    if (!res || !res.items || res.items.length === 0) {
      feed.innerHTML = '<div style="color:#fff;text-align:center;padding:50px;">No music found.</div>';
      return;
    }

    feed.innerHTML = '';
    
    let validVideos = res.items.filter(v => v.url && v.title);
    if (tab === 'audios') {
        validVideos = validVideos.filter(v => {
            const up = (v.uploaderName || '').toLowerCase();
            const ti = (v.title || '').toLowerCase();
            return !up.includes('vevo') && !up.includes('official') && !ti.includes('official video');
        });
    }
    
    validVideos = validVideos.sort(() => 0.5 - Math.random()).slice(0, 10);
    
    validVideos.forEach((v) => {
      const vid = v.url.replace('/watch?v=', '').split('&')[0];
      const title = v.title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const artist = (v.uploaderName || 'Unknown').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const thumb = (window.ytThumb) ? window.ytThumb(vid, 'hqdefault') : 'https://i.ytimg.com/vi/' + vid + '/hqdefault.jpg';
      
      const card = document.createElement('div');
      card.className = 'short-card';
      card.dataset.vid = vid;
      
      if (tab === 'foryou') {
          card.innerHTML = `
            <div class="short-video-wrap"><img src="${thumb}" class="short-poster" style="width:100%; height:100%; object-fit:cover; z-index:1; position:absolute;"></div>
            <div class="short-overlay" style="pointer-events: none; z-index:3; position:absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 20%, transparent 70%, rgba(0,0,0,0.8) 100%);"></div>
            
            <div class="short-top" style="z-index:10; display:flex; justify-content:space-between; align-items:center; padding: 40px 20px 20px 20px; position:absolute; top:0; width:100%;">
              <div style="display:flex; align-items:center; gap: 15px;">
                <svg viewBox="0 0 24 24" onclick="switchTab('home', this)" style="width:28px; height:28px; fill:#fff; cursor:pointer;"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                <span id="tab-foryou" onclick="switchShortsTab('foryou')" style="color:#fff; font-weight:900; font-size:18px; text-shadow: 0 2px 4px rgba(0,0,0,0.8); cursor:pointer;">For You</span>
              </div>
              <div style="display:flex; align-items:center; gap: 15px;">
                <span id="tab-audios" onclick="switchShortsTab('audios')" style="color:rgba(255,255,255,0.6); font-weight:700; font-size:16px; text-shadow: 0 2px 4px rgba(0,0,0,0.8); cursor:pointer;">Audios</span>
              </div>
            </div>
    
            <div class="short-left" style="z-index:10;">
              <div class="short-user-row">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(artist)}&background=fff&color=000" class="short-avatar">
                <div class="short-user-text"><div class="short-username">${artist}</div><div class="short-followers">Artist</div></div>
              </div>
              <div class="short-tags"><span>#music</span><span>#trending</span></div>
            </div>
            <div class="short-bottom" style="z-index:10;">
              <div class="short-audio-info">
                <img src="${thumb}" class="short-audio-art">
                <div class="short-audio-text"><div class="short-audio-title">${title}</div><div class="short-audio-artist">${artist}</div></div>
              </div>
            </div>
          `;
      } else {
          // SPOTIFY STYLE UI
          card.innerHTML = `
            <div style="position:absolute; top:0; left:0; width:100%; height:100%; background: url('${thumb}') center/cover; filter: blur(40px) brightness(0.3); transform: scale(1.2); z-index:1;"></div>
            <div style="position:absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.9)); z-index:2;"></div>
            
            <div class="short-top" style="z-index:10; display:flex; justify-content:space-between; align-items:center; padding: 40px 20px 20px 20px; position:absolute; top:0; width:100%;">
              <div style="display:flex; align-items:center; gap: 15px;">
                <svg viewBox="0 0 24 24" onclick="switchTab('home', this)" style="width:28px; height:28px; fill:#fff; cursor:pointer;"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                <span id="tab-foryou" onclick="switchShortsTab('foryou')" style="color:rgba(255,255,255,0.6); font-weight:700; font-size:18px; text-shadow: 0 2px 4px rgba(0,0,0,0.8); cursor:pointer;">For You</span>
              </div>
              <div style="display:flex; align-items:center; gap: 15px;">
                <span id="tab-audios" onclick="switchShortsTab('audios')" style="color:#fff; font-weight:900; font-size:16px; text-shadow: 0 2px 4px rgba(0,0,0,0.8); cursor:pointer;">Audios</span>
              </div>
            </div>

            <div style="position:absolute; top:0; left:0; width:100%; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:5; padding: 20px;">
                <img src="${thumb}" style="width:85vw; max-width:380px; aspect-ratio:1; border-radius:16px; object-fit:cover; box-shadow: 0 20px 50px rgba(0,0,0,0.8); margin-bottom: 40px;">
                
                <div style="width:100%; max-width:380px; text-align:left; padding: 0 10px;">
                    <h2 style="color:#fff; font-size:26px; font-weight:900; margin:0 0 8px 0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${title}</h2>
                    <p style="color:rgba(255,255,255,0.7); font-size:18px; margin:0 0 30px 0;">${artist}</p>
                    
                    <div style="width:100%; height:4px; background:rgba(255,255,255,0.2); border-radius:2px; margin-bottom:10px;">
                        <div class="audio-progress" style="width:0%; height:100%; background:#00e0d0; border-radius:2px; transition:width 0.1s linear;"></div>
                    </div>
                    
                    <!-- AUDIO STATUS TEXT -->
                    <div class="audio-status" style="color:rgba(255,255,255,0.5); font-size:12px; text-align:center; margin-bottom:10px;">Tap play to load audio</div>

                    <div style="display:flex; justify-content:center; align-items:center; margin-top:20px;">
                        <div class="audio-play-btn" style="width:70px; height:70px; background:#00e0d0; border-radius:50%; display:flex; justify-content:center; align-items:center; cursor:pointer; box-shadow: 0 4px 20px rgba(0,224,208,0.4);">
                            <svg class="icon-play" viewBox="0 0 24 24" style="width:35px; height:35px; fill:#000; margin-left:5px; display:block;"><path d="M8 5v14l11-7z"/></svg>
                            <svg class="icon-pause" viewBox="0 0 24 24" style="width:35px; height:35px; fill:#000; display:none;"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                        </div>
                    </div>
                </div>
            </div>
          `;
      }
      feed.appendChild(card);
    });
    
    setupShortObserver(tab);
    
  } catch (err) {
    feed.innerHTML = '<div style="color:#ff5555;text-align:center;padding:50px;">Error: ' + err.message + '</div>';
  }
}

function setupShortObserver(tab) {
    const cards = document.querySelectorAll('.short-card');
    
    shortsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const card = entry.target;
            const vid = card.dataset.vid;
            
            if (tab === 'foryou') {
                const wrap = card.querySelector('.short-video-wrap');
                let existingIframe = wrap.querySelector('iframe');
                if (entry.isIntersecting) {
                    if (existingIframe) {
                        existingIframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'playVideo', args: []}), '*');
                        return;
                    }
                    const ytUrl = `https://www.youtube.com/embed/${vid}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&enablejsapi=1`;
                    const iframe = document.createElement('iframe');
                    iframe.src = ytUrl;
                    iframe.style.cssText = 'width:100%; height:100%; border:none; position:absolute; top:0; left:0; z-index:2; pointer-events:auto;';
                    wrap.appendChild(iframe);
                } else {
                    if (existingIframe) existingIframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'pauseVideo', args: []}), '*');
                }
            } else {
                // AUDIOS TAB
                const playBtn = card.querySelector('.audio-play-btn');
                const iconPlay = card.querySelector('.icon-play');
                const iconPause = card.querySelector('.icon-pause');
                const progressBar = card.querySelector('.audio-progress');
                const statusText = card.querySelector('.audio-status');
                
                if (entry.isIntersecting) {
                    currentAudioCard = card;
                    if (globalAudio.dataset.vid !== vid) {
                        globalAudio.pause();
                        if(iconPlay) { iconPlay.style.display = 'block'; iconPause.style.display = 'none'; }
                        progressBar.style.width = '0%';
                        statusText.textContent = 'Tap play to load audio';
                    }
                    
                    playBtn.onclick = async (e) => {
                        e.stopPropagation();
                        
                        // If audio already loaded for this card
                        if (globalAudio.dataset.vid === vid && globalAudio.src) {
                            if (globalAudio.paused) {
                                await globalAudio.play();
                                iconPlay.style.display = 'none'; iconPause.style.display = 'block';
                                statusText.textContent = 'Playing...';
                            } else {
                                globalAudio.pause();
                                iconPlay.style.display = 'block'; iconPause.style.display = 'none';
                                statusText.textContent = 'Paused';
                            }
                            return;
                        }
                        
                        // Fetch Audio
                        iconPlay.style.display = 'none'; 
                        iconPause.style.display = 'block';
                        statusText.textContent = 'Fetching audio...';
                        
                        let streamUrl = '';
                        
                        // 1. Fetch Piped Stream (Use proxyUrl to bypass CORS)
                        try {
                            const res = await window.pget('/streams/' + vid);
                            if (res && res.audioStreams && res.audioStreams.length > 0) {
                                let best = res.audioStreams.sort((a,b) => b.bitrate - a.bitrate)[0];
                                streamUrl = best.proxyUrl ? best.proxyUrl : best.url;
                            }
                        } catch(err) {}

                        // 2. Invidious Fallback (Use local proxy route)
                        if (!streamUrl) {
                            statusText.textContent = 'Trying backup server...';
                            const invInstances = ['https://inv.nadeko.net', 'https://invidious.nerdvpn.de', 'https://iv.melmac.space'];
                            for (let inst of invInstances) {
                                try {
                                    const r = await fetch(inst + '/api/v1/videos/' + vid);
                                    if (r.ok) {
                                        const data = await r.json();
                                        if (data && data.adaptiveFormats) {
                                            const audio = data.adaptiveFormats.find(f => f.type && f.type.includes('audio'));
                                            if (audio && audio.url) { streamUrl = audio.url; break; }
                                        }
                                    }
                                } catch(err) {}
                            }
                        }
                        
                        if (streamUrl) {
                            globalAudio.src = streamUrl;
                            globalAudio.dataset.vid = vid;
                            try {
                                await globalAudio.play();
                                iconPlay.style.display = 'none'; iconPause.style.display = 'block';
                                statusText.textContent = 'Playing...';
                            } catch(err) {
                                iconPlay.style.display = 'block'; iconPause.style.display = 'none';
                                statusText.textContent = 'Error: Browser blocked audio. Tap again.';
                            }
                        } else {
                            iconPlay.style.display = 'block'; iconPause.style.display = 'none';
                            statusText.textContent = 'Error: All servers failed to provide audio.';
                        }
                    };
                    
                } else {
                    if (globalAudio.dataset.vid === vid) {
                        globalAudio.pause();
                        if(iconPlay) { iconPlay.style.display = 'block'; iconPause.style.display = 'none'; }
                    }
                }
            }
        });
    }, { threshold: 0.6 });
    
    cards.forEach(card => shortsObserver.observe(card));
}

// REAL Progress Bar tied to audio
globalAudio.addEventListener('timeupdate', () => {
    if (currentAudioCard && globalAudio.duration) {
        const progressBar = currentAudioCard.querySelector('.audio-progress');
        if (progressBar) {
            const percent = (globalAudio.currentTime / globalAudio.duration) * 100;
            progressBar.style.width = percent + '%';
        }
    }
});

// Handle loading state
globalAudio.addEventListener('waiting', () => {
    if (currentAudioCard) {
        const statusText = currentAudioCard.querySelector('.audio-status');
        if(statusText) statusText.textContent = 'Buffering...';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.switchTab) {
            const originalSwitch = window.switchTab;
            window.switchTab = function(tab, el) {
                originalSwitch(tab, el);
                if (tab === 'shorts') {
                    currentShortsTab = 'foryou';
                    loadShortsFeed('foryou');
                }
            };
        }
    }, 1000);
});
