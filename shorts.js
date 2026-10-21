async function loadShortsFeed() {
  const feed = document.querySelector('.shorts-feed');
  if (!feed) return;
  
  feed.innerHTML = '<div style="color:#00e0d0;text-align:center;padding:50px;font-size:16px;">Loading music...</div>';
  
  try {
    const queries = ['afrobeats #shorts', 'hip hop #shorts', 'rnb #shorts', 'amapiano #shorts', 'music lyrics #shorts', 'trending music #shorts'];
    const q = queries[Math.floor(Math.random() * queries.length)];
    
    if (!window.pget) return;
    const res = await window.pget('/search?q=' + encodeURIComponent(q) + '&filter=videos');
    
    if (!res || !res.items || res.items.length === 0) {
      feed.innerHTML = '<div style="color:#fff;text-align:center;padding:50px;">No music found.</div>';
      return;
    }

    feed.innerHTML = '';
    
    const validVideos = res.items
      .filter(v => {
        if (!v.url || !v.title) return false;
        const uploader = (v.uploaderName || '').toLowerCase();
        const title = (v.title || '').toLowerCase();
        
        // Block big labels and heavy ad channels
        if (uploader.includes('vevo') || uploader.includes('official') || uploader.includes('records')) return false;
        // Block official music videos
        if (title.includes('official video') || title.includes('music video') || title.includes('clip officiel')) return false;
        
        return true;
      })
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    
    validVideos.forEach((v) => {
      const vid = v.url.replace('/watch?v=', '').split('&')[0];
      const title = v.title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const artist = (v.uploaderName || 'Unknown').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const thumb = (window.ytThumb) ? window.ytThumb(vid, 'hqdefault') : 'https://i.ytimg.com/vi/' + vid + '/hqdefault.jpg';
      
      const card = document.createElement('div');
      card.className = 'short-card';
      card.dataset.vid = vid;
      card.dataset.playing = 'false';
      
      card.innerHTML = `
        <div class="short-video-wrap">
          <img src="${thumb}" class="short-poster" style="width:100%; height:100%; object-fit:cover; z-index:1; position:absolute;">
        </div>
        <div class="short-overlay" style="pointer-events: none; z-index:2; position:absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 15%, transparent 60%, rgba(0,0,0,0.8) 100%);"></div>
        
        <!-- Center Play/Pause Button -->
        <div class="short-play-btn" style="display:none; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:70px; height:70px; background:rgba(0,224,208,0.9); border-radius:50%; z-index:30; justify-content:center; align-items:center; cursor:pointer; box-shadow: 0 4px 20px rgba(0,224,208,0.6); transition: opacity 0.3s ease;">
          <svg class="icon-play" viewBox="0 0 24 24" style="width:40px; height:40px; fill:#000; margin-left:6px; display:block;"><path d="M8 5v14l11-7z"/></svg>
          <svg class="icon-pause" viewBox="0 0 24 24" style="width:40px; height:40px; fill:#000; display:none;"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        </div>
        
        <div class="short-top" style="z-index:10;">
          <svg viewBox="0 0 24 24" onclick="switchTab('home', this)"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          <div class="short-top-title">Shorts</div>
          <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
        </div>

        <div class="short-left" style="z-index:10;">
          <div class="short-user-row">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(artist)}&background=fff&color=000" class="short-avatar">
            <div class="short-user-text">
              <div class="short-username">${artist}</div>
              <div class="short-followers">Artist</div>
            </div>
            <button class="short-follow-btn">Follow</button>
          </div>
          <div class="short-tags"><span>#music</span><span>#trending</span></div>
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
    
    setupShortObserver();
    
  } catch (err) {
    feed.innerHTML = '<div style="color:#ff5555;text-align:center;padding:50px;">Error: ' + err.message + '</div>';
  }
}

function setupShortObserver() {
    const cards = document.querySelectorAll('.short-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const card = entry.target;
            const wrap = card.querySelector('.short-video-wrap');
            const vid = card.dataset.vid;
            const playBtn = card.querySelector('.short-play-btn');
            const iconPlay = card.querySelector('.icon-play');
            const iconPause = card.querySelector('.icon-pause');
            let existingIframe = wrap.querySelector('iframe');
            let hideBtnTimeout;
            
            if (entry.isIntersecting) {
                if (existingIframe) {
                    existingIframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'playVideo', args: []}), '*');
                    if (playBtn) playBtn.style.display = 'flex';
                    card.dataset.playing = 'false';
                    iconPlay.style.display = 'block';
                    iconPause.style.display = 'none';
                    return;
                }
                
                // Load YouTube initially MUTED so it autoplays instantly
                const ytUrl = `https://www.youtube.com/embed/${vid}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&enablejsapi=1`;
                const iframe = document.createElement('iframe');
                iframe.src = ytUrl;
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = 'none';
                iframe.style.position = 'absolute';
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.pointerEvents = 'auto'; // Block YouTube UI
                wrap.appendChild(iframe);
                
                const poster = card.querySelector('.short-poster');
                if(poster) poster.style.display = 'none';

                if (playBtn) playBtn.style.display = 'flex';
                card.dataset.playing = 'false';

                if(playBtn) {
                    playBtn.onclick = function(e) {
                        e.stopPropagation();
                        if (card.dataset.playing === 'false') {
                            
                            // THE SOUND FIX: 
                            // Reload iframe with mute=0. Since user clicked, browser allows sound.
                            if (iframe.src.indexOf('mute=1') > -1) {
                                iframe.src = iframe.src.replace('mute=1', 'mute=0');
                            } else {
                                iframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'playVideo', args: []}), '*');
                            }

                            iconPlay.style.display = 'none';
                            iconPause.style.display = 'block';
                            card.dataset.playing = 'true';
                            
                            clearTimeout(hideBtnTimeout);
                            hideBtnTimeout = setTimeout(() => {
                                if (card.dataset.playing === 'true') playBtn.style.opacity = '0';
                            }, 2000);
                            
                        } else {
                            iframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'pauseVideo', args: []}), '*');
                            iconPlay.style.display = 'block';
                            iconPause.style.display = 'none';
                            card.dataset.playing = 'false';
                            
                            clearTimeout(hideBtnTimeout);
                            playBtn.style.opacity = '1';
                        }
                    };
                }

                card.addEventListener('click', function(e) {
                    if (e.target !== playBtn && !playBtn.contains(e.target)) {
                        playBtn.style.opacity = '1';
                        clearTimeout(hideBtnTimeout);
                        if (card.dataset.playing === 'true') {
                            hideBtnTimeout = setTimeout(() => { playBtn.style.opacity = '0'; }, 2000);
                        }
                    }
                });
                
            } else {
                if (existingIframe) {
                    existingIframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'pauseVideo', args: []}), '*');
                }
                if (playBtn) {
                    playBtn.style.display = 'none';
                    playBtn.style.opacity = '1';
                }
                card.dataset.playing = 'false';
            }
        });
    }, { threshold: 0.6 });
    
    cards.forEach(card => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.switchTab) {
            const originalSwitch = window.switchTab;
            window.switchTab = function(tab, el) {
                originalSwitch(tab, el);
                if (tab === 'shorts') loadShortsFeed();
            };
        }
    }, 1000);
});
