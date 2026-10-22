async function loadShortsFeed() {
  const feed = document.querySelector('.shorts-feed');
  if (!feed) return;
  
  feed.innerHTML = '<div style="color:#00e0d0;text-align:center;padding:50px;font-size:16px;">Loading...</div>';
  
  try {
    const queries = ['afrobeats #shorts', 'hip hop #shorts', 'rnb #shorts', 'amapiano #shorts', 'music lyrics #shorts'];
    const q = queries[Math.floor(Math.random() * queries.length)];
    
    if (!window.pget) return;
    const res = await window.pget('/search?q=' + encodeURIComponent(q) + '&filter=videos');
    
    if (!res || !res.items || res.items.length === 0) {
      feed.innerHTML = '<div style="color:#fff;text-align:center;padding:50px;">No shorts found.</div>';
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
          <img src="${thumb}" class="short-poster" style="width:100%; height:100%; object-fit:cover; z-index:1; position:absolute;">
        </div>
        <div class="short-overlay" style="pointer-events: none; z-index:2; position:absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 20%, transparent 70%, rgba(0,0,0,0.8) 100%);"></div>
        
        <!-- TOP HEADER: Back Button, For You, Audios -->
        <div class="short-top" style="z-index:10; display:flex; justify-content:space-between; align-items:center; padding: 40px 20px 20px 20px; position:absolute; top:0; width:100%;">
          
          <div style="display:flex; align-items:center; gap: 15px;">
            <svg viewBox="0 0 24 24" onclick="switchTab('home', this)" style="width:28px; height:28px; fill:#fff; cursor:pointer;"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
            <span style="color:#fff; font-weight:900; font-size:18px; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">For You</span>
          </div>
          
          <div style="display:flex; align-items:center; gap: 15px;">
            <span style="color:rgba(255,255,255,0.6); font-weight:700; font-size:16px; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">Audios</span>
          </div>

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
            let existingIframe = wrap.querySelector('iframe');
            
            if (entry.isIntersecting) {
                if (existingIframe) {
                    existingIframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'playVideo', args: []}), '*');
                    return;
                }
                
                // Load YouTube player (TAP BLOCK REMOVED so you can click it)
                const ytUrl = `https://www.youtube.com/embed/${vid}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&enablejsapi=1`;
                const iframe = document.createElement('iframe');
                iframe.src = ytUrl;
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = 'none';
                iframe.style.position = 'absolute';
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.zIndex = '3';
                iframe.style.pointerEvents = 'auto'; // ALLOW CLICKS
                wrap.appendChild(iframe);
                
                const poster = card.querySelector('.short-poster');
                if(poster) poster.style.display = 'none';
                
            } else {
                if (existingIframe) {
                    existingIframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'pauseVideo', args: []}), '*');
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
