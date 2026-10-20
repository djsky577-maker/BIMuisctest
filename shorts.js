async function loadShortsFeed() {
  const feed = document.querySelector('.shorts-feed');
  if (!feed) return;
  
  feed.innerHTML = '<div style="color:#00e0d0;text-align:center;padding:50px;">Testing API...</div>';
  
  try {
    const res = await window.pget('/search?q=trending music&filter=videos');
    if (!res || !res.items) {
        feed.innerHTML = '<div style="color:#ff5555;text-align:center;padding:50px;">API returned nothing.</div>';
        return;
    }
    
    feed.innerHTML = '<div style="color:#fff;text-align:center;padding:50px;">Found ' + res.items.length + ' videos. Loading first one...</div>';
    
    // Grab the very first valid video
    const v = res.items.find(x => x.url && x.title);
    if(!v) {
        feed.innerHTML = '<div style="color:#ff5555;text-align:center;padding:50px;">Found videos but URL is missing.</div>';
        return;
    }
    
    const vid = v.url.replace('/watch?v=', '').split('&')[0];
    
    // Build the EXACT HTML for one single real player
    feed.innerHTML = `
      <div class="short-card">
        <div class="short-video-wrap">
          <iframe src="https://www.youtube.com/embed/${vid}?autoplay=1&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1" allow="autoplay; encrypted-media" allowfullscreen style="width:100%; height:100%;"></iframe>
        </div>
        <div style="position:absolute; bottom:100px; left:20px; color:white; z-index:10;">
            <h2 style="font-size:20px;">${v.title}</h2>
            <p>${v.uploaderName}</p>
        </div>
      </div>
    `;
  } catch(e) {
    feed.innerHTML = '<div style="color:#ff5555;text-align:center;padding:50px;">Error: ' + e.message + '</div>';
  }
}

// Trigger when Shorts is clicked
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.textContent.includes('Shorts')) {
            item.addEventListener('click', () => {
                setTimeout(loadShortsFeed, 500);
            });
        }
    });
});
