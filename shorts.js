async function loadShortsFeed() {
  const feed = document.querySelector('.shorts-feed');
  if (!feed) return;
  
  feed.innerHTML = '<div style="color:#00e0d0;text-align:center;padding:50px;font-size:16px;">Loading trending music...</div>';
  
  try {
    const queries = ['trending music 2026', 'afrobeats hits', 'hip hop music video', 'rnb hits', 'amapiano'];
    const q = queries[Math.floor(Math.random() * queries.length)];
    
    if (!window.pget) return;
    
    const res = await window.pget('/search?q=' + encodeURIComponent(q) + '&filter=videos');
    
    if (!res || !res.items || res.items.length === 0) {
      feed.innerHTML = '<div style="color:#fff;text-align:center;padding:50px;">No music found.</div>';
      return;
    }

    feed.innerHTML = '';
    
    const validVideos = res.items
      .filter(v => v.url && v.title)
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
      
      card.innerHTML = `
        <div class="short-video-wrap">
          <img src="${thumb}" class="short-poster" style="width:100%; height:100%; object-fit:cover;">
          <div class="short-loader" style="display:none; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:#00e0d0; font-weight:bold; z-index:5; background:rgba(0,0,0,0.6); padding:10px 20px; border-radius:20px;">Loading audio...</div>
          <div class="short-tap-play" style="display:none; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:70px; height:70px; background:rgba(0,224,208,0.8); border-radius:50%; z-index:20; justify-content:center; align-items:center; cursor:pointer; box-shadow: 0 4px 20px rgba(0,224,208,0.5);">
            <svg viewBox="0 0 24 24" style="width:35px; height:35px; fill:#000; margin-left:5px;"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div class="short-overlay"></div>
        
        <div class="short-top">
          <svg viewBox="0 0 24 24" onclick="switchTab('home', this)"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          <div class="short-top-title">Shorts</div>
          <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
        </div>

        <div class="short-left">
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

        <div class="short-bottom">
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
            const poster = card.querySelector('.short-poster');
            const loader = card.querySelector('.short-loader');
            const playBtn = card.querySelector('.short-tap-play');
            let existingMedia = wrap.querySelector('video, audio');
            
            if (entry.isIntersecting) {
                // If media already exists, just play it
                if (existingMedia) {
                    existingMedia.play().then(() => {
                        if (playBtn) playBtn.style.display = 'none';
                    }).catch(e => {
                        // Autoplay blocked! Show the tap button
                        if (playBtn) playBtn.style.display = 'flex';
                    });
                    return;
                }
                
                // Fetch stream
                loader.style.display = 'block';
                window.pget('/streams/' + vid).then(res => {
                    let streamUrl = '';
                    if (res && res.audioStreams && res.audioStreams.length > 0) {
                        streamUrl = res.audioStreams[0].url;
                    }
                    
                    if (streamUrl) {
                        const media = document.createElement('video'); // use video tag for iOS compatibility
                        media.src = streamUrl;
                        media.loop = true;
                        media.playsInline = true;
                        media.style.width = '100%';
                        media.style.height = '100%';
                        media.style.objectFit = 'cover';
                        
                        // Hide the video visual, just play audio (since we have the poster image)
                        media.style.opacity = '0'; 
                        
                        media.onerror = function() {
                            loader.style.display = 'none';
                            loader.textContent = 'Stream blocked by YT. Skipping...';
                        };

                        wrap.appendChild(media);
                        loader.style.display = 'none';
                        
                        media.play().then(() => {
                            if (playBtn) playBtn.style.display = 'none';
                        }).catch(e => {
                            // Browser blocked autoplay
                            if (playBtn) {
                                playBtn.style.display = 'flex';
                                playBtn.onclick = () => {
                                    media.play();
                                    playBtn.style.display = 'none';
                                };
                            }
                        });
                    } else {
                        loader.style.display = 'none';
                    }
                }).catch(e => {
                    loader.style.display = 'none';
                });
                
            } else {
                // Pause if it scrolls away
                if (existingMedia) {
                    existingMedia.pause();
                }
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
