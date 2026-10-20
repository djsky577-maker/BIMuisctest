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
          <div class="short-loader" style="display:none; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:#00e0d0; font-weight:bold; z-index:5; background:rgba(0,0,0,0.8); padding:10px 20px; border-radius:20px;">Loading...</div>
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
            const loader = card.querySelector('.short-loader');
            let existingIframe = wrap.querySelector('iframe');
            
            if (entry.isIntersecting) {
                if (existingIframe) {
                    existingIframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'playVideo', args: []}), '*');
                    return;
                }
                
                loader.style.display = 'block';
                
                // Wait 3 seconds for Piped, then fallback to muted YouTube iframe
                let resolved = false;
                let timeout = setTimeout(() => {
                    if (!resolved) {
                        resolved = true;
                        loader.style.display = 'none';
                        createMutedIframe(wrap, vid, card);
                    }
                }, 3000);

                window.pget('/streams/' + vid).then(res => {
                    if (resolved) return;
                    resolved = true;
                    clearTimeout(timeout);
                    loader.style.display = 'none';
                    
                    let streamUrl = '';
                    if (res && res.audioStreams && res.audioStreams.length > 0) {
                        streamUrl = res.audioStreams[0].url;
                    }
                    
                    if (streamUrl) {
                        const media = document.createElement('video');
                        media.src = streamUrl;
                        media.loop = true;
                        media.playsInline = true;
                        media.style.width = '100%';
                        media.style.height = '100%';
                        media.style.objectFit = 'cover';
                        media.style.opacity = '0';
                        wrap.appendChild(media);
                        media.play().catch(e => console.log(e));
                    } else {
                        createMutedIframe(wrap, vid, card);
                    }
                }).catch(e => {
                    if (resolved) return;
                    resolved = true;
                    clearTimeout(timeout);
                    loader.style.display = 'none';
                    createMutedIframe(wrap, vid, card);
                });
            } else {
                if (existingIframe) {
                    existingIframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'pauseVideo', args: []}), '*');
                }
                let media = wrap.querySelector('video');
                if(media) media.pause();
            }
        });
    }, { threshold: 0.6 });
    
    cards.forEach(card => observer.observe(card));
}

function createMutedIframe(wrap, vid, card) {
    const ytUrl = `https://www.youtube.com/embed/${vid}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&enablejsapi=1`;
    const iframe = document.createElement('iframe');
    iframe.src = ytUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.pointerEvents = 'auto';
    wrap.appendChild(iframe);
    
    // THE 4-SECOND TRICK
    setTimeout(function() {
        try {
            iframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'unMute', args: []}), '*');
            iframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'setVolume', args: [100]}), '*');
        } catch(e) {}
    }, 4000);

    // Manual tap to unmute fallback
    card.addEventListener('click', function() {
        try {
            iframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'unMute', args: []}), '*');
            iframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'setVolume', args: [100]}), '*');
        } catch(e) {}
    });
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
