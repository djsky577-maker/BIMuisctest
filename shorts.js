let currentShortsTab = 'foryou';
let shortsObserver = null;

function switchShortsTab(tab) {
    if (currentShortsTab === tab) return;
    currentShortsTab = tab;
    
    const tabForyou = document.getElementById('tab-foryou');
    const tabAudios = document.getElementById('tab-audios');
    
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
    let queries = [];
    if (tab === 'foryou') {
        queries = ['afrobeats #shorts', 'hip hop #shorts', 'rnb #shorts', 'amapiano #shorts'];
    } else {
        queries = ['trending music audio', 'afrobeats lyrics', 'hip hop audio', 'rnb lyrics', 'amapiano audio'];
    }
    
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
            const uploader = (v.uploaderName || '').toLowerCase();
            const title = (v.title || '').toLowerCase();
            if (uploader.includes('vevo') || uploader.includes('official') || uploader.includes('records')) return false;
            if (title.includes('official video') || title.includes('music video')) return false;
            return true;
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
      
      let mediaHtml = '';
      if (tab === 'foryou') {
          mediaHtml = `<div class="short-video-wrap"><img src="${thumb}" class="short-poster" style="width:100%; height:100%; object-fit:cover; z-index:1; position:absolute;"></div>`;
      } else {
          mediaHtml = `
            <div class="short-video-wrap" style="background: url('${thumb}') center/cover; filter: blur(20px) brightness(0.4); transform: scale(1.1);"></div>
            <div class="short-video-wrap" style="display:flex; justify-content:center; align-items:center; z-index:2;">
                <img src="${thumb}" style="width:200px; height:200px; border-radius:50%; object-fit:cover; border:4px solid rgba(255,255,255,0.2); box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
            </div>
          `;
      }
      
      card.innerHTML = `
        ${mediaHtml}
        <div class="short-overlay" style="pointer-events: none; z-index:3; position:absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 20%, transparent 70%, rgba(0,0,0,0.8) 100%);"></div>
        
        <!-- PLAY BUTTON FOR AUDIO TAB -->
        <div class="audio-play-btn" style="display:none; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:70px; height:70px; background:rgba(0,224,208,0.9); border-radius:50%; z-index:30; justify-content:center; align-items:center; cursor:pointer; box-shadow: 0 4px 20px rgba(0,224,208,0.6);">
          <svg viewBox="0 0 24 24" style="width:40px; height:40px; fill:#000; margin-left:6px;"><path d="M8 5v14l11-7z"/></svg>
        </div>

        <div class="short-top" style="z-index:10; display:flex; justify-content:space-between; align-items:center; padding: 40px 20px 20px 20px; position:absolute; top:0; width:100%;">
          <div style="display:flex; align-items:center; gap: 15px;">
            <svg viewBox="0 0 24 24" onclick="switchTab('home', this)" style="width:28px; height:28px; fill:#fff; cursor:pointer;"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
            <span id="tab-foryou" onclick="switchShortsTab('foryou')" style="color:${tab==='foryou'?'#fff':'rgba(255,255,255,0.6)'}; font-weight:${tab==='foryou'?'900':'700'}; font-size:18px; text-shadow: 0 2px 4px rgba(0,0,0,0.8); cursor:pointer;">For You</span>
          </div>
          <div style="display:flex; align-items:center; gap: 15px;">
            <span id="tab-audios" onclick="switchShortsTab('audios')" style="color:${tab==='audios'?'#fff':'rgba(255,255,255,0.6)'}; font-weight:${tab==='audios'?'900':'700'}; font-size:16px; text-shadow: 0 2px 4px rgba(0,0,0,0.8); cursor:pointer;">Audios</span>
          </div>
        </div>

        <div class="short-left" style="z-index:10;">
          <div class="short-user-row">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(artist)}&background=fff&color=000" class="short-avatar">
            <div class="short-user-text">
              <div class="short-username">${artist}</div>
              <div class="short-followers">Artist</div>
            </div>
          </div>
          <div class="short-tags"><span>#music</span><span>#audio</span></div>
        </div>

        <div class="short-bottom" style="z-index:10;">
          <div class="short-audio-info">
            <img src="${thumb}" class="short-audio-art">
            <div class="short-audio-text">
              <div class="short-audio-title">${title}</div>
              <div class="short-audio-artist">${artist}</div>
            </div>
          </div>
        </div>
      `;
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
            const wrap = card.querySelector('.short-video-wrap');
            const vid = card.dataset.vid;
            const playBtn = card.querySelector('.audio-play-btn');
            
            if (tab === 'foryou') {
                let existingIframe = wrap.querySelector('iframe');
                if (entry.isIntersecting) {
                    if (existingIframe) {
                        existingIframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'playVideo', args: []}), '*');
                        return;
                    }
                    const ytUrl = `https://www.youtube.com/embed/${vid}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&enablejsapi=1`;
                    const iframe = document.createElement('iframe');
                    iframe.src = ytUrl;
                    iframe.style.width = '100%';
                    iframe.style.height = '100%';
                    iframe.style.border = 'none';
                    iframe.style.position = 'absolute';
                    iframe.style.top = '0'; iframe.style.left = '0';
                    iframe.style.zIndex = '2';
                    iframe.style.pointerEvents = 'auto'; 
                    wrap.appendChild(iframe);
                } else {
                    if (existingIframe) {
                        existingIframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'pauseVideo', args: []}), '*');
                    }
                }
            } else {
                // AUDIO TAB LOGIC (100% AD-FREE)
                let existingAudio = card.querySelector('audio');
                
                if (entry.isIntersecting) {
                    if (existingAudio) {
                        existingAudio.play().then(() => {
                            if(playBtn) playBtn.style.display = 'none';
                        }).catch(e => {
                            if(playBtn) playBtn.style.display = 'flex'; // Show play button if autoplay blocked
                        });
                        return;
                    }
                    
                    // Show spinner
                    const loader = document.createElement('div');
                    loader.className = 'audio-loader';
                    loader.innerHTML = '<div style="color:#00e0d0; font-weight:bold; z-index:5; position:absolute; top:60%; left:50%; transform:translate(-50%,-50%);">Fetching Audio...</div>';
                    card.appendChild(loader);
                    
                    async function getAudioUrl() {
                        try {
                            const res = await window.pget('/streams/' + vid);
                            if (res && res.audioStreams && res.audioStreams.length > 0) {
                                let best = res.audioStreams.sort((a,b) => b.bitrate - a.bitrate)[0];
                                return best.url;
                            }
                        } catch(e) {}

                        const invInstances = ['https://inv.nadeko.net', 'https://invidious.nerdvpn.de', 'https://iv.melmac.space'];
                        for (let inst of invInstances) {
                            try {
                                const r = await fetch(inst + '/api/v1/videos/' + vid);
                                if (r.ok) {
                                    const data = await r.json();
                                    if (data && data.adaptiveFormats) {
                                        const audio = data.adaptiveFormats.find(f => f.type && f.type.includes('audio'));
                                        if (audio && audio.url) return audio.url;
                                    }
                                }
                            } catch(e) {}
                        }
                        return null;
                    }

                    getAudioUrl().then(streamUrl => {
                        loader.remove();
                        if (streamUrl) {
                            const audio = document.createElement('audio');
                            audio.src = streamUrl;
                            audio.loop = true;
                            card.appendChild(audio);
                            
                            audio.play().then(() => {
                                if(playBtn) playBtn.style.display = 'none';
                            }).catch(e => {
                                // Autoplay blocked -> Show button
                                if(playBtn) {
                                    playBtn.style.display = 'flex';
                                    playBtn.onclick = () => {
                                        audio.play();
                                        playBtn.style.display = 'none';
                                    };
                                }
                            });
                            
                            // Handle link expiry/errors
                            audio.onerror = () => {
                                loader.innerHTML = '<div style="color:#ff5555; font-weight:bold; z-index:5; position:absolute; top:60%; left:50%; transform:translate(-50%,-50%);">Audio blocked by YouTube</div>';
                            };
                        } else {
                            loader.innerHTML = '<div style="color:#ff5555; font-weight:bold; z-index:5; position:absolute; top:60%; left:50%; transform:translate(-50%,-50%);">Audio not available</div>';
                        }
                    });
                } else {
                    if (existingAudio) existingAudio.pause();
                    if (playBtn) playBtn.style.display = 'none';
                }
            }
        });
    }, { threshold: 0.6 });
    
    cards.forEach(card => shortsObserver.observe(card));
}

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
