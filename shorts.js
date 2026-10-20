console.log("Shorts.js loaded!");

async function loadShortsFeed() {
  const feed = document.querySelector('.shorts-feed');
  if (!feed) return;
  
  // If it already has real cards, don't load again
  if (feed.dataset.loaded === 'true') return;
  
  feed.innerHTML = '<div style="color:#00e0d0;text-align:center;padding:50px;font-size:16px;">Loading trending music...</div>';
  
  try {
    const queries = ['trending music 2026', 'afrobeats hits', 'hip hop music video', 'rnb hits', 'amapiano'];
    const q = queries[Math.floor(Math.random() * queries.length)];
    
    if (!window.pget) {
        feed.innerHTML = '<div style="color:#ff5555;text-align:center;padding:50px;">API error (pget missing).</div>';
        return;
    }
    
    console.log("Fetching shorts with query:", q);
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
    
    validVideos.forEach((v, index) => {
      const vid = v.url.replace('/watch?v=', '').split('&')[0];
      const title = v.title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const artist = (v.uploaderName || 'Unknown').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const thumb = v.thumbnail || 'https://i.ytimg.com/vi/' + vid + '/mqdefault.jpg';
      
      const card = document.createElement('div');
      card.className = 'short-card';
      
      const ytUrl = `https://www.youtube.com/embed/${vid}?autoplay=0&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&enablejsapi=1`;
      
      card.innerHTML = `
        <div class="short-video-wrap">
          <iframe src="${ytUrl}" allow="autoplay; encrypted-media" allowfullscreen></iframe>
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

        <div class="short-right">
          <div class="short-icon-btn"><svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg></div>
        </div>

        <div class="short-bottom">
          <div class="short-audio-info">
            <img src="${thumb}" class="short-audio-art">
            <div class="short-audio-text">
              <div class="short-audio-title">${title}</div>
              <div class="short-audio-artist">${artist}</div>
            </div>
          </div>
          <button class="short-plus-btn"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg></button>
        </div>
        <div class="short-progress"><div class="short-progress-fill"></div></div>
      `;
      feed.appendChild(card);
    });
    
    feed.dataset.loaded = 'true';
    console.log("Shorts loaded successfully!");
    
    // Auto-play setup
    setTimeout(() => {
        const cards = document.querySelectorAll('.short-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const iframe = entry.target.querySelector('iframe');
                if (!iframe || !iframe.contentWindow) return;
                const cmd = entry.isIntersecting ? 'playVideo' : 'pauseVideo';
                iframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: cmd, args: []}), '*');
            });
        }, { threshold: 0.6 });
        cards.forEach(card => observer.observe(card));
    }, 1500);
    
  } catch (err) {
    console.error(err);
    feed.innerHTML = '<div style="color:#ff5555;text-align:center;padding:50px;">Error loading music.</div>';
  }
}

// WATCH FOR THE SHORTS TAB OPENING
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, watching for shorts tab...");
    const shortsView = document.getElementById('view-shorts');
    
    if (shortsView) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (shortsView.classList.contains('active')) {
                        loadShortsFeed();
                    }
                }
            });
        });
        observer.observe(shortsView, { attributes: true });
    }
});
