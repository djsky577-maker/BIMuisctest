
var PIPES=['https://pipedapi.kavin.rocks','https://pipedapi.adminforge.de','https://api.piped.private.coffee','https://pipedapi.reallyaweso.me'];
var pipeIdx=0;
async function pget(path){for(var i=0;i<PIPES.length;i++){var idx=(pipeIdx+i)%PIPES.length;try{var r=await fetch(PIPES[idx]+path);if(!r.ok)throw 0;var d=await r.json();pipeIdx=idx;return d;}catch(e){}}throw new Error('busy');}
var SUPABASE_URL='https://fugfrgyosrugsrardytk.supabase.co';
var SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1Z2ZyZ3lvc3J1Z3NyYXJkeXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4MDI2NzMsImV4cCI6MjEwNTM3ODY3M30.tNzCEJwV23z9dT75CUytYhirOuxF25GS1CffzpeghPY';
var db=null,isLoginMode=true,currentUser=null,ytPlayer=null,ytReady=false;
var currentSource='db',songs=[],ytResults=[],playQueue=[],currentIndex=-1,isPlaying=false,isShuffle=false,repeatMode=0,playbackSpeed=1;
var followedArtists=JSON.parse(localStorage.getItem('bi_followed')||'[]'),currentArtist={name:'',img:''};
var trendingPool=[],trendingIdx=0,trendingLoading=false;
var hotPool=[],hotIdx=0,hotLoading=false;
var mixPool=[],mixIdx=0,mixLoading=false;
var artistPool=[],artistIdx=0,artistLoading=false;
var genrePool=[],genreQuery='',genreIdx=0,genreLoading=false;
var artistSongPool=[],artistSongLoading=false;
var simPool=[],simTitle='',simLoading=false,simQIdx=0,simSimilar=[];
var homePool=[],homeQIdx=0,homeLoading=false;
var CURATED_ARTISTS=['Drake','Kendrick Lamar','J. Cole','Future','21 Savage','Travis Scott','Metro Boomin','The Weeknd','Post Malone','SZA','Doja Cat','Ariana Grande','Taylor Swift','Billie Eilish','Rihanna','Chris Brown','Beyoncé','Nicki Minaj','Cardi B','Megan Thee Stallion','Burna Boy','Wizkid','Davido','Asake','Rema','Tems','Olamide','Fireboy DML','Omah Lay','Ayra Starr','Ruger','BNXN','Kizz Daniel','Tekno','Yemi Alade','Tiwa Savage','2Baba','Phyno','Flavour','Don Jazzy','Sarkodie','Stonebwoy','Shatta Wale','Black Sherif','Gyakie','Sauti Sol','Nyashinski','Diamond Platnumz','Harmonize','Zuchu','Rayvanny','Alikiba','Tyla','Master KG','Nasty C','DJ Maphorisa','Kabza De Small','Focalistic','Konshens','Popcaan','Busy Signal','Shenseea','Skillibeng','Vybz Kartel','Alkaline','Mavado','Sean Paul','Shaggy','Chronixx','Koffee','Masicka','Bob Marley','Ed Sheeran','Adele','Harry Styles','Dua Lipa','Sam Smith','Lewis Capaldi','ZAYN','One Direction','Little Mix','Stormzy','Central Cee','Dave','J Hus','Aitch','Rita Ora','Calvin Harris','Ellie Goulding','Arctic Monkeys','The 1975','Alan Walker','Kygo','Martin Garrix','Tiësto','Avicii','Swedish House Mafia','David Guetta','DJ Snake','Bad Bunny','Daddy Yankee','Ozuna','J Balvin','Maluma','Karol G','Shakira','BTS','BLACKPINK','TWICE','Stray Kids','NewJeans','Yoasobi','Arijit Singh','Diljit Dosanjh','Aya Nakamura','Stromae','Lorde','Sia','Iggy Azalea','Tame Impala','Troye Sivan','Hozier','Niall Horan','Eminem','50 Cent','Dr. Dre','Jay-Z','Lil Wayne','Usher','Trey Songz','Bryson Tiller','Miguel','Brent Faiyaz','Steve Lacy','Lil Baby','Gunna','Young Thug','Lil Durk','King Von','Polo G','Roddy Ricch','DaBaby','Lil Nas X','Jack Harlow','Doechii','Tyler The Creator','Mac Miller','Kid Cudi','Kanye West','Pusha T','Big Sean','Meek Mill','Rick Ross','2 Chainz','Michael Jackson','Bruno Mars','Olivia Rodrigo','Miley Cyrus','Demi Lovato','Selena Gomez','Halsey','Kehlani','Charlie Puth','Maroon 5','Imagine Dragons','OneRepublic','Sheebah','Spice Diana','Vinka','Fik Fameica','Winnie Nwagi','Jose Chameleone','Bebe Cool','Eddy Kenzo','Joshua Baraka','Pallaso','Azawi','Lydia Jazmine','T Paul','Kapeke','Maurice Kirya'];
var CURATED_SIMILAR={'drake':['Kendrick Lamar','J. Cole','Future','21 Savage'],'kendrick lamar':['J. Cole','Drake','Travis Scott','Future'],'burna boy':['Wizkid','Davido','Asake','Rema'],'wizkid':['Burna Boy','Davido','Rema','Tems'],'davido':['Wizkid','Burna Boy','Asake','Rema'],'asake':['Burna Boy','Olamide','Davido','Rema'],'rema':['Burna Boy','Wizkid','Asake','Davido'],'tems':['Wizkid','Burna Boy','SZA','Arya Starr'],'nicki minaj':['Cardi B','Megan Thee Stallion','Doja Cat','Ariana Grande'],'cardi b':['Nicki Minaj','Megan Thee Stallion','Doja Cat','City Girls'],'rihanna':['Beyoncé','Nicki Minaj','Ariana Grande','Doja Cat'],'the weeknd':['Post Malone','Bruno Mars','Doja Cat','SZA'],'sza':['Doja Cat','Summer Walker','Frank Ocean','Jhené Aiko'],'doja cat':['SZA','Ariana Grande','Nicki Minaj','Megan Thee Stallion'],'ariana grande':['Taylor Swift','Doja Cat','Dua Lipa','Selena Gomez'],'taylor swift':['Ariana Grande','Selena Gomez','Ed Sheeran','Olivia Rodrigo'],'billie eilish':['Ariana Grande','Olivia Rodrigo','Dua Lipa','Selena Gomez'],'ed sheeran':['Shawn Mendes','Lewis Capaldi','Sam Smith','James Arthur'],'chris brown':['Usher','Trey Songz','Bryson Tiller','Miguel'],'konshens':['Popcaan','Busy Signal','Shenseea','Skillibeng'],'popcaan':['Konshens','Busy Signal','Vybz Kartel','Alkaline'],'busy signal':['Konshens','Popcaan','Mavado','Aidonia'],'shenseea':['Spice','Konshens','Skillibeng','Popcaan'],'vybz kartel':['Popcaan','Alkaline','Mavado','Konshens'],'alan walker':['Kygo','Martin Garrix','Avicii','The Chainsmokers'],'kygo':['Alan Walker','The Chainsmokers','Martin Garrix','Sigala'],'martin garrix':['Tiësto','Afrojack','Avicii','Hardwell'],'bad bunny':['Daddy Yankee','Ozuna','J Balvin','Anuel AA'],'bts':['BLACKPINK','TWICE','Stray Kids','NewJeans'],'blackpink':['BTS','TWICE','Stray Kids','NewJeans'],'sheebah':['Spice Diana','Vinka','Winnie Nwagi','Fik Fameica'],'spice diana':['Sheebah','Vinka','Winnie Nwagi','Fik Fameica'],'eddy kenzo':['Sheebah','Fik Fameica','Spice Diana','Vinka'],'jose chameleone':['Eddy Kenzo','Bebe Cool','Sheebah','Fik Fameica'],'bebe cool':['Jose Chameleone','Eddy Kenzo','Sheebah','Fik Fameica'],'maurice kirya':['Kenneth Mugabi','Azawi','Eddy Kenzo','Joshua Baraka'],'azawi':['Sheebah','Spice Diana','Vinka','Maurice Kirya'],'fireboy dml':['Joeboy','Omah Lay','Kizz Daniel','BNXN'],'omah lay':['Fireboy DML','Joeboy','BNXN','Kizz Daniel'],'joeboy':['Fireboy DML','Omah Lay','BNXN','Kizz Daniel'],'kizz daniel':['Tekno','Fireboy DML','Omah Lay','BNXN'],'ayra starr':['Tems','Tyla','Wizkid','Rema'],'tyla':['Tems','Ayra Starr','Master KG','Focalistic'],'master kg':['Kabza De Small','DJ Maphorisa','Focalistic','Tyla']};
var COUNTRY={'sheebah':'🇺🇬','spice diana':'🇺🇬','vinka':'🇺🇬','fik fameica':'🇺🇬','winnie nwagi':'🇺🇬','jose chameleone':'🇺🇬','bebe cool':'🇺🇬','eddy kenzo':'🇺🇬','joshua baraka':'🇺🇬','pallaso':'🇺🇬','azawi':'🇺🇬','lydia jazmine':'🇺🇬','t paul':'🇺🇬','kapeke':'🇺🇬','maurice kirya':'🇺🇬','burna boy':'🇳🇬','wizkid':'🇳🇬','davido':'🇳🇬','asake':'🇳🇬','rema':'🇳🇬','tems':'🇳🇬','olamide':'🇳🇬','fireboy dml':'🇳🇬','joeboy':'🇳🇬','kizz daniel':'🇳🇬','tekno':'🇳🇬','yemi alade':'🇳🇬','tiwa savage':'🇳🇬','ayra starr':'🇳🇬','ruger':'🇳🇬','omah lay':'🇳🇬','bnxn':'🇳🇬','2baba':'🇳🇬','phyno':'🇳🇬','flavour':'🇳🇬','don jazzy':'🇳🇬','sarkodie':'🇬🇭','stonebwoy':'🇬🇭','shatta wale':'🇬🇭','black sherif':'🇬🇭','gyakie':'🇬🇭','sauti sol':'🇰🇪','nyashinski':'🇰🇪','diamond platnumz':'🇹🇿','harmonize':'🇹🇿','zuchu':'🇹🇿','rayvanny':'🇹🇿','alikiba':'🇹🇿','tyla':'🇿🇦','master kg':'🇿🇦','nasty c':'🇿🇦','dj maphorisa':'🇿🇦','kabza de small':'🇿🇦','focalistic':'🇿🇦','drake':'🇨🇦','the weeknd':'🇨🇦','justin bieber':'🇨🇦','shawn mendes':'🇨🇦','tate mcrae':'🇨🇦','chris brown':'🇺🇸','sza':'🇺🇸','doja cat':'🇺🇸','ariana grande':'🇺🇸','taylor swift':'🇺🇸','billie eilish':'🇺🇸','post malone':'🇺🇸','travis scott':'🇺🇸','future':'🇺🇸','21 savage':'🇺🇸','kendrick lamar':'🇺🇸','j. cole':'🇺🇸','juice wrld':'🇺🇸','lil baby':'🇺🇸','gunna':'🇺🇸','young thug':'🇺🇸','megan thee stallion':'🇺🇸','cardi b':'🇺🇸','nicki minaj':'🇺🇸','beyoncé':'🇺🇸','frank ocean':'🇺🇸','summer walker':'🇺🇸','metro boomin':'🇺🇸','lil wayne':'🇺🇸','eminem':'🇺🇸','50 cent':'🇺🇸','dr. dre':'🇺🇸','jay-z':'🇺🇸','usher':'🇺🇸','trey songz':'🇺🇸','bryson tiller':'🇺🇸','miguel':'🇺🇸','brent faiyaz':'🇺🇸','steve lacy':'🇺🇸','lil uzi vert':'🇺🇸','playboi carti':'🇺🇸','lil durk':'🇺🇸','king von':'🇺🇸','polo g':'🇺🇸','roddy ricch':'🇺🇸','dababy':'🇺🇸','lil nas x':'🇺🇸','jack harlow':'🇺🇸','doechii':'🇺🇸','tyler the creator':'🇺🇸','mac miller':'🇺🇸','kid cudi':'🇺🇸','kanye west':'🇺🇸','bruno mars':'🇺🇸','olivia rodrigo':'🇺🇸','miley cyrus':'🇺🇸','demi lovato':'🇺🇸','selena gomez':'🇺🇸','halsey':'🇺🇸','kehlani':'🇺🇸','charlie puth':'🇺🇸','maroon 5':'🇺🇸','imagine dragons':'🇺🇸','onerepublic':'🇺🇸','ed sheeran':'🇬🇧','coldplay':'🇬🇧','adele':'🇬🇧','harry styles':'🇬🇧','dua lipa':'🇬🇧','sam smith':'🇬🇧','lewis capaldi':'🇬🇧','zayn':'🇬🇧','one direction':'🇬🇧','little mix':'🇬🇧','stormzy':'🇬🇧','central cee':'🇬🇧','dave':'🇬🇧','j hus':'🇬🇧','aitch':'🇬🇧','rita ora':'🇬🇧','calvin harris':'🇬🇧','ellie goulding':'🇬🇧','arctic monkeys':'🇬🇧','the 1975':'🇬🇧','hozier':'🇮🇪','niall horan':'🇮🇪','sia':'🇦🇺','iggy azalea':'🇦🇺','tame impala':'🇦🇺','troye sivan':'🇦🇺','lorde':'🇳🇿','rihanna':'🇧🇧','bob marley':'🇯🇲','konshens':'🇯🇲','busy signal':'🇯🇲','popcaan':'🇯🇲','sean paul':'🇯🇲','shaggy':'🇯🇲','skillibeng':'🇯🇲','shenseea':'🇯🇲','spice':'🇯🇲','vybz kartel':'🇯🇲','alkaline':'🇯🇲','mavado':'🇯🇲','buju banton':'🇯🇲','chronixx':'🇯🇲','koffee':'🇯🇲','masicka':'🇯🇲','shakira':'🇨🇴','maluma':'🇨🇴','karol g':'🇨🇴','j balvin':'🇨🇴','bad bunny':'🇵🇷','daddy yankee':'🇵🇷','ozuna':'🇵🇷','rosalía':'🇪🇸','enrique iglesias':'🇪🇸','aya nakamura':'🇫🇷','dj snake':'🇫🇷','david guetta':'🇫🇷','stromae':'🇧🇪','alan walker':'🇳🇴','kygo':'🇳🇴','aurora':'🇳🇴','martin garrix':'🇳🇱','tiësto':'🇳🇱','armin van buuren':'🇳🇱','avicii':'🇸🇪','swedish house mafia':'🇸🇪','zara larsson':'🇸🇪','bts':'🇰🇷','blackpink':'🇰🇷','twice':'🇰🇷','stray kids':'🇰🇷','newjeans':'🇰🇷','yoasobi':'🇯🇵','arijit singh':'🇮🇳','diljit dosanjh':'🇮🇳','peso pluma':'🇲🇽','anitta':'🇧🇷'};
var BAD_TITLE=/\b(mix|nonstop|non-stop|mixtape|compilation|best of|megamix|full album|playlist|lofi|lo-fi|afro house|study|sleep|ambient|lounge|radio show|podcast|episode|hour|hours|instrumental|type beat|karaoke|bootleg|unofficial|remake|rework|ai cover|style x|mashup|24\/7|vol\.|volume|pt\.|part\s*\d|extended\s+mix)\b/i;
var HOME_QUERIES=['afrobeats 2025 hits','hip hop 2025 hits','rnb 2025 hits','amapiano 2025 hits','dancehall 2025 hits','afro pop 2025 hits','trap 2025 hits','gospel 2025 hits','afro soul 2025','drill 2025 hits','naija 2025 hits','ugandan music 2025','reggae 2025 hits','soul 2025 hits','pop hits 2025'];
var VIBE_SAD=['Adele','Sam Smith','Lewis Capaldi','Olivia Rodrigo','Lauv','Ariana Grande'];
var VIBE_PARTY=['David Guetta','Calvin Harris','Kygo','The Chainsmokers','Martin Garrix','Avicii'];
var VIBE_HIPHOP=['Drake','Travis Scott','Future','21 Savage','Metro Boomin','Kendrick Lamar'];
var VIBE_RNB=['SZA','Doja Cat','Summer Walker','Brent Faiyaz','Kehlani'];
var VIBE_GOSPEL=['Kirk Franklin','Sinach','Nathaniel Bassey','Hillsong','Elevation Worship'];
var VIBE_CHILL=['Kygo','The Chainsmokers','Calvin Harris','Sigala','Jonas Blue'];
var VIBE_LATENIGHT=['The Weeknd','Post Malone','SZA','Drake','Frank Ocean'];
function isRealSong(v){var t=(v.title||'').toLowerCase();if(BAD_TITLE.test(t))return false;if(v.duration&&v.duration>0){if(v.duration<45||v.duration>600)return false;}return true;}
function isRealArtistName(name){if(!name)return false;var n=name.trim();if(n.length<2)return false;var bad=/(whats|that song|love ?& ?hip|hip.?hop|universe|nation|world|media|studio|records|entertainment|network|channel|radio|podcast|official|music group|group$|crew|band$|tribute|cover|chart|billboard|dj\s|mix|mashup|hour|24|live|concert|festival|tv$|ent\.|house|beats$|what'?s)/i;if(bad.test(n))return false;if(/^[0-9]+$/.test(n))return false;return true;}
function cleanArtistName(name){if(!name)return '';return name.replace(/\s*-\s*Topic$/i,'').replace(/VEVO$/i,'').replace(/Official$/i,'').trim();}
function detectVibeKey(title){var t=(title||'').toLowerCase();if(/love|heart|miss|sad|broken|cry|alone|goodbye|sorry|hurt|tears|forever|loved|without you/.test(t))return 'sad';if(/party|turn up|club|tonight|dance|floor|move|shake|wild|lit|bounce/.test(t))return 'party';if(/money|cash|hustle|grind|trap|drip|rich|bands|stack/.test(t))return 'hiphop';if(/baby|girl|boy|shawty|honey|touch|kiss/.test(t))return 'rnb';if(/pray|god|faith|bless|heaven|holy|jesus|amen|worship/.test(t))return 'gospel';if(/summer|sun|beach|island|tropical|wave/.test(t))return 'chill';if(/night|moon|dark|late|city|street|lights/.test(t))return 'latenight';return '';}
function vibeList(key){if(key==='sad')return VIBE_SAD;if(key==='party')return VIBE_PARTY;if(key==='hiphop')return VIBE_HIPHOP;if(key==='rnb')return VIBE_RNB;if(key==='gospel')return VIBE_GOSPEL;if(key==='chill')return VIBE_CHILL;if(key==='latenight')return VIBE_LATENIGHT;return [];}
function pickVibeArtist(key){var l=vibeList(key);if(!l.length)return '';return l[Math.floor(Math.random()*l.length)];}
window.addEventListener('load',function(){if(typeof supabase==='undefined'){document.getElementById('authError').textContent='Loading failed';return;}db=supabase.createClient(SUPABASE_URL,SUPABASE_KEY);db.auth.getSession().then(function(r){if(r.data.session){currentUser=r.data.session.user;enterApp();}else showView('auth');}).catch(function(){showView('auth');});bindHoldBtn();});
function toggleAuthMode(){isLoginMode=!isLoginMode;document.getElementById('authTitle').textContent=isLoginMode?'Log In':'Create Account';document.getElementById('authSubtitle').textContent=isLoginMode?'Welcome back to B.I Music':'Join B.I Music today';document.getElementById('authBtn').textContent=isLoginMode?'Log In':'Register';document.getElementById('authSwitchBtn').textContent=isLoginMode?'Need an account? Register':'Already have an account? Log In';document.getElementById('authError').textContent='';}
async function handleAuth(){var e=document.getElementById('authError');e.textContent='';if(!db){e.textContent='Loading';return;}var em=document.getElementById('authEmail').value.trim(),pw=document.getElementById('authPassword').value,b=document.getElementById('authBtn');if(!em||!pw){e.textContent='Fill both fields.';return;}if(pw.length<6){e.textContent='Password 6+ characters.';return;}b.disabled=true;b.textContent=isLoginMode?'Logging in...':'Creating...';try{var r=isLoginMode?await db.auth.signInWithPassword({email:em,password:pw}):await db.auth.signUp({email:em,password:pw});if(r.error){e.textContent=r.error.message;b.disabled=false;b.textContent=isLoginMode?'Log In':'Register';return;}if(!r.data.session){e.textContent='Check email to confirm.';b.disabled=false;b.textContent=isLoginMode?'Log In':'Register';return;}currentUser=r.data.user;b.disabled=false;b.textContent=isLoginMode?'Log In':'Register';enterApp();}catch(x){e.textContent='Error: '+x.message;b.disabled=false;b.textContent=isLoginMode?'Log In':'Register';}}
async function logout(){if(db)await db.auth.signOut();currentUser=null;showView('auth');document.getElementById('authPassword').value='';}
function enterApp(){document.getElementById('profileEmail').textContent=currentUser.email||'';switchTab('home',document.querySelectorAll('.nav-item')[0]);}
function showView(name){document.querySelectorAll('.view').forEach(function(v){v.classList.remove('active');});var t=document.getElementById('view-'+name);if(t)t.classList.add('active');var isAuth=(name==='auth');document.getElementById('mainHeader').style.display=isAuth?'none':'flex';document.getElementById('mainSearchRow').style.display=(name==='home')?'flex':'none';document.getElementById('mainNavTabs').style.display=(name==='home')?'flex':'none';document.getElementById('bottomNav').classList.toggle('active',!isAuth);}
function switchTab(tab,el){document.querySelectorAll('.nav-item').forEach(function(t){t.classList.remove('active');});if(el)el.classList.add('active');if(tab==='home'){showView('home');loadHomeData();}else if(tab==='search')showView('search');else if(tab==='library'){showView('library');loadMyUploads();}else if(tab==='profile')showView('profile');}
function switchHomeTab(tab,el){document.querySelectorAll('.nav-tab').forEach(function(t){t.classList.remove('active');});if(el)el.classList.add('active');document.querySelectorAll('.home-tab').forEach(function(t){t.style.display='none';});var t=document.getElementById('tab-'+tab);if(t)t.style.display='block';if(tab==='trending'){refreshTrending();}if(tab==='mixtape'&&mixPool.length===0){for(var i=0;i<3;i++)loadMixtapes();}if(tab==='artists'&&artistPool.length===0){for(var j=0;j<3;j++)loadArtistsNext();}if(tab==='genres')document.getElementById('genreResults').innerHTML='';}
function shareApp(){var url=window.location.href;if(navigator.share){navigator.share({title:'B.I Music 🎵',text:'Listen to music for free on B.I Music!',url:url}).catch(function(){});}else{navigator.clipboard.writeText(url).then(function(){alert('Link copied!');}).catch(function(){prompt('Copy:',url);});}}
function contactUs(){window.open('https://wa.me/256707103377?text='+encodeURIComponent('Hi! I am using B.I Music and I need help.'),'_blank');}
var _soonFeature='';
function comingSoon(name){_soonFeature=name;var icons={'Artist Dashboard':'📊','Upload Music':'🎵','Promote Your Music':'🚀'};document.getElementById('soonIcon').textContent=icons[name]||'🚀';document.getElementById('soonTitle').textContent=name+' is Coming Soon';document.getElementById('soonText').textContent='This feature is under development. Want us to notify you when it launches?';document.getElementById('soonModal').classList.add('show');}
function closeSoon(){document.getElementById('soonModal').classList.remove('show');}
function contactFromSoon(){closeSoon();window.open('https://wa.me/256707103377?text='+encodeURIComponent('Hi! Notify me when '+_soonFeature+' launches on B.I Music.'),'_blank');}
async function loadMyUploads(){if(!db)return;var r=await db.from('songs').select('*').order('id',{ascending:false});var c=document.getElementById('myUploadsList');if(r.error||!r.data||r.data.length===0){c.innerHTML='<p style="color:#666;text-align:center;padding:40px">No uploads yet.</p>';return;}c.innerHTML='';r.data.forEach(function(s){var el=document.createElement('div');el.className='list-item';el.onclick=function(){playDbSong(r.data.indexOf(s));};el.innerHTML='<img src="'+(s.cover_art_url||'https://via.placeholder.com/150')+'"><div class="list-info"><div class="list-title">'+s.title+'</div><div class="list-sub">'+s.artist_name+'</div></div>';c.appendChild(el);});}
async function loadHomeData(){if(!db)return;try{var r=await db.from('songs').select('*').order('id',{ascending:false}).limit(20);songs=r.data||[];}catch(e){songs=[];}renderRecentlyPlayed();renderFollowedArtists();renderPopularArtists();loadForYou();for(var i=0;i<4;i++)loadHomeMore();}
function renderPopularArtists(){loadArtistGrid('popularArtists',CURATED_ARTISTS.slice(0,9));}
async function loadHomeMore(){if(homeLoading)return;if(homePool.length>=400)return;homeLoading=true;for(var b=0;b<3;b++){if(homePool.length>=400)break;var q=HOME_QUERIES[homeQIdx%HOME_QUERIES.length];homeQIdx++;try{var d=await pget('/search?q='+encodeURIComponent(q)+'&filter=videos');var items=(d.items||[]).filter(function(v){return v.url&&isRealSong(v);});var c=document.getElementById('youMightLike');if(!c)break;items.forEach(function(v){if(homePool.length>=400)return;var vid=(v.url||'').replace('/watch?v=','');if(homePool.some(function(x){return x.id===vid;}))return;var obj={id:vid,title:v.title,uploaderName:v.uploaderName,thumbnail:v.thumbnail};homePool.push(obj);var idx=homePool.length-1;var el=document.createElement('div');el.className='card';el.onclick=function(){playQueue=homePool.map(function(x){return{id:{videoId:x.id},snippet:{title:x.title,channelTitle:x.uploaderName,thumbnails:{default:{url:x.thumbnail},high:{url:x.thumbnail}}}};});ytResults=playQueue;playYoutube(idx);};el.innerHTML='<div class="card-img"><img src="'+obj.thumbnail+'"></div><div class="card-title">'+obj.title+'</div><div class="card-sub">'+obj.uploaderName+'</div>';c.appendChild(el);});}catch(e){}}homeLoading=false;}
async function loadTrending(){if(trendingLoading)return;if(trendingPool.length>=500)return;trendingLoading=true;var c=document.getElementById('trendingList');if(!c){trendingLoading=false;return;}if(trendingPool.length===0)c.innerHTML='<p style="color:#666;text-align:center;padding:20px">Loading...</p>';var queries=['new songs 2025','trending music 2025','top hits 2025','billboard hot 100','spotify top 50','apple music top songs','new afrobeats 2025','new hip hop 2025','new rnb 2025','new dancehall 2025','new amapiano 2025','official music video 2025','latest songs this week','new pop 2025','top afrobeats songs','top hip hop songs','top rnb songs','new drill 2025','new afro pop 2025','new gospel 2025','new soul 2025','new trap 2025','naija top songs','uk top songs','us top songs','african top songs','chart songs 2025','viral songs 2025','radio hits 2025','new releases this month','hot new songs','fresh music 2025','top 40 songs','new nigeria songs','new ghana songs','new kenya songs','new south africa songs','new uganda songs','top afrobeats video','top hip hop video','top rnb video','top dancehall video','top amapiano video','official audio 2025','lyric video 2025','music video 2025'];if(trendingIdx>=queries.length){queries.sort(function(){return Math.random()-0.5;});trendingIdx=0;}for(var b=0;b<2;b++){if(trendingPool.length>=500)break;var q=queries[trendingIdx%queries.length];trendingIdx++;try{var d=await pget('/search?q='+encodeURIComponent(q)+'&filter=videos');var items=(d.items||[]).filter(function(v){return v.url&&isRealSong(v);});items.forEach(function(v){if(trendingPool.length>=500)return;var vid=(v.url||'').replace('/watch?v=','');if(trendingPool.some(function(x){return x.id===vid;}))return;var u=(v.uploaderName||'').toLowerCase();var t=(v.title||'').toLowerCase();var verified=/vevo$|topic$|official|records|music$/.test(u)||/official|music video|audio|visualizer|lyric/.test(t);if(!verified)return;var obj={id:vid,title:v.title,uploaderName:v.uploaderName,thumbnail:v.thumbnail};trendingPool.push(obj);var ix=trendingPool.length-1;var el=document.createElement('div');el.className='list-item';el.onclick=function(){playQueue=trendingPool.map(function(x){return{id:{videoId:x.id},snippet:{title:x.title,channelTitle:x.uploaderName,thumbnails:{default:{url:x.thumbnail},high:{url:x.thumbnail}}}};});ytResults=playQueue;playYoutube(ix);};el.innerHTML='<img src="'+obj.thumbnail+'"><div class="list-info"><div class="list-title">'+obj.title+'</div><div class="list-sub">'+obj.uploaderName+'</div></div><button class="dl-btn" onclick="event.stopPropagation();dlId(\''+vid+'\')"><svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg></button>';c.appendChild(el);});}catch(e){}}trendingLoading=false;var tb=document.getElementById('trendingLoadBtn');if(tb)tb.style.display='block';}
function refreshTrending(){trendingPool=[];trendingIdx=0;trendingLoading=false;hotPool=[];hotIdx=0;hotLoading=false;var c=document.getElementById('trendingList');if(c)c.innerHTML='';var hc=document.getElementById('hotList');if(hc)hc.innerHTML='';loadTrending();loadHot();}
async function loadHot(){if(hotLoading)return;if(hotPool.length>=400)return;hotLoading=true;var c=document.getElementById('hotList');if(!c){hotLoading=false;return;}if(hotPool.length===0)c.innerHTML='<p style="color:#666;text-align:center;padding:20px">Loading...</p>';var queries=['new songs 2025 release','new music this week','fresh afrobeats 2025','new hip hop 2025','new rnb 2025','new dancehall 2025','new amapiano 2025','latest hits 2025','just released 2025','brand new music','this week music','new single 2025','new album 2025','fresh drops 2025','new naija 2025','new uk music','new us music','new african music'];if(hotIdx>=queries.length){queries.sort(function(){return Math.random()-0.5;});hotIdx=0;}for(var b=0;b<2;b++){if(hotPool.length>=400)break;var q=queries[hotIdx%queries.length];hotIdx++;try{var d=await pget('/search?q='+encodeURIComponent(q)+'&filter=videos');var items=(d.items||[]).filter(function(v){return v.url&&isRealSong(v);});items.forEach(function(v){if(hotPool.length>=400)return;var vid=(v.url||'').replace('/watch?v=','');if(hotPool.some(function(x){return x.id===vid;}))return;var obj={id:vid,title:v.title,uploaderName:v.uploaderName,thumbnail:v.thumbnail};hotPool.push(obj);var ix=hotPool.length-1;var el=document.createElement('div');el.className='list-item';el.onclick=function(){playQueue=hotPool.map(function(x){return{id:{videoId:x.id},snippet:{title:x.title,channelTitle:x.uploaderName,thumbnails:{default:{url:x.thumbnail},high:{url:x.thumbnail}}}};});ytResults=playQueue;playYoutube(ix);};el.innerHTML='<img src="'+obj.thumbnail+'"><div class="list-info"><div class="list-title">'+obj.title+'</div><div class="list-sub">'+obj.uploaderName+'</div></div><button class="dl-btn" onclick="event.stopPropagation();dlId(\''+vid+'\')"><svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg></button>';c.appendChild(el);});}catch(e){}}hotLoading=false;var hb=document.getElementById('hotLoadBtn');if(hb)hb.style.display='block';}
async function loadMixtapes(){if(mixLoading)return;if(mixPool.length>=300)return;mixLoading=true;for(var b=0;b<3;b++){if(mixPool.length>=300)break;var q=['DJ nonstop mix 2025','mixtape 2025 hip hop','afrobeats nonstop mix','amapiano mix 2025','dancehall mix 2025','afrobeat dj mix 2025','gospel mix 2025','rnb mixtape 2025'][mixIdx%8];mixIdx++;try{var d=await pget('/search?q='+encodeURIComponent(q)+'&filter=videos');var items=(d.items||[]).slice(0,8);var c=document.getElementById('mixtapeList');if(!c)break;items.forEach(function(v){if(mixPool.length>=300)return;var vid=(v.url||'').replace('/watch?v=','');if(mixPool.some(function(x){return x.id===vid;}))return;var obj={id:vid,title:v.title,uploaderName:v.uploaderName,thumbnail:v.thumbnail};mixPool.push(obj);var ix=mixPool.length-1;var el=document.createElement('div');el.className='mix-list-item';el.onclick=function(){playQueue=mixPool.map(function(x){return{id:{videoId:x.id},snippet:{title:x.title,channelTitle:x.uploaderName,thumbnails:{default:{url:x.thumbnail},high:{url:x.thumbnail}}}};});ytResults=playQueue;playYoutube(ix);};el.innerHTML='<img src="'+obj.thumbnail+'"><div class="mix-info"><div class="mix-title">'+obj.title+'</div><div class="mix-sub">'+obj.uploaderName+'</div></div><button class="dl-btn" onclick="event.stopPropagation();dlId(\''+vid+'\')"><svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg></button>';c.appendChild(el);});}catch(e){}}mixLoading=false;var mb=document.getElementById('mixLoadBtn');if(mb)mb.style.display='block';}
async function loadArtistsNext(){if(artistLoading)return;if(artistPool.length>=400)return;artistLoading=true;for(var b=0;b<3;b++){if(artistPool.length>=400)break;var qPool=['afrobeats artists','hip hop artists','rnb artists','amapiano artists','dancehall artists','gospel artists','naija artists','ugandan artists','reggae artists','afro pop artists','pop artists','soul artists','trap artists','drill artists','kwaito artists','bongo flava artists','highlife artists','soukous artists','zouk artists','kizomba artists','reggaeton artists','latin artists','country artists','rock artists','indie artists','jazz artists','blues artists','funk artists','electronic artists','house artists','techno artists','dj artists','rapper artists','singer artists','producer artists','afrobeats 2024 artists','afrobeats 2023 artists','top afrobeats artists','best afrobeats artists','afrobeats new artists','underground afrobeats artists','nigerian artists','ghanaian artists','south african artists','kenyan artists','tanzanian artists','american rap artists','uk rap artists','canadian artists','british artists'];var q=qPool[Math.floor(Math.random()*qPool.length)];try{var d=await pget('/search?q='+encodeURIComponent(q)+'&filter=channels');var items=(d.items||[]).slice(0,10);var c=document.getElementById('artistsList');if(!c)break;items.forEach(function(v){var name=cleanArtistName(v.name);if(!isRealArtistName(name))return;if(artistPool.indexOf(name)>=0)return;artistPool.push(name);var isF=followedArtists.some(function(a){return a.name===name;});var imgId='artistsList-img-'+Date.now()+'-'+artistPool.length;var el=document.createElement('div');el.className='artist-box';el.innerHTML='<div class="artist-img" id="'+imgId+'"><img src="'+(v.thumbnail||'https://ui-avatars.com/api/?name='+encodeURIComponent(name)+'&background=00e0d0&color=000&size=200')+'"></div><div class="artist-name">'+name+'</div><button class="follow-btn'+(isF?' following':'')+'" onclick="event.stopPropagation();toggleFollow(\''+name.replace(/'/g,"\\'")+'\',this,\''+imgId+'\')">'+(isF?'Following':'Follow')+'</button>';el.querySelector('.artist-img').onclick=function(){openArtistProfile(name, (document.getElementById(imgId) ? document.getElementById(imgId).querySelector('img').src : ''));};el.querySelector('.artist-name').onclick=function(){openArtistProfile(name, (document.getElementById(imgId) ? document.getElementById(imgId).querySelector('img').src : ''));};c.appendChild(el);});}catch(e){}}artistLoading=false;var ab=document.getElementById('artistLoadBtn');if(ab)ab.style.display='block';}
async function searchArtist(){var q=document.getElementById('artistSearchInput').value.trim();if(!q)return;var c=document.getElementById('artistsList');c.innerHTML='<p style="color:#666;text-align:center;padding:20px">Searching...</p>';artistPool=[];artistIdx=0;try{var d=await pget('/search?q='+encodeURIComponent(q)+'&filter=channels');var items=(d.items||[]).slice(0,15);c.innerHTML='';items.forEach(function(v){var name=cleanArtistName(v.name);if(!isRealArtistName(name))return;if(artistPool.indexOf(name)>=0)return;artistPool.push(name);var isF=followedArtists.some(function(a){return a.name===name;});var imgId='artistsList-img-'+Date.now()+'-'+Math.floor(Math.random()*1000000);var el=document.createElement('div');el.className='artist-box';el.innerHTML='<div class="artist-img" id="'+imgId+'"><img src="'+(v.thumbnail||'https://ui-avatars.com/api/?name='+encodeURIComponent(name)+'&background=00e0d0&color=000&size=200')+'"></div><div class="artist-name">'+name+'</div><button class="follow-btn'+(isF?' following':'')+'" onclick="event.stopPropagation();toggleFollow(\''+name.replace(/'/g,"\\'")+'\',this,\''+imgId+'\')">'+(isF?'Following':'Follow')+'</button>';el.querySelector('.artist-img').onclick=function(){openArtistProfile(name, (document.getElementById(imgId) ? document.getElementById(imgId).querySelector('img').src : ''));};el.querySelector('.artist-name').onclick=function(){openArtistProfile(name, (document.getElementById(imgId) ? document.getElementById(imgId).querySelector('img').src : ''));};c.appendChild(el);});}catch(x){c.innerHTML='<p style="color:#ff5555;text-align:center">Search failed.</p>';}}
function loadArtistGrid(targetId,names){var c=document.getElementById(targetId);if(!c)return;c.innerHTML='';names=names.filter(function(n,i,a){return a.indexOf(n)===i;});names.forEach(function(name,i){var isF=followedArtists.some(function(a){return a.name===name;});var el=document.createElement('div');el.className='artist-box';var imgId=targetId+'-img-'+Date.now()+'-'+i;el.innerHTML='<div class="artist-img" id="'+imgId+'"><img src="https://ui-avatars.com/api/?name='+encodeURIComponent(name)+'&background=00e0d0&color=000&size=200"></div><div class="artist-name">'+name+'</div><button class="follow-btn'+(isF?' following':'')+'" onclick="event.stopPropagation();toggleFollow(\''+name.replace(/'/g,"\\'")+'\',this,\''+imgId+'\')">'+(isF?'Following':'Follow')+'</button>';el.querySelector('.artist-img').onclick=function(){openArtistProfile(name, (document.getElementById(imgId) ? document.getElementById(imgId).querySelector('img').src : ''));};el.querySelector('.artist-name').onclick=function(){openArtistProfile(name, (document.getElementById(imgId) ? document.getElementById(imgId).querySelector('img').src : ''));};c.appendChild(el);loadThumb(name,imgId);});}
async function loadThumb(name,imgId){try{var d=await pget('/search?q='+encodeURIComponent(name)+'&filter=channels');var channels=(d.items||[]).slice(0,5);var img=document.querySelector('#'+imgId+' img');if(!img)return;var nm=name.toLowerCase().trim();for(var i=0;i<channels.length;i++){var cn=(channels[i].name||'').toLowerCase().replace(/\s*-\s*topic$/,'').replace(/vevo$/,'').trim();if(cn===nm||cn.indexOf(nm)===0||nm.indexOf(cn)===0){if(channels[i].thumbnail){img.src=channels[i].thumbnail;return;}}}var d2=await pget('/search?q='+encodeURIComponent(name+' official video')+'&filter=videos');var vids=(d2.items||[]).slice(0,5);for(var j=0;j<vids.length;j++){var un=(vids[j].uploaderName||'').toLowerCase().replace(/\s*-\s*topic$/,'').replace(/vevo$/,'').trim();if(un.indexOf(nm)>=0||nm.indexOf(un)>=0){img.src=vids[j].thumbnail;return;}}}catch(e){}}
function fetchSimilars(name){return new Promise(function(resolve){var key=name.toLowerCase().trim().replace(/[^a-z0-9 ]/g,'');var picks=CURATED_SIMILAR[key];var gen=['Burna Boy','Wizkid','Drake','Rema'];var genOut=function(){return gen.map(function(n){return{name:n,img:'https://ui-avatars.com/api/?name='+encodeURIComponent(n)+'&background=00e0d0&color=000&size=200'};});};if(picks&&picks.length){resolve(picks.map(function(n){return{name:n,img:'https://ui-avatars.com/api/?name='+encodeURIComponent(n)+'&background=00e0d0&color=000&size=200'};}));return;}pget('/search?q='+encodeURIComponent(name+' similar artists')+'&filter=channels').then(function(d){var items=d.items||[];var fn=key.split(' ')[0];var other={};items.forEach(function(v){var un=cleanArtistName(v.name);if(!isRealArtistName(un))return;var ul=un.toLowerCase();if(ul.indexOf(fn)>=0)return;other[un]=v.thumbnail||('https://ui-avatars.com/api/?name='+encodeURIComponent(un)+'&background=00e0d0&color=000&size=200');});var out=Object.keys(other).slice(0,4).map(function(n){return{name:n,img:other[n]};});if(out.length>=3){resolve(out);return;}resolve(genOut());}).catch(function(){resolve(genOut());});});}
async function toggleFollow(name,btn,imgId){var idx=followedArtists.findIndex(function(a){return a.name===name;});var img=imgId?document.querySelector('#'+imgId+' img'):null;if(idx>=0){followedArtists.splice(idx,1);if(btn){btn.classList.remove('following');btn.textContent='Follow';}localStorage.setItem('bi_followed',JSON.stringify(followedArtists));renderFollowedArtists();loadForYou();}else{followedArtists.push({name:name,img:img?img.src:''});if(btn){btn.classList.add('following');btn.textContent='Following';}localStorage.setItem('bi_followed',JSON.stringify(followedArtists));renderFollowedArtists();loadForYou();try{var sims=await fetchSimilars(name);var myPos=followedArtists.findIndex(function(a){return a.name===name;});if(myPos<0)myPos=followedArtists.length-1;var ins=0;for(var i=0;i<sims.length;i++){var s=sims[i];if(!followedArtists.some(function(x){return x.name.toLowerCase()===s.name.toLowerCase();})){followedArtists.splice(myPos+ins,0,s);ins++;}}localStorage.setItem('bi_followed',JSON.stringify(followedArtists));renderFollowedArtists();loadForYou();}catch(e){}}if(currentArtist.name===name)updateFollowButton();}
function renderFollowedArtists(){var c=document.getElementById('followedArtists');if(!c)return;if(followedArtists.length===0){c.innerHTML='<p style="color:#666;font-size:.75rem;grid-column:1/-1">Follow artists to see them here.</p>';return;}c.innerHTML='';followedArtists.forEach(function(a){var el=document.createElement('div');el.className='artist-box';el.innerHTML='<div class="artist-img"><img src="'+(a.img||'https://ui-avatars.com/api/?name='+encodeURIComponent(a.name)+'&background=00e0d0&color=000&size=200')+'"></div><div class="artist-name">'+a.name+'</div><button class="follow-btn following" onclick="event.stopPropagation();toggleFollow(\''+a.name.replace(/'/g,"\\'")+'\',this,null)">Following</button>';el.querySelector('.artist-img').onclick=function(){openArtistProfile(a.name,a.img);};c.appendChild(el);});}
async function loadForYou(){var sec=document.getElementById('forYouSection'),c=document.getElementById('forYou');if(!c)return;if(followedArtists.length===0){sec.style.display='none';return;}sec.style.display='block';c.innerHTML='<p style="color:#666;font-size:.75rem">Loading...</p>';var all=[];for(var i=0;i<Math.min(followedArtists.length,5);i++){try{var d=await pget('/search?q='+encodeURIComponent(followedArtists[i].name+' official video')+'&filter=videos');var items=(d.items||[]).filter(function(v){return isRealSong(v);}).slice(0,4);items.forEach(function(v){all.push({id:(v.url||'').replace('/watch?v=',''),title:v.title,uploaderName:v.uploaderName,thumbnail:v.thumbnail});});}catch(e){}}if(all.length===0){c.innerHTML='<p style="color:#666;font-size:.75rem">No songs found.</p>';return;}c.innerHTML='';all.forEach(function(t){var el=document.createElement('div');el.className='card';el.onclick=function(){playQueue=all.map(function(x){return{id:{videoId:x.id},snippet:{title:x.title,channelTitle:x.uploaderName,thumbnails:{default:{url:x.thumbnail},high:{url:x.thumbnail}}}};});ytResults=playQueue;var idx=all.indexOf(t);if(idx>=0)playYoutube(idx);};el.innerHTML='<div class="card-img"><img src="'+t.thumbnail+'"></div><div class="card-title">'+t.title+'</div><div class="card-sub">'+t.uploaderName+'</div>';c.appendChild(el);});}
async function searchGenre(g){genrePool=[];genreQuery=g;genreIdx=0;genreLoading=false;document.getElementById('genreResults').innerHTML='<h3 style="margin-bottom:10px">'+g+' Hits</h3><div id="genreList"></div><div class="load-more-wrap"><button onclick="loadGenreMore()">Load More</button></div>';for(var i=0;i<4;i++)await loadGenreMore();}
async function loadGenreMore(){if(genreLoading)return;if(genrePool.length>=1000)return;genreLoading=true;var c=document.getElementById('genreList');if(!c){genreLoading=false;return;}var base=genreQuery;var variants=[base+' hit songs',base+' official video',base+' 2025',base+' best songs',base+' top songs',base+' music video',base+' new song',base+' latest',base+' trending',base+' album',base+' single',base+' audio',base+' visualizer',base+' official audio',base+' chart',base+' ft',base+' remix',base+' live',base+' 2024',base+' 2023',base+' classic',base+' throwback','best of '+base,'top 10 '+base,base+' greatest',base+' essentials'];if(genreIdx>=variants.length){variants.sort(function(){return Math.random()-0.5;});genreIdx=0;}var added=0;var tries=0;while(added<15&&tries<12){if(genrePool.length>=1000)break;if(genreIdx>=variants.length){variants.sort(function(){return Math.random()-0.5;});genreIdx=0;}var q=variants[genreIdx];genreIdx++;tries++;try{var d=await pget('/search?q='+encodeURIComponent(q)+'&filter=videos');var items=(d.items||[]).filter(function(v){return v.url&&isRealSong(v);});items.forEach(function(v){if(genrePool.length>=1000)return;var vid=(v.url||'').replace('/watch?v=','');if(genrePool.some(function(x){return x.id===vid;}))return;var obj={id:vid,title:v.title,uploaderName:v.uploaderName,thumbnail:v.thumbnail};genrePool.push(obj);added++;var ix=genrePool.length-1;var el=document.createElement('div');el.className='list-item';el.onclick=function(){playQueue=genrePool.map(function(x){return{id:{videoId:x.id},snippet:{title:x.title,channelTitle:x.uploaderName,thumbnails:{default:{url:x.thumbnail},high:{url:x.thumbnail}}}};});ytResults=playQueue;playYoutube(ix);};el.innerHTML='<img src="'+obj.thumbnail+'"><div class="list-info"><div class="list-title">'+obj.title+'</div><div class="list-sub">'+obj.uploaderName+'</div></div><button class="dl-btn" onclick="event.stopPropagation();dlId(\''+vid+'\')"><svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg></button>';c.appendChild(el);});}catch(e){}}genreLoading=false;}
async function openArtistProfile(name,img){currentArtist={name:name,img:img};artistSongPool=[];artistSongLoading=false;document.getElementById('modalArtistImg').src=img||'https://ui-avatars.com/api/?name='+encodeURIComponent(name)+'&background=00e0d0&color=000&size=200';document.getElementById('modalArtistName').textContent=name;var ck=name.toLowerCase().trim().replace(/[^a-z0-9\. ]/g,'');var flag=COUNTRY[ck]||'';document.getElementById('modalArtistStats').textContent=flag?flag+' '+name:'';document.getElementById('modalArtistSongs').innerHTML='<p style="color:#666;text-align:center;padding:20px">Loading...</p>';document.getElementById('artistModal').classList.add('active');document.getElementById('artistModal').scrollTop=0;updateFollowButton();await loadMoreArtistSongs();}
async function loadMoreArtistSongs(){
if(artistSongLoading)return;
if(artistSongPool.length>=200)return;
artistSongLoading=true;
for(var b=0;b<3;b++){
  if(artistSongPool.length>=200)break;
  var base=currentArtist.name;
  var q=base+' songs';
  try{
    var d=await pget('/search?q='+encodeURIComponent(q)+'&filter=videos');
    var items=(d.items||[]).filter(function(v){return v.url&&isRealSong(v);});
    var nm=base.toLowerCase().trim();
    var sc=document.getElementById('modalArtistSongs');
    if(!sc)break;
    if(artistSongPool.length===0)sc.innerHTML='';
    items.forEach(function(v){
      if(artistSongPool.length>=200)return;
      var un=(v.uploaderName||'').toLowerCase().trim().replace(/\s*-\s*topic$/,'').replace(/vevo$/,'').trim();
      var ti=(v.title||'').toLowerCase();
      // STRICT: only accept if uploader matches artist OR title starts with artist name
      var matchUp=un.indexOf(nm)>=0||nm.indexOf(un)>=0;
      var matchTitle=ti.indexOf(nm)===0||ti.indexOf(nm+'-')===0||ti.indexOf(nm+' -')===0||ti.indexOf(nm+' ft')>=0&&ti.indexOf(nm)<15;
      if(!matchUp&&!matchTitle)return;
      var vid=(v.url||'').replace('/watch?v=','');
      if(artistSongPool.some(function(x){return x.id===vid;}))return;
      var obj={id:vid,title:v.title,channelTitle:v.uploaderName,thumbnail:v.thumbnail};
      artistSongPool.push(obj);
      var ix=artistSongPool.length-1;
      var el=document.createElement('div');el.className='list-item';
      el.onclick=function(){playQueue=artistSongPool.map(function(x){return{id:{videoId:x.id},snippet:{title:x.title,channelTitle:x.channelTitle,thumbnails:{default:{url:x.thumbnail},high:{url:x.thumbnail}}}};});ytResults=playQueue;playYoutube(ix);};
      el.innerHTML='<img src="'+obj.thumbnail+'"><div class="list-info"><div class="list-title">'+obj.title+'</div><div class="list-sub">'+obj.channelTitle+'</div></div><button class="dl-btn" onclick="event.stopPropagation();dlId(\''+vid+'\')"><svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg></button>';
      sc.appendChild(el);
    });
    if(artistSongPool.length===0){sc.innerHTML='<p style="color:#666;text-align:center;padding:20px">No songs found for this artist.</p>';}
  }catch(e){}
}
artistSongLoading=false;
}

function updateFollowButton(){var b=document.getElementById('modalFollowBtn');if(!b)return;var isF=followedArtists.some(function(a){return a.name===currentArtist.name;});b.textContent=isF?'Following':'Follow';b.classList.toggle('following',isF);}
function toggleFollowCurrentArtist(){if(!currentArtist.name)return;toggleFollow(currentArtist.name,null,null);updateFollowButton();}
function closeArtistModal(){document.getElementById('artistModal').classList.remove('active');}
async function loadSimilarSongs(){if(simLoading)return;if(simPool.length>=500)return;simLoading=true;var base=simTitle.split('-')[0].trim()||simTitle;var cleanBase=base.replace(/official|video|lyrics|audio|music|remix|hd|4k|ft\.|feat\.|\(.*?\)|\[.*?\]/gi,'').trim();var key=cleanBase.toLowerCase();var q='';if(simQIdx===0){q=cleanBase+' official video';}else if(simQIdx===1){q=cleanBase+' songs';}else if(simQIdx===2){try{var d=await pget('/search?q='+encodeURIComponent(cleanBase+' similar artists')+'&filter=channels');var items=(d.items||[]).slice(0,10);var fn=key.split(' ')[0];simSimilar=[];items.forEach(function(v){var un=cleanArtistName(v.name);if(!isRealArtistName(un))return;if(un.toLowerCase().indexOf(fn)>=0)return;if(simSimilar.indexOf(un)<0)simSimilar.push(un);});}catch(e){}if(simSimilar.length<3){var picks=CURATED_SIMILAR[key];if(picks)simSimilar=picks.slice();}if(simSimilar.length>0){q=simSimilar[0]+' official video';}else{q=cleanBase+' hits';}}else if(simQIdx===3){var vibe=detectVibeKey(simTitle);var pick=vibe?pickVibeArtist(vibe):'';if(pick)q=pick+' songs';else if(simSimilar.length>1)q=simSimilar[1]+' songs';else q=cleanBase+' hits';}else{var vibe2=detectVibeKey(simTitle);if(simQIdx<10&&vibe2){var pick2=pickVibeArtist(vibe2);q=pick2?pick2+' songs':cleanBase+' hits';}else if(simSimilar.length>0){var ai=(simQIdx-4)%simSimilar.length;q=simSimilar[ai]+' songs';}else{q=cleanBase+' hits';}}simQIdx++;try{var d=await pget('/search?q='+encodeURIComponent(q)+'&filter=videos');var items=(d.items||[]).filter(function(v){return v.url&&isRealSong(v);});var c=document.getElementById('similarGrid');if(!c){simLoading=false;return;}if(simPool.length===0)c.innerHTML='';items.forEach(function(v){if(simPool.length>=500)return;var vid=(v.url||'').replace('/watch?v=','');if(simPool.some(function(x){return x.id===vid;}))return;var obj={id:vid,title:v.title,uploaderName:v.uploaderName,thumbnail:v.thumbnail};simPool.push(obj);var ix=simPool.length-1;var el=document.createElement('div');el.className='similar-card';el.onclick=function(){playQueue=simPool.map(function(x){return{id:{videoId:x.id},snippet:{title:x.title,channelTitle:x.uploaderName,thumbnails:{default:{url:x.thumbnail},high:{url:x.thumbnail}}}};});ytResults=playQueue;playYoutube(ix);};el.innerHTML='<div class="similar-card-img"><img src="'+obj.thumbnail+'"></div><div class="similar-card-title">'+obj.title+'</div><div class="similar-card-artist">'+obj.uploaderName+'</div>';c.appendChild(el);});}catch(e){}simLoading=false;}
function onYouTubeIframeAPIReady(){
try{
ytPlayer=new YT.Player('youtube-player',{
height:'100%',width:'100%',
playerVars:{playsinline:1,controls:0,autoplay:1},
events:{
onReady:function(){ytReady=true;},
onStateChange:function(e){
if(e.data===1){isPlaying=true;updateAllIcons();}
else if(e.data===2){isPlaying=false;updateAllIcons();}
else if(e.data===0){
if(repeatMode===2){ytPlayer.seekTo(0);ytPlayer.playVideo();}
else{nextTrack();}
}
}
}
});
}catch(err){console.log('YT init failed',err);}
}
function ensurePlayer(vid,tries){tries=tries||0;if(ytReady&&ytPlayer&&typeof ytPlayer.loadVideoById==='function'){try{ytPlayer.loadVideoById(vid);ytPlayer.playVideo();}catch(e){}isPlaying=true;updateAllIcons();return;}if(tries<40)setTimeout(function(){ensurePlayer(vid,tries+1);},200);}
function setTrackInfo(art,title,artist){document.getElementById('miniArt').src=art;document.getElementById('miniTitle').textContent=title;document.getElementById('miniArtist').textContent=artist;document.getElementById('fullArt').src=art;document.getElementById('fullTitle').textContent=title;document.getElementById('fullArtist').textContent=artist;document.getElementById('miniPlayer').classList.add('active');}
function playDbSong(i){currentSource='db';currentIndex=i;if(ytPlayer&&ytPlayer.pauseVideo)ytPlayer.pauseVideo();var yp=document.getElementById('youtube-player');var fa=document.getElementById('fullArt');if(yp)yp.style.display='none';if(fa)fa.style.display='block';var s=songs[i];if(!s)return;setTrackInfo(s.cover_art_url||'https://via.placeholder.com/150',s.title,s.artist_name);var p=document.getElementById('audioPlayer');p.src=s.audio_url;p.playbackRate=playbackSpeed;p.play();isPlaying=true;updateAllIcons();}
function playYoutube(i){currentSource='youtube';currentIndex=i;document.getElementById('audioPlayer').pause();var yp=document.getElementById('youtube-player');var fa=document.getElementById('fullArt');if(yp)yp.style.display='block';if(fa)fa.style.display='none';var t=ytResults[i];if(!t)return;setTrackInfo(t.snippet.thumbnails.high.url,t.snippet.title,t.snippet.channelTitle);ensurePlayer(t.id.videoId);simPool=[];simSimilar=[];simTitle=t.snippet.title;simQIdx=0;document.getElementById('similarGrid').innerHTML='';for(var k=0;k<5;k++)loadSimilarSongs();}
function playFromQueue(vid){var idx=playQueue.findIndex(function(t){return t.id&&t.id.videoId===vid;});if(idx<0)return;ytResults=playQueue;playYoutube(idx);}
function togglePlay(){if(currentSource==='youtube'){if(!ytReady||!ytPlayer)return;try{if(isPlaying){ytPlayer.pauseVideo();isPlaying=false;}else{ytPlayer.playVideo();isPlaying=true;}updateAllIcons();}catch(e){}}else{var p=document.getElementById('audioPlayer');if(!p.src)return;if(isPlaying){p.pause();isPlaying=false;}else{p.play();isPlaying=true;}updateAllIcons();}}
function updateAllIcons(){var sh=isPlaying?'none':'block',hd=isPlaying?'block':'none';['miniPlayIcon','fullPlayIcon'].forEach(function(id){var e=document.getElementById(id);if(e)e.style.display=sh;});['miniPauseIcon','fullPauseIcon'].forEach(function(id){var e=document.getElementById(id);if(e)e.style.display=hd;});}
function nextTrack(){if(currentSource==='db'&&songs.length>0){currentIndex=isShuffle?Math.floor(Math.random()*songs.length):(currentIndex+1)%songs.length;playDbSong(currentIndex);}else if(currentSource==='youtube'&&ytResults.length>0){currentIndex=isShuffle?Math.floor(Math.random()*ytResults.length):(currentIndex+1)%ytResults.length;playYoutube(currentIndex);}}
function prevTrack(){if(currentSource==='db'&&songs.length>0){currentIndex=(currentIndex-1+songs.length)%songs.length;playDbSong(currentIndex);}else if(currentSource==='youtube'&&ytResults.length>0){currentIndex=(currentIndex-1+ytResults.length)%ytResults.length;playYoutube(currentIndex);}}
function toggleShuffle(){isShuffle=!isShuffle;document.getElementById('shuffleBtn').classList.toggle('active',isShuffle);}
function toggleRepeat(){repeatMode=(repeatMode+1)%3;var b=document.getElementById('repeatBtn');b.classList.remove('active');if(repeatMode>=1)b.classList.add('active');}
function toggleSpeed(){var s=[0.5,1,1.5,2];var i=s.indexOf(playbackSpeed);playbackSpeed=s[(i+1)%s.length];document.getElementById('speedLabel').textContent=playbackSpeed+'x';if(currentSource==='db')document.getElementById('audioPlayer').playbackRate=playbackSpeed;else if(ytReady&&ytPlayer&&ytPlayer.setPlaybackRate)ytPlayer.setPlaybackRate(playbackSpeed);}
function toggleLikeCurrent(){document.getElementById('fullHeart').style.fill='#ff4d4d';}
function dlId(vid){if(!vid)return;try{navigator.clipboard.writeText('https://www.youtube.com/watch?v='+vid);}catch(e){}window.location.href='https://youtubegrab.com';}
function downloadCurrent(){var t=null;if(currentSource==='youtube')t=ytResults[currentIndex];else t=songs[currentIndex];if(!t)return alert('No song playing');var vid=t.id?t.id.videoId:t.id;if(!vid)return;dlId(vid);}
function playHeroSong(){if(songs.length>0)playDbSong(0);else switchTab('search',document.querySelectorAll('.nav-item')[1]);}
function openFullPlayer(){document.getElementById('fullPlayer').classList.add('active');}
function closeFullPlayer(){document.getElementById('fullPlayer').classList.remove('active');}
function mainSearchGo(){var q=document.getElementById('mainSearchInput').value.trim();if(!q)return;switchTab('search',document.querySelectorAll('.nav-item')[1]);document.getElementById('ytSearchInput').value=q;searchYouTube();}
async function searchYouTube(q,targetId){var query=typeof q==='string'?q:document.getElementById('ytSearchInput').value.trim();if(!query)return;var cid=targetId||'ytResults',c=document.getElementById(cid);if(!c)return;c.innerHTML='<p style="color:#666;text-align:center;padding:20px">Searching...</p>';try{var d=await pget('/search?q='+encodeURIComponent(query)+'&filter=videos');var items=(d.items||[]).filter(function(v){return v.url&&isRealSong(v);}).slice(0,30);ytResults=items.map(function(v){return{id:{videoId:(v.url||'').replace('/watch?v=','')},snippet:{title:v.title,channelTitle:v.uploaderName,thumbnails:{default:{url:v.thumbnail},high:{url:v.thumbnail}}}};});playQueue=ytResults;c.innerHTML='';ytResults.forEach(function(t){var el=document.createElement('div');el.className='list-item';el.onclick=function(){playFromQueue(t.id.videoId);};el.innerHTML='<img src="'+t.snippet.thumbnails.default.url+'"><div class="list-info"><div class="list-title">'+t.snippet.title+'</div><div class="list-sub">'+t.snippet.channelTitle+'</div></div><button class="dl-btn" onclick="event.stopPropagation();dlId(\''+t.id.videoId+'\')"><svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg></button>';c.appendChild(el);});}catch(x){c.innerHTML='<p style="color:#ff5555;text-align:center;padding:20px">Search failed</p>';}}
function renderRecentlyPlayed(){var c=document.getElementById('recentlyPlayed');if(!c)return;c.innerHTML='';if(songs.length===0){c.innerHTML='<p style="color:#666;font-size:.75rem">Upload songs to see them here.</p>';return;}songs.slice(0,8).forEach(function(s){var el=document.createElement('div');el.className='card';el.onclick=function(){playDbSong(songs.indexOf(s));};el.innerHTML='<div class="card-img"><img src="'+(s.cover_art_url||'https://via.placeholder.com/150')+'"></div><div class="card-title">'+s.title+'</div><div class="card-sub">'+s.artist_name+'</div>';c.appendChild(el);});}
document.getElementById('audioPlayer').addEventListener('ended',function(){if(repeatMode===2){this.currentTime=0;this.play();}else nextTrack();});
document.getElementById('fullProgress').addEventListener('input',function(e){if(currentSource==='db'){var p=document.getElementById('audioPlayer');if(p.duration)p.currentTime=(e.target.value/100)*p.duration;}else if(ytReady&&ytPlayer&&ytPlayer.getDuration)ytPlayer.seekTo((e.target.value/100)*ytPlayer.getDuration(),true);});
setInterval(function(){var cur=0,dur=0;if(currentSource==='db'){var p=document.getElementById('audioPlayer');cur=p.currentTime||0;dur=p.duration||0;}else if(ytReady&&ytPlayer&&ytPlayer.getCurrentTime){cur=ytPlayer.getCurrentTime()||0;dur=ytPlayer.getDuration()||0;}if(dur>0){var pct=(cur/dur)*100;document.getElementById('fullProgress').value=pct;document.getElementById('fullCurrent').textContent=fmt(cur);document.getElementById('fullDuration').textContent=fmt(dur);}},1000);
function fmt(s){if(isNaN(s))return'0:00';var m=Math.floor(s/60);var sec=Math.floor(s%60);return m+':'+(sec<10?'0':'')+sec;}
var tx=0,ab=document.getElementById('fullArtBox');
ab.addEventListener('touchstart',function(e){tx=e.changedTouches[0].screenX;},{passive:true});
ab.addEventListener('touchend',function(e){var dx=e.changedTouches[0].screenX-tx;if(dx<-50)nextTrack();if(dx>50)prevTrack();},{passive:true});
document.getElementById('mainContent').addEventListener('scroll',function(){var st=this.scrollTop;if(st+this.clientHeight>=this.scrollHeight-300){var ht=document.getElementById('tab-home');if(ht&&ht.style.display!=='none'&&!homeLoading&&homePool.length<400)loadHomeMore();var mt=document.getElementById('tab-mixtape');if(mt&&mt.style.display!=='none'&&!mixLoading&&mixPool.length<300)loadMixtapes();var at=document.getElementById('tab-artists');if(at&&at.style.display!=='none'&&!artistLoading&&artistPool.length<400)loadArtistsNext();var gt=document.getElementById('tab-genres');if(gt&&gt.style.display!=='none'&&!genreLoading&&genrePool.length<1000)loadGenreMore();}});
document.getElementById('fullContent').addEventListener('scroll',function(){if(this.scrollTop+this.clientHeight>=this.scrollHeight-200&&currentSource==='youtube'&&!simLoading&&simPool.length<500)loadSimilarSongs();});
document.getElementById('artistModal').addEventListener('scroll',function(){if(this.scrollTop+this.clientHeight>=this.scrollHeight-200&&!artistSongLoading&&artistSongPool.length<200)loadMoreArtistSongs();});
var _holdIv=null;
function _findTarget(){var fpl=document.getElementById('fullPlayer');var fc=document.getElementById('fullContent');var am=document.getElementById('artistModal');var mc=document.getElementById('mainContent');if(fpl&&fpl.classList.contains('active')&&fc)return fc;if(am&&am.classList.contains('active'))return am;return mc;}
window.startHold=function(e){if(e&&e.preventDefault)e.preventDefault();if(_holdIv)clearInterval(_holdIv);var t=_findTarget();if(!t)return;_holdIv=setInterval(function(){if(t.scrollTop<=0){clearInterval(_holdIv);_holdIv=null;return;}t.scrollTop=Math.max(0,t.scrollTop-55);},25);};
window.stopHold=function(){if(_holdIv){clearInterval(_holdIv);_holdIv=null;}};
function bindHoldBtn(){var b=document.getElementById('bttBtn');if(!b||b._bound)return;b._bound=true;b.addEventListener('touchstart',window.startHold,{passive:false});b.addEventListener('touchend',window.stopHold);b.addEventListener('touchcancel',window.stopHold);b.addEventListener('mousedown',window.startHold);b.addEventListener('mouseup',window.stopHold);b.addEventListener('mouseleave',window.stopHold);b.addEventListener('contextmenu',function(e){e.preventDefault();});}
document.addEventListener('touchmove',window.stopHold,{passive:true});
document.addEventListener('touchend',window.stopHold);


document.addEventListener('DOMContentLoaded', function() {
    // Physically move the youtube-player div inside the fullArtBox
    var yp = document.getElementById('youtube-player');
    var fab = document.getElementById('fullArtBox');
    if (yp && fab) {
        fab.appendChild(yp);
    }

    // Override playYoutube to show video
    window.playYoutube = function(i) {
        currentSource = 'youtube';
        currentIndex = i;
        var ap = document.getElementById('audioPlayer');
        if(ap) ap.pause();
        var t = ytResults[i];
        if (!t) return;
        var yp = document.getElementById('youtube-player');
        var fa = document.getElementById('fullArt');
        if (yp) yp.style.display = 'block';
        if (fa) fa.style.display = 'none';
        setTrackInfo(t.snippet.thumbnails.high.url, t.snippet.title, t.snippet.channelTitle);
        ensurePlayer(t.id.videoId);
        simPool = []; simSimilar = []; simTitle = t.snippet.title; simQIdx = 0;
        var sg = document.getElementById('similarGrid');
        if(sg) sg.innerHTML = '';
        for (var k = 0; k < 5; k++) loadSimilarSongs();
    };

    // Override playDbSong to show album art
    window.playDbSong = function(i) {
        currentSource = 'db';
        currentIndex = i;
        if (ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo();
        var yp = document.getElementById('youtube-player');
        var fa = document.getElementById('fullArt');
        if (yp) yp.style.display = 'none';
        if (fa) fa.style.display = 'block';
        var s = songs[i];
        if (!s) return;
        setTrackInfo(s.cover_art_url || 'https://via.placeholder.com/150', s.title, s.artist_name);
        var p = document.getElementById('audioPlayer');
        p.src = s.audio_url;
        p.playbackRate = playbackSpeed;
        p.play();
        isPlaying = true;
        updateAllIcons();
    };
});


document.addEventListener('DOMContentLoaded', function() {
    // Physically move the youtube-player div inside the fullArtBox to trap it
    var yp = document.getElementById('youtube-player');
    var fab = document.getElementById('fullArtBox');
    if (yp && fab) { fab.appendChild(yp); }

    window.playYoutube = function(i) {
        currentSource = 'youtube';
        currentIndex = i;
        var ap = document.getElementById('audioPlayer');
        if(ap) ap.pause();
        var t = ytResults[i];
        if (!t) return;
        var yp = document.getElementById('youtube-player');
        var fa = document.getElementById('fullArt');
        if (yp) yp.style.display = 'block';
        if (fa) fa.style.display = 'none';
        setTrackInfo(t.snippet.thumbnails.high.url, t.snippet.title, t.snippet.channelTitle);
        ensurePlayer(t.id.videoId);
        simPool = []; simSimilar = []; simTitle = t.snippet.title; simQIdx = 0;
        var sg = document.getElementById('similarGrid');
        if(sg) sg.innerHTML = '';
        for (var k = 0; k < 5; k++) loadSimilarSongs();
    };

    window.playDbSong = function(i) {
        currentSource = 'db';
        currentIndex = i;
        if (ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo();
        var yp = document.getElementById('youtube-player');
        var fa = document.getElementById('fullArt');
        if (yp) yp.style.display = 'none';
        if (fa) fa.style.display = 'block';
        var s = songs[i];
        if (!s) return;
        setTrackInfo(s.cover_art_url || 'https://via.placeholder.com/150', s.title, s.artist_name);
        var p = document.getElementById('audioPlayer');
        p.src = s.audio_url;
        p.playbackRate = playbackSpeed;
        p.play();
        isPlaying = true;
        updateAllIcons();
    };
});


document.addEventListener('DOMContentLoaded', function() {
    var fab = document.getElementById('fullArtBox');
    var fsBtn = document.getElementById('fsOverlayBtn');
    var yp = document.getElementById('youtube-player');
    var fa = document.getElementById('fullArt');

    if (yp && fab) { fab.appendChild(yp); }
    if (fsBtn && fab) { fab.appendChild(fsBtn); }

    // ONLY toggle fullscreen when the button is clicked
    if (fsBtn) {
        fsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var isFull = fab.classList.contains('is-fullscreen');
            if (!isFull) {
                fab.classList.add('is-fullscreen');
                if (fab.requestFullscreen) fab.requestFullscreen();
            } else {
                fab.classList.remove('is-fullscreen');
                if (document.exitFullscreen) document.exitFullscreen();
            }
        });
    }

    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) fab.classList.remove('is-fullscreen');
    });

    // Show video when YouTube plays
    var originalPlayYoutube = window.playYoutube;
    window.playYoutube = function(i) {
        if (originalPlayYoutube) originalPlayYoutube(i);
        if (yp) yp.style.display = 'block';
        if (fa) fa.style.display = 'none';
        if (fsBtn) fsBtn.style.display = 'block';
    };

    // Show art when local song plays
    var originalPlayDbSong = window.playDbSong;
    window.playDbSong = function(i) {
        if (originalPlayDbSong) originalPlayDbSong(i);
        if (yp) yp.style.display = 'none';
        if (fa) fa.style.display = 'block';
        if (fsBtn) fsBtn.style.display = 'none';
        fab.classList.remove('is-fullscreen');
    };
});

// Override YouTube initialization to auto-shuffle from Similar Songs
window.onYouTubeIframeAPIReady = function() {
    ytPlayer = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        playerVars: {
            playsinline: 1,
            controls: 1, // Enable controls so you can pause by tapping
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
            enablejsapi: 1
        },
        events: {
            'onReady': function() { ytReady = true; },
            'onStateChange': function(e) {
                if (e.data === 1) { // Playing
                    isPlaying = true; updateAllIcons();
                } else if (e.data === 2) { // Paused
                    isPlaying = false; updateAllIcons();
                } else if (e.data === 0) { // ENDED
                    // Auto-shuffle from Similar Songs!
                    if (window.simPool && window.simPool.length > 0) {
                        var ri = Math.floor(Math.random() * window.simPool.length);
                        window.ytResults = window.simPool.map(function(x) {
                            return {
                                id: { videoId: x.id },
                                snippet: {
                                    title: x.title,
                                    channelTitle: x.uploaderName,
                                    thumbnails: { default: { url: x.thumbnail }, high: { url: x.thumbnail } }
                                }
                            };
                        });
                        window.playQueue = window.ytResults;
                        window.playYoutube(ri);
                    } else {
                        if (typeof nextTrack === 'function') nextTrack();
                    }
                }
            }
        }
    });
};


document.addEventListener('DOMContentLoaded', function() {
    var fab = document.getElementById('fullArtBox');
    var fsBtn = document.getElementById('fsOverlayBtn');
    var yp = document.getElementById('youtube-player');
    var fa = document.getElementById('fullArt');

    if (yp && fab) { fab.appendChild(yp); }
    if (fsBtn && fab) { fab.appendChild(fsBtn); }

    // ONLY the ⛶ button toggles fullscreen (no accidental fullscreen on video tap)
    if (fsBtn) {
        fsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var isFull = fab.classList.contains('is-fullscreen');
            if (!isFull) {
                fab.classList.add('is-fullscreen');
                if (fab.requestFullscreen) fab.requestFullscreen();
            } else {
                fab.classList.remove('is-fullscreen');
                if (document.exitFullscreen) document.exitFullscreen();
            }
        });
    }

    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) fab.classList.remove('is-fullscreen');
    });

    var originalPlayYoutube = window.playYoutube;
    window.playYoutube = function(i) {
        if (originalPlayYoutube) originalPlayYoutube(i);
        if (yp) yp.style.display = 'block';
        if (fa) fa.style.display = 'none';
        if (fsBtn) fsBtn.style.display = 'block';
    };

    var originalPlayDbSong = window.playDbSong;
    window.playDbSong = function(i) {
        if (originalPlayDbSong) originalPlayDbSong(i);
        if (yp) yp.style.display = 'none';
        if (fa) fa.style.display = 'block';
        if (fsBtn) fsBtn.style.display = 'none';
        fab.classList.remove('is-fullscreen');
    };
});

// INTERCEPT YOUTUBE END SCREEN
window.onYouTubeIframeAPIReady = function() {
    ytPlayer = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        playerVars: {
            playsinline: 1,
            controls: 1,
            autoplay: 1,
            rel: 0, // Kills YouTube's "More Videos" end screen
            modestbranding: 1,
            enablejsapi: 1
        },
        events: {
            'onReady': function() { ytReady = true; },
            'onStateChange': function(e) {
                if (e.data === 1) { 
                    isPlaying = true; updateAllIcons();
                } else if (e.data === 2) { 
                    isPlaying = false; updateAllIcons();
                } else if (e.data === 0) { 
                    // VIDEO ENDED! 
                    // Instead of shuffling the MAIN queue, we grab a random song from SIMILAR SONGS
                    if (window.simPool && window.simPool.length > 0) {
                        // Pick a random song from Similar Songs (Mixed)
                        var randomIndex = Math.floor(Math.random() * window.simPool.length);
                        
                        // Temporarily set the queue to Similar Songs so "Next" goes through them
                        window.ytResults = window.simPool.map(function(x) {
                            return {
                                id: { videoId: x.id },
                                snippet: {
                                    title: x.title,
                                    channelTitle: x.uploaderName,
                                    thumbnails: { default: { url: x.thumbnail }, high: { url: x.thumbnail } }
                                }
                            };
                        });
                        window.playQueue = window.ytResults;
                        
                        // Play the random Similar Song
                        window.playYoutube(randomIndex);
                    } else {
                        // Fallback if no Similar Songs are loaded yet
                        if (typeof nextTrack === 'function') nextTrack();
                    }
                }
            }
        }
    });
};




document.addEventListener('DOMContentLoaded', function() {
    // Find all possible back buttons
    var backBtns = document.querySelectorAll('#backBtn, .back-btn, .back-button, [onclick*="back"], [onclick*="close"], #closeArtistModal, #closeFullPlayer');
    
    // The SVG arrow
    var arrowSVG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>';

    backBtns.forEach(function(btn) {
        // Only add the arrow if it doesn't already have one
        if (!btn.querySelector('svg')) {
            btn.innerHTML = arrowSVG + ' ' + btn.innerHTML;
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    var fullPlayer = document.getElementById('fullPlayer');
    if (!fullPlayer) return;

    var ambientBg = document.createElement('div');
    ambientBg.id = 'fullPlayerAmbient';
    fullPlayer.insertBefore(ambientBg, fullPlayer.firstChild);

    function updateFullPlayerBg(imageUrl) {
        if (!imageUrl) return;
        ambientBg.style.backgroundImage = 'url(' + imageUrl + ')';
    }

    var originalPlayYoutube = window.playYoutube;
    window.playYoutube = function(i) {
        if (originalPlayYoutube) originalPlayYoutube(i);
        var t = window.ytResults[i];
        if (t && t.id && t.id.videoId) {
            // USE TINY THUMBNAIL (320x180) FOR BLUR - ZERO LAG
            var imgUrl = 'https://img.youtube.com/vi/' + t.id.videoId + '/mqdefault.jpg';
            updateFullPlayerBg(imgUrl);
        }
    };

    var originalPlayDbSong = window.playDbSong;
    window.playDbSong = function(i) {
        if (originalPlayDbSong) originalPlayDbSong(i);
        var s = window.songs[i];
        if (s && s.cover_art_url) {
            updateFullPlayerBg(s.cover_art_url);
        } else {
            ambientBg.style.backgroundImage = 'none';
        }
    };
});


document.addEventListener('DOMContentLoaded', function() {
    var miniPlayer = document.getElementById('miniPlayer');
    
    // Hook into openFullPlayer
    var originalOpenFullPlayer = window.openFullPlayer;
    window.openFullPlayer = function() {
        if (originalOpenFullPlayer) originalOpenFullPlayer();
        if (miniPlayer) {
            miniPlayer.style.display = 'none'; // Hide the mini player
        }
    };

    // Hook into closeFullPlayer
    var originalCloseFullPlayer = window.closeFullPlayer;
    window.closeFullPlayer = function() {
        if (originalCloseFullPlayer) originalCloseFullPlayer();
        if (miniPlayer) {
            // Only show the mini player if a song is actually playing/loaded
            if (miniPlayer.classList.contains('active')) {
                miniPlayer.style.display = 'flex'; // Bring it back
            }
        }
    };
});


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js');
  });
}


document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('downloadApkBtn');
    if (!btn) return;
    var isInApp = /wv/.test(navigator.userAgent) || window.location.protocol === 'file:' || (window.Android && typeof window.Android !== 'undefined');
    if (isInApp) {
        btn.style.display = 'none';
    } else {
        btn.style.display = 'flex';
    }
});








// SMART BACK BTN
(function() {
    function initBackButton() {
        // Inject CSS directly
        if (!document.getElementById('backBtnStyle')) {
            var style = document.createElement('style');
            style.id = 'backBtnStyle';
            style.textContent = `
                #backBtnSmart {
                    display: none;
                    position: fixed;
                    bottom: 90px;
                    right: 15px;
                    z-index: 999999;
                    background: rgba(0, 0, 0, 0.88);
                    border: 1px solid rgba(255, 255, 255, 0.25);
                    border-radius: 50%;
                    width: 52px;
                    height: 52px;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    transition: all 0.2s ease;
                }
                #backBtnSmart:active {
                    transform: scale(0.9);
                    background: rgba(0, 224, 208, 0.35);
                    border-color: #00e0d0;
                }
                #backBtnSmart svg {
                    width: 24px;
                    height: 24px;
                    fill: #fff;
                }
            `;
            document.head.appendChild(style);
        }

        // Create the button
        if (!document.getElementById('backBtnSmart')) {
            var btn = document.createElement('div');
            btn.id = 'backBtnSmart';
            btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>';
            document.body.appendChild(btn);

            // Smart back behavior
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();

                // 1. Close artist modal
                var artistModal = document.getElementById('artistModal');
                if (artistModal && artistModal.classList.contains('active')) {
                    if (typeof window.closeArtistModal === 'function') window.closeArtistModal();
                    else artistModal.classList.remove('active');
                    return;
                }

                // 2. Close full player
                var fullPlayer = document.getElementById('fullPlayer');
                if (fullPlayer && fullPlayer.classList.contains('active')) {
                    if (typeof window.closeFullPlayer === 'function') window.closeFullPlayer();
                    else fullPlayer.classList.remove('active');
                    return;
                }

                // 3. Go back to Home tab
                var navItems = document.querySelectorAll('.nav-item');
                if (navItems.length > 0) navItems[0].click();
            };
        }

        // Intercept hardware back button
        history.pushState({page: 'app'}, '', '');
        window.addEventListener('popstate', function() {
            var backBtn = document.getElementById('backBtnSmart');
            if (backBtn) {
                backBtn.click();
                history.pushState({page: 'app'}, '', '');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackButton);
    } else {
        initBackButton();
    }
})();
// END SMART BACK BTN





// UPDATE BTN
(function() {
    function initUpdateButton() {
        var now = Date.now();
        var DAY_MS = 24 * 60 * 60 * 1000;

        // Check the lock state
        var state = JSON.parse(localStorage.getItem('biUpdateBtnState') || '{}');

        // If we're in a 2-day lock, don't show the button at all
        if (state.lockUntil && now < state.lockUntil) {
            console.log('[UpdateBtn] Locked until', new Date(state.lockUntil).toLocaleString());
            return;
        }

        // --- CSS ---
        if (!document.getElementById('updateBtnStyle')) {
            var style = document.createElement('style');
            style.id = 'updateBtnStyle';
            style.textContent = `
                #updateBtnSmart {
                    display: none;
                    position: fixed;
                    bottom: 90px;
                    right: 15px;
                    z-index: 999998;
                    background: linear-gradient(135deg, #00e0d0, #008f85);
                    color: #000;
                    border: none;
                    border-radius: 30px;
                    padding: 12px 20px;
                    font-size: 13px;
                    font-weight: bold;
                    cursor: pointer;
                    box-shadow: 0 6px 20px rgba(0, 224, 208, 0.5);
                    align-items: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                }
                #updateBtnSmart.show { display: flex; animation: pulseUpdate 2s infinite; }
                @keyframes pulseUpdate {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                #updateBtnSmart:active { transform: scale(0.95); }
                #updateBtnSmart svg { width: 16px; height: 16px; fill: #000; }
            `;
            document.head.appendChild(style);
        }

        // --- Create the button ---
        if (!document.getElementById('updateBtnSmart')) {
            var btn = document.createElement('button');
            btn.id = 'updateBtnSmart';
            btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg> Update Available';
            document.body.appendChild(btn);

            btn.onclick = function() {
                // Lock the button for 2 days
                var s = JSON.parse(localStorage.getItem('biUpdateBtnState') || '{}');
                s.lockUntil = Date.now() + (2 * DAY_MS);
                localStorage.setItem('biUpdateBtnState', JSON.stringify(s));

                btn.innerHTML = '⏳ Updating...';
                btn.disabled = true;

                setTimeout(function() {
                    window.location.href = window.location.pathname + '?update=' + Date.now();
                }, 400);
            };
        }

        // --- Show only when inside an artist profile ---
        setInterval(function() {
            var btn = document.getElementById('updateBtnSmart');
            if (!btn) return;

            // Re-check lock in case it was set
            var s = JSON.parse(localStorage.getItem('biUpdateBtnState') || '{}');
            if (s.lockUntil && Date.now() < s.lockUntil) {
                btn.classList.remove('show');
                return;
            }

            var artistModal = document.getElementById('artistModal');
            if (artistModal && artistModal.classList.contains('active')) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        }, 400);

        console.log('[UpdateBtn] Loaded. Shows in artist profile. Locks for 2 days after tap.');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUpdateButton);
    } else {
        initUpdateButton();
    }
})();
// END UPDATE BTN


// WELCOME NOTE
(function() {
    function initWelcomeNote() {
        // Only show ONCE per app restart (uses sessionStorage, so it resets when app closes)
        if (sessionStorage.getItem('biWelcomeShown') === 'true') return;

        // Inject CSS
        if (!document.getElementById('welcomeNoteStyle')) {
            var style = document.createElement('style');
            style.id = 'welcomeNoteStyle';
            style.textContent = `
                #welcomeOverlay {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100vw; height: 100vh;
                    z-index: 9999999;
                    background: rgba(0, 0, 0, 0.75);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    box-sizing: border-box;
                    opacity: 0;
                    animation: welcomeFadeIn 0.5s ease forwards;
                }
                @keyframes welcomeFadeIn {
                    to { opacity: 1; }
                }
                @keyframes welcomeFadeOut {
                    to { opacity: 0; }
                }
                #welcomePanel {
                    width: 100%;
                    max-width: 380px;
                    background: linear-gradient(135deg, rgba(0, 224, 208, 0.15), rgba(0, 143, 133, 0.08));
                    backdrop-filter: blur(30px);
                    -webkit-backdrop-filter: blur(30px);
                    border: 1px solid rgba(0, 224, 208, 0.4);
                    border-radius: 24px;
                    padding: 28px 22px 22px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 40px rgba(0, 224, 208, 0.2);
                    transform: translateY(30px) scale(0.95);
                    opacity: 0;
                    animation: welcomePanelIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
                    max-height: 90vh;
                    overflow-y: auto;
                }
                @keyframes welcomePanelIn {
                    to { transform: translateY(0) scale(1); opacity: 1; }
                }
                .welcome-logo {
                    text-align: center;
                    font-size: 32px;
                    font-weight: 900;
                    color: #00e0d0;
                    text-shadow: 0 0 25px rgba(0, 224, 208, 0.8);
                    margin-bottom: 6px;
                    letter-spacing: 1px;
                }
                .welcome-sub {
                    text-align: center;
                    font-size: 12px;
                    color: #aaa;
                    margin-bottom: 22px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }
                .welcome-tip {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    background: rgba(0, 0, 0, 0.35);
                    border: 1px solid rgba(0, 224, 208, 0.15);
                    border-radius: 14px;
                    padding: 12px 14px;
                    margin-bottom: 10px;
                }
                .welcome-tip-icon {
                    font-size: 22px;
                    flex-shrink: 0;
                    line-height: 1;
                }
                .welcome-tip-text {
                    flex: 1;
                    color: #e0e0e0;
                    font-size: 13px;
                    line-height: 1.5;
                }
                .welcome-tip-text b {
                    color: #00e0d0;
                }
                #welcomeDismissBtn {
                    width: 100%;
                    margin-top: 18px;
                    padding: 16px;
                    font-size: 15px;
                    font-weight: 900;
                    color: #000;
                    background: linear-gradient(135deg, #00e0d0, #008f85);
                    border: none;
                    border-radius: 14px;
                    cursor: pointer;
                    letter-spacing: 0.5px;
                    box-shadow: 0 8px 25px rgba(0, 224, 208, 0.5);
                    animation: bounceBtn 1.4s ease-in-out infinite;
                    transform-origin: center;
                }
                #welcomeDismissBtn:active {
                    transform: scale(0.95);
                }
                @keyframes bounceBtn {
                    0%   { transform: scale(1);    box-shadow: 0 8px 25px rgba(0, 224, 208, 0.5); }
                    50%  { transform: scale(1.08); box-shadow: 0 12px 35px rgba(0, 224, 208, 0.8); }
                    100% { transform: scale(1);    box-shadow: 0 8px 25px rgba(0, 224, 208, 0.5); }
                }
            `;
            document.head.appendChild(style);
        }

        // Create the overlay
        var overlay = document.createElement('div');
        overlay.id = 'welcomeOverlay';
        overlay.innerHTML = `
            <div id="welcomePanel">
                <div class="welcome-logo">B.I MUSIC</div>
                <div class="welcome-sub">Welcome to the vibe</div>

                <div class="welcome-tip">
                    <div class="welcome-tip-icon">⬇️</div>
                    <div class="welcome-tip-text">Tap the <b>Download</b> button on any song. The link is copied automatically — just paste it on the page that opens.</div>
                </div>

                <div class="welcome-tip">
                    <div class="welcome-tip-icon">◀️</div>
                    <div class="welcome-tip-text">Use the black <b>Back Button</b> at the bottom-right to return to the previous page. It works everywhere.</div>
                </div>

                <div class="welcome-tip">
                    <div class="welcome-tip-icon">💚</div>
                    <div class="welcome-tip-text">Enjoying <b>B.I Music</b>? Share it with your friends and spread the vibe!</div>
                </div>

                <button id="welcomeDismissBtn">🎧 GOT IT — LET'S GO</button>
            </div>
        `;
        document.body.appendChild(overlay);

        // Mark as shown (per session)
        sessionStorage.setItem('biWelcomeShown', 'true');

        // Dismiss handler
        var dismissBtn = document.getElementById('welcomeDismissBtn');
        dismissBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            overlay.style.animation = 'welcomeFadeOut 0.4s ease forwards';
            setTimeout(function() {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 400);
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initWelcomeNote, 500);
        });
    } else {
        setTimeout(initWelcomeNote, 500);
    }
})();
// END WELCOME NOTE








// INFO NOTE
(function() {
    function injectStyle() {
        if (document.getElementById('infoNoteStyle')) return;
        var style = document.createElement('style');
        style.id = 'infoNoteStyle';
        style.textContent = `
            /* Info button — bottom-left, above the scroll button */
            #infoNoteBtn {
                display: none;
                position: fixed;
                top: 15px;
                right: 15px;
                z-index: 999997;
                background: rgba(0, 224, 208, 0.15);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                border: 1px solid rgba(0, 224, 208, 0.5);
                border-radius: 50%;
                width: 42px;
                height: 42px;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 18px rgba(0,0,0,0.7), 0 0 20px rgba(0,224,208,0.3);
                transition: all 0.2s ease;
                color: #00e0d0;
                font-size: 22px;
                font-weight: 900;
                font-family: Georgia, serif;
                font-style: italic;
                line-height: 1;
            }
            #infoNoteBtn:active { transform: scale(0.9); background: rgba(0,224,208,0.4); }
            #infoNoteBtn.show { display: flex; }

            /* The panel */
            #infoNoteOverlay {
                display: none;
                position: fixed;
                top: 0; left: 0;
                width: 100vw; height: 100vh;
                z-index: 99999999;
                background: rgba(0, 0, 0, 0.75);
                backdrop-filter: blur(25px);
                -webkit-backdrop-filter: blur(25px);
                align-items: center;
                justify-content: center;
                padding: 16px;
                box-sizing: border-box;
                opacity: 0;
                transition: opacity 0.35s ease;
                overflow-y: auto;
            }
            #infoNoteOverlay.show { display: flex; opacity: 1; }

            #infoNotePanel {
                width: 100%;
                max-width: 400px;
                background: linear-gradient(135deg, rgba(0, 224, 208, 0.15), rgba(0, 143, 133, 0.06));
                backdrop-filter: blur(40px);
                -webkit-backdrop-filter: blur(40px);
                border: 1px solid rgba(0, 224, 208, 0.4);
                border-radius: 26px;
                padding: 26px 22px 22px;
                box-shadow: 0 25px 70px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 50px rgba(0, 224, 208, 0.15);
                transform: translateY(30px) scale(0.95);
                opacity: 0;
                animation: infoPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s forwards;
                max-height: 92vh;
                overflow-y: auto;
                box-sizing: border-box;
            }
            @keyframes infoPop {
                to { transform: translateY(0) scale(1); opacity: 1; }
            }

            .info-logo {
                text-align: center;
                font-size: 30px;
                font-weight: 900;
                color: #00e0d0;
                text-shadow: 0 0 30px rgba(0, 224, 208, 0.8);
                letter-spacing: 1px;
                margin-bottom: 4px;
            }
            .info-tagline {
                text-align: center;
                font-size: 11px;
                color: #00e0d0;
                opacity: 0.85;
                letter-spacing: 2.5px;
                text-transform: uppercase;
                margin-bottom: 22px;
                font-weight: bold;
            }

            .info-block {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                background: rgba(0, 0, 0, 0.35);
                border: 1px solid rgba(0, 224, 208, 0.18);
                border-radius: 14px;
                padding: 13px 14px;
                margin-bottom: 10px;
            }
            .info-icon {
                font-size: 22px;
                flex-shrink: 0;
                line-height: 1.2;
                filter: drop-shadow(0 0 8px rgba(0, 224, 208, 0.5));
            }
            .info-text {
                flex: 1;
                font-size: 13px;
                line-height: 1.55;
                color: #d0d0d0;
            }
            .info-text b {
                color: #00e0d0;
                display: block;
                font-size: 13.5px;
                margin-bottom: 4px;
                letter-spacing: 0.3px;
            }
            .info-text a {
                color: #00e0d0;
                text-decoration: underline;
                word-break: break-all;
                font-weight: bold;
            }

            .info-footer {
                text-align: center;
                font-size: 12px;
                color: #aaa;
                margin: 16px 0 4px 0;
                line-height: 1.6;
            }
            .info-footer .heart { color: #00e0d0; }

            #infoNoteCloseBtn {
                width: 100%;
                margin-top: 16px;
                padding: 16px;
                font-size: 15px;
                font-weight: 900;
                color: #000;
                background: linear-gradient(135deg, #00e0d0, #008f85);
                border: none;
                border-radius: 14px;
                cursor: pointer;
                letter-spacing: 1.5px;
                box-shadow: 0 10px 30px rgba(0, 224, 208, 0.5);
                animation: infoPulse 1.6s ease-in-out infinite;
                text-transform: uppercase;
                font-family: inherit;
            }
            #infoNoteCloseBtn:active { transform: scale(0.96); }
            @keyframes infoPulse {
                0%   { transform: scale(1);    box-shadow: 0 10px 30px rgba(0, 224, 208, 0.5); }
                50%  { transform: scale(1.04); box-shadow: 0 14px 40px rgba(0, 224, 208, 0.9); }
                100% { transform: scale(1);    box-shadow: 0 10px 30px rgba(0, 224, 208, 0.5); }
            }
        `;
        document.head.appendChild(style);
    }

    function injectElements() {
        if (!document.getElementById('infoNoteBtn')) {
            var btn = document.createElement('div');
            btn.id = 'infoNoteBtn';
            btn.innerHTML = 'i';
            btn.title = 'Info';
            document.body.appendChild(btn);
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                openInfoNote();
            };
        }
        if (!document.getElementById('infoNoteOverlay')) {
            var overlay = document.createElement('div');
            overlay.id = 'infoNoteOverlay';
            overlay.innerHTML = `
                <div id="infoNotePanel">
                    <div class="info-logo">B.I MUSIC</div>
                    <div class="info-tagline">Cooking something new every day</div>

                    <div class="info-block">
                        <div class="info-icon">⬇️</div>
                        <div class="info-text">
                            <b>Want to download songs?</b>
                            Downloads are only available on our <b style="display:inline;">website</b> for now. Head there, tap a song, and download it directly.<br><br>
                            🌐 <span style="word-break:break-all;">djsky577-maker.github.io/BIMusic</span>
                            <button onclick="copyInfoLink(event)" id="copyInfoBtn" style="display:block;margin-top:10px;padding:8px 16px;background:rgba(0,224,208,0.2);color:#00e0d0;border:1px solid rgba(0,224,208,0.5);border-radius:20px;font-size:12px;font-weight:bold;cursor:pointer;font-family:inherit;letter-spacing:0.5px;">📋 COPY LINK</button>
                            <div style="font-size:11px;color:#888;margin-top:6px;line-height:1.4;">Then paste it in your browser.</div>
                        </div>
                    </div>

                    <div class="info-block">
                        <div class="info-icon">⚠️</div>
                        <div class="info-text">
                            <b>Inside the app, downloads aren't ready yet.</b>
                            But don't worry — <b style="display:inline;">streaming works perfectly</b>. Play any song, anytime, unlimited.
                        </div>
                    </div>

                    <div class="info-block">
                        <div class="info-icon">🎉</div>
                        <div class="info-text">
                            <b>Stay with us.</b>
                            We're adding new features all the time. Thank you for being part of the B.I Music family. <span class="heart">💚</span>
                        </div>
                    </div>

                    <button id="infoNoteCloseBtn">🔥 Keep Streaming</button>
                </div>
            `;
            document.body.appendChild(overlay);

            document.getElementById('infoNoteCloseBtn').onclick = closeInfoNote;
            overlay.onclick = function(e) {
                if (e.target === overlay) closeInfoNote();
            };
        }
    }

    function openInfoNote() {
        var overlay = document.getElementById('infoNoteOverlay');
        if (overlay) overlay.classList.add('show');
    }
    function closeInfoNote() {
        var overlay = document.getElementById('infoNoteOverlay');
        if (overlay) overlay.classList.remove('show');
    }

    function init() {
        injectStyle();
        injectElements();

        // Show the info button only when logged in (main content visible)
        setInterval(function() {
            var btn = document.getElementById('infoNoteBtn');
            if (!btn) return;
            var authView = document.getElementById('view-auth');
            var isLoggedIn = !authView || authView.style.display === 'none' || !authView.classList.contains('active');
            var homeTab = document.getElementById('tab-home');
            var isOnApp = homeTab && homeTab.offsetParent !== null;
            // Only show on home tab (not in full player or artist modal)
            var fullPlayer = document.getElementById('fullPlayer');
            var artistModal = document.getElementById('artistModal');
            var inFullPlayer = fullPlayer && fullPlayer.classList.contains('active');
            var inArtistModal = artistModal && artistModal.classList.contains('active');

            if (isOnApp && !inFullPlayer && !inArtistModal) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        }, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.openInfoNote = openInfoNote;
    window.closeInfoNote = closeInfoNote;
})();
// END INFO NOTE





// INFO LINK COPY
(function() {
    window.copyInfoLink = function(e) {
        if (e) e.preventDefault();
        var url = 'https://djsky577-maker.github.io/BIMusic/';
        var btn = document.getElementById('copyInfoBtn');

        function markCopied() {
            if (!btn) return;
            var originalText = btn.innerHTML;
            btn.innerHTML = '✅ COPIED!';
            btn.style.background = 'rgba(0,224,208,0.5)';
            btn.style.color = '#000';
            setTimeout(function() {
                btn.innerHTML = originalText;
                btn.style.background = 'rgba(0,224,208,0.2)';
                btn.style.color = '#00e0d0';
            }, 2000);
        }

        // Modern clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(markCopied, function() {
                fallbackCopy(url, markCopied);
            });
        } else {
            fallbackCopy(url, markCopied);
        }
    };

    function fallbackCopy(text, onSuccess) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, 99999);
        try {
            document.execCommand('copy');
            if (onSuccess) onSuccess();
        } catch(e) {
            alert('Copy this link: ' + text);
        }
        document.body.removeChild(ta);
    }
})();
// END INFO LINK COPY

// PROFILE UPDATE BUTTON
(function() {
    window.triggerProfileUpdate = function() {
        var btn = document.getElementById('profileUpdateBtn');
        if (btn) {
            btn.innerHTML = '⏳ Checking for updates...';
            btn.disabled = true;
            btn.style.opacity = '0.7';
        }
        // Force hard reload with cache-busting timestamp
        setTimeout(function() {
            window.location.href = window.location.pathname + '?update=' + Date.now();
        }, 800);
    };
})();
// END PROFILE UPDATE BUTTON


// LYRICS FEATURE
(function() {
    function injectStyle() {
        if (document.getElementById('lyricsFeatureStyle')) return;
        var style = document.createElement('style');
        style.id = 'lyricsFeatureStyle';
        style.textContent = `
            #lyricsBtnActive {
                display: none;
                position: fixed;
                bottom: 155px;
                right: 15px;
                z-index: 999997;
                background: rgba(0, 224, 208, 0.15);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                border: 1px solid rgba(0, 224, 208, 0.5);
                border-radius: 50%;
                width: 52px;
                height: 52px;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 18px rgba(0,0,0,0.7), 0 0 20px rgba(0,224,208,0.3);
                transition: all 0.2s ease;
            }
            #lyricsBtnActive:active { transform: scale(0.9); background: rgba(0,224,208,0.4); }
            #lyricsBtnActive svg { width: 26px; height: 26px; fill: #00e0d0; }
            #lyricsBtnActive.show { display: flex; }

            #lyricsPanelActive {
                position: fixed;
                left: 0; right: 0; bottom: 0;
                top: 380px;
                z-index: 9999996;
                display: none;
                flex-direction: column;
                background: rgba(0, 0, 0, 0.72);
                backdrop-filter: blur(30px) saturate(180%);
                -webkit-backdrop-filter: blur(30px) saturate(180%);
                border-top: 1px solid rgba(0, 224, 208, 0.45);
                box-shadow: 0 -8px 40px rgba(0,0,0,0.8), 0 0 30px rgba(0,224,208,0.15);
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.35s ease, transform 0.35s ease;
                overflow: hidden;
            }
            #lyricsPanelActive.show { display: flex; opacity: 1; transform: translateY(0); }

            #lyricsHeaderActive {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 14px 20px 12px 20px;
                border-bottom: 1px solid rgba(0, 224, 208, 0.15);
                flex-shrink: 0;
            }
            #lyricsTitleActive {
                color: #00e0d0;
                font-size: 13px;
                font-weight: bold;
                letter-spacing: 1px;
                text-transform: uppercase;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-shadow: 0 0 15px rgba(0,224,208,0.6);
                flex: 1;
                margin-right: 10px;
            }
            #lyricsCloseActive {
                width: 34px; height: 34px;
                border-radius: 50%;
                background: rgba(0,0,0,0.5);
                border: 1px solid rgba(255,255,255,0.2);
                color: #fff;
                display: flex; align-items: center; justify-content: center;
                font-size: 16px;
                cursor: pointer;
                flex-shrink: 0;
            }
            #lyricsCloseActive:active { background: rgba(0,224,208,0.35); }

            #lyricsBodyActive {
                flex: 1;
                overflow-y: auto;
                padding: 10px 16px 20px 16px;
                -webkit-overflow-scrolling: touch;
            }
            #lyricsBodyActive::-webkit-scrollbar { display: none; }

            .lyr-video-row {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px;
                margin-bottom: 8px;
                background: rgba(20, 20, 20, 0.75);
                border: 1px solid rgba(0, 224, 208, 0.15);
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .lyr-video-row:active {
                background: rgba(0, 224, 208, 0.2);
                border-color: #00e0d0;
                transform: scale(0.98);
            }
            .lyr-video-row img {
                width: 80px;
                height: 60px;
                border-radius: 6px;
                object-fit: cover;
                flex-shrink: 0;
            }
            .lyr-video-info { flex: 1; overflow: hidden; }
            .lyr-video-title {
                font-size: 12px;
                color: #fff;
                font-weight: bold;
                line-height: 1.3;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .lyr-video-channel {
                font-size: 10px;
                color: #888;
                margin-top: 3px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .lyr-play-icon {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background: #00e0d0;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            .lyr-play-icon svg { width: 14px; height: 14px; fill: #000; margin-left: 1px; }
            #lyricsBodyActive .lyr-msg {
                color: #aaa;
                font-style: italic;
                font-size: 14px;
                text-align: center;
                padding: 40px 20px;
            }
        `;
        document.head.appendChild(style);
    }

    function injectElements() {
        if (!document.getElementById('lyricsBtnActive')) {
            var btn = document.createElement('div');
            btn.id = 'lyricsBtnActive';
            btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z"/></svg>';
            document.body.appendChild(btn);
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                openLyrics();
            };
        }
        if (!document.getElementById('lyricsPanelActive')) {
            var panel = document.createElement('div');
            panel.id = 'lyricsPanelActive';
            panel.innerHTML = `
                <div id="lyricsHeaderActive">
                    <div id="lyricsTitleActive">Lyric Videos</div>
                    <div id="lyricsCloseActive">✕</div>
                </div>
                <div id="lyricsBodyActive">
                    <div class="lyr-msg">Loading lyric videos...</div>
                </div>
            `;
            document.body.appendChild(panel);
            document.getElementById('lyricsCloseActive').onclick = function(e) {
                e.stopPropagation();
                closeLyrics();
            };
        }
    }

    function openLyrics() {
        var panel = document.getElementById('lyricsPanelActive');
        if (!panel) return;
        panel.classList.add('show');
        searchLyrics();
    }

    function closeLyrics() {
        var panel = document.getElementById('lyricsPanelActive');
        if (panel) panel.classList.remove('show');
    }

    function getCurrentSong() {
        var title = '', artist = '';

        // 1. Try live YouTube player
        try {
            if (window.ytPlayer && typeof window.ytPlayer.getVideoData === 'function') {
                var vd = window.ytPlayer.getVideoData();
                if (vd && vd.title) {
                    title = vd.title;
                    artist = vd.author || '';
                }
            }
        } catch(e) {}

        // 2. Try ytResults
        if (!title && window.ytResults && window.ytResults[window.currentIndex]) {
            var t = window.ytResults[window.currentIndex];
            if (t.snippet) {
                title = t.snippet.title || '';
                artist = t.snippet.channelTitle || '';
            }
        }

        // 3. Try playQueue
        if (!title && window.playQueue && window.playQueue[window.currentIndex]) {
            var t2 = window.playQueue[window.currentIndex];
            if (t2.snippet) {
                title = t2.snippet.title || '';
                artist = t2.snippet.channelTitle || '';
            }
        }

        // 4. Try local songs
        if (!title && window.songs && window.songs[window.currentIndex]) {
            title = window.songs[window.currentIndex].title || '';
            artist = window.songs[window.currentIndex].artist_name || '';
        }

        // 5. Try mini player
        if (!title) {
            var mt = document.getElementById('miniTitle');
            var ma = document.getElementById('miniArtist');
            if (mt && mt.textContent) title = mt.textContent;
            if (ma && ma.textContent) artist = ma.textContent;
        }

        return { title: title, artist: artist };
    }

    async function searchLyrics() {
        var body = document.getElementById('lyricsBodyActive');
        var titleEl = document.getElementById('lyricsTitleActive');

        var song = getCurrentSong();
        var title = song.title;
        var artist = song.artist;

        console.log('[Lyrics] Current song:', title, '-', artist);

        if (!title) {
            body.innerHTML = '<div class="lyr-msg">Play a song first to find lyric videos 🎧</div>';
            return;
        }

        // Clean up title
        var cleanTitle = title.replace(/official|video|lyrics|lyric|audio|music|hd|4k|ft\.|feat\.|\(.*?\)|\[.*?\]/gi, '').trim();
        var cleanArtist = (artist || '').replace(/vevo|topic|official|- topic/gi, '').trim();

        // If no clean title, use original
        if (!cleanTitle) cleanTitle = title;
        if (!cleanArtist) cleanArtist = artist;

        var query = (cleanArtist ? cleanArtist + ' ' : '') + cleanTitle + ' lyrics';

        titleEl.textContent = '🎤 ' + cleanTitle.substring(0, 30);
        body.innerHTML = '<div class="lyr-msg">🔍 Searching for lyric videos...</div>';

        try {
            // Use the same pget function the rest of the app uses
            var pget = window.pget;
            if (!pget) {
                body.innerHTML = '<div class="lyr-msg">⚠️ Search not available.</div>';
                return;
            }

            var d = await pget('/search?q=' + encodeURIComponent(query) + '&filter=videos');
            var items = (d.items || []).filter(function(v) { return v.url && v.title; }).slice(0, 20);

            if (items.length === 0) {
                body.innerHTML = '<div class="lyr-msg">😕 No lyric videos found for this song.</div>';
                return;
            }

            body.innerHTML = '';
            items.forEach(function(v, idx) {
                var vid = (v.url || '').replace('/watch?v=', '');
                var row = document.createElement('div');
                row.className = 'lyr-video-row';
                row.innerHTML = `
                    <img src="${v.thumbnail || ''}" onerror="this.style.opacity='0.3'">
                    <div class="lyr-video-info">
                        <div class="lyr-video-title">${(v.title || '').replace(/</g, '&lt;')}</div>
                        <div class="lyr-video-channel">${(v.uploaderName || 'Unknown').replace(/</g, '&lt;')}</div>
                    </div>
                    <div class="lyr-play-icon"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
                `;
                row.onclick = function() {
                    closeLyrics();
                    var newQueue = items.map(function(x) {
                        return {
                            id: { videoId: (x.url || '').replace('/watch?v=', '') },
                            snippet: {
                                title: x.title,
                                channelTitle: x.uploaderName || '',
                                thumbnails: {
                                    default: { url: x.thumbnail },
                                    high: { url: x.thumbnail }
                                }
                            }
                        };
                    });
                    window.ytResults = newQueue;
                    window.playQueue = newQueue;
                    var playIdx = newQueue.findIndex(function(t) { return t.id.videoId === vid; });
                    if (playIdx < 0) playIdx = 0;
                    if (typeof window.playYoutube === 'function') window.playYoutube(playIdx);
                };
                body.appendChild(row);
            });
        } catch(err) {
            body.innerHTML = '<div class="lyr-msg">⚠️ Could not load lyric videos. Check your internet.</div>';
        }
    }

    function init() {
        injectStyle();
        injectElements();

        // Show lyrics button only when full player is active
        setInterval(function() {
            var btn = document.getElementById('lyricsBtnActive');
            if (!btn) return;
            var fp = document.getElementById('fullPlayer');
            if (fp && fp.classList.contains('active')) btn.classList.add('show');
            else {
                btn.classList.remove('show');
                closeLyrics();
            }
        }, 400);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.openLyrics = openLyrics;
    window.closeLyrics = closeLyrics;
})();
// END LYRICS FEATURE


// RECENTLY PLAYED
(function() {
    var RECENT_KEY = 'bi_recently_played';
    var MAX_RECENT = 8;

    // ========== STORAGE ==========
    function getRecent() {
        try {
            var raw = localStorage.getItem(RECENT_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch(e) { return []; }
    }

    function saveRecent(list) {
        try {
            localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, MAX_RECENT)));
        } catch(e) {}
    }

    // ========== ADD A SONG TO RECENT ==========
    window.addToRecentlyPlayed = function(song) {
        if (!song || !song.id) return;

        var list = getRecent();

        // Remove duplicate (if already exists), then add to top
        list = list.filter(function(s) { return s.id !== song.id; });
        list.unshift({
            id: song.id,
            title: song.title || 'Unknown',
            artist: song.artist || 'Unknown',
            thumbnail: song.thumbnail || '',
            source: song.source || 'youtube',
            playedAt: Date.now()
        });

        // Limit to 8
        list = list.slice(0, MAX_RECENT);
        saveRecent(list);

        // Instantly re-render
        renderRecent();
    };

    // ========== RENDER THE RECENT SECTION ==========
    function renderRecent() {
        var container = document.getElementById('recentlyPlayed');
        if (!container) return;

        var list = getRecent();

        if (list.length === 0) {
            container.innerHTML = '<p style="color:#666;font-size:12px;padding:10px 0;">🎧 Play a song to see it here.</p>';
            return;
        }

        container.innerHTML = '';
        list.forEach(function(s) {
            var card = document.createElement('div');
            card.className = 'card';
            card.style.cssText = 'flex:0 0 auto;width:130px;cursor:pointer;';
            card.innerHTML = '<div class="card-img"><img src="' + (s.thumbnail || 'https://via.placeholder.com/150') + '" onerror="this.src=\'https://via.placeholder.com/150\'"></div><div class="card-title">' + (s.title || 'Unknown').replace(/</g, '&lt;') + '</div><div class="card-sub">' + (s.artist || 'Unknown').replace(/</g, '&lt;') + '</div>';

            card.onclick = function() {
                // Play this song
                var mock = {
                    id: { videoId: s.id },
                    snippet: {
                        title: s.title,
                        channelTitle: s.artist,
                        thumbnails: {
                            default: { url: s.thumbnail },
                            high: { url: s.thumbnail }
                        }
                    }
                };
                window.ytResults = [mock];
                window.playQueue = window.ytResults;
                if (typeof window.playYoutube === 'function') window.playYoutube(0);
            };
            container.appendChild(card);
        });
    }

    // ========== HOOK INTO PLAY FUNCTIONS ==========
    function hookPlayYoutube() {
        var original = window.playYoutube;
        if (!original || original._hooked) return;
        window.playYoutube = function(i) {
            original(i);
            try {
                var t = window.ytResults && window.ytResults[i];
                if (t && t.id && t.id.videoId) {
                    window.addToRecentlyPlayed({
                        id: t.id.videoId,
                        title: t.snippet.title || '',
                        artist: t.snippet.channelTitle || '',
                        thumbnail: (t.snippet.thumbnails && t.snippet.thumbnails.high && t.snippet.thumbnails.high.url) || '',
                        source: 'youtube'
                    });
                }
            } catch(e) {}
        };
        window.playYoutube._hooked = true;
    }

    function hookPlayDbSong() {
        var original = window.playDbSong;
        if (!original || original._hooked) return;
        window.playDbSong = function(i) {
            original(i);
            try {
                var s = window.songs && window.songs[i];
                if (s && s.id) {
                    window.addToRecentlyPlayed({
                        id: s.id,
                        title: s.title || '',
                        artist: s.artist_name || '',
                        thumbnail: s.cover_art_url || '',
                        source: 'db'
                    });
                }
            } catch(e) {}
        };
        window.playDbSong._hooked = true;
    }

    // ========== INIT ==========
    function init() {
        // Render whatever is already saved
        renderRecent();

        // Hook into play functions (with retry, in case they load later)
        var tries = 0;
        var hookInterval = setInterval(function() {
            hookPlayYoutube();
            hookPlayDbSong();
            tries++;
            if (tries > 20) clearInterval(hookInterval); // stop after 10 seconds
        }, 500);

        // Also re-render on visibility change (when user comes back to the app)
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) renderRecent();
        });

        console.log('[Recently Played] Ready.');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 1500); });
    } else {
        setTimeout(init, 1500);
    }

    // Also expose renderRecent for external calls
    window.renderRecentlyPlayed = renderRecent;
})();
// END RECENTLY PLAYED


// FOR YOU UPGRADE
(function() {
    var FY_POOL = [
        'Drake', 'Taylor Swift', 'The Weeknd', 'Ed Sheeran',
        'Burna Boy', 'Wizkid', 'Davido', 'Tems', 'Asake',
        'Rema', 'Fireboy DML', 'Joeboy', 'SZA', 'Doja Cat',
        'Post Malone', 'Billie Eilish', 'Ariana Grande',
        'Bruno Mars', 'Chris Brown', 'Rihanna', 'Beyoncé',
        'Kendrick Lamar', 'Travis Scott', 'Nicki Minaj',
        'Ruger', 'BNXN', 'Omah Lay', 'Ayra Starr', 'Tyla',
        'J. Cole', 'Future', 'Lil Baby', 'Adekunle Gold',
        'Kizz Daniel', 'Olamide', 'Tiwa Savage', 'Yemi Alade'
    ];

    var BAD_WORDS = ['nonstop','non stop','non-stop','playlist','mix','megamix','dj mix','mixtape','1 hour','2 hour','3 hour','hour loop','compilation','jukebox','continuous','endless','vol.','full album','all songs','best of playlist','video songs'];

    function isRealSong(title) {
        if (!title) return false;
        var t = title.toLowerCase();
        for (var i = 0; i < BAD_WORDS.length; i++) {
            if (t.indexOf(BAD_WORDS[i]) >= 0) return false;
        }
        if (title.length > 90) return false;
        if (/\d+\s*(hour|hr)/i.test(t)) return false;
        if ((title.match(/\|/g) || []).length >= 3) return false;
        return true;
    }

    async function loadForYouFresh() {
        var container = document.getElementById('forYou');
        if (!container) return;

        // Skeleton loading state
        container.innerHTML = '<p style="color:#666;font-size:12px;padding:10px 0;">🎧 Loading fresh picks...</p>';

        try {
            // Pick 6 random artists each time
            var shuffled = FY_POOL.slice().sort(function() { return Math.random() - 0.5; });
            var picked = shuffled.slice(0, 6);
            var allSongs = [];

            // Fetch songs from each artist
            for (var i = 0; i < picked.length; i++) {
                try {
                    var d = await window.pget('/search?q=' + encodeURIComponent(picked[i] + ' official video') + '&filter=videos');
                    var items = (d.items || []).filter(function(v) { return v.url && v.title && isRealSong(v.title); });
                    // Take 5 songs per artist
                    items.slice(0, 5).forEach(function(v) {
                        allSongs.push({
                            id: (v.url || '').replace('/watch?v=', ''),
                            title: v.title,
                            artist: v.uploaderName || picked[i],
                            thumbnail: v.thumbnail
                        });
                    });
                } catch(e) {}
            }

            // Remove duplicates
            var seen = {};
            var unique = [];
            allSongs.forEach(function(s) {
                if (!seen[s.id]) { seen[s.id] = true; unique.push(s); }
            });

            if (unique.length === 0) {
                container.innerHTML = '<p style="color:#666;font-size:12px;padding:10px 0;">No songs right now.</p>';
                return;
            }

            // Shuffle and take up to 30
            unique.sort(function() { return Math.random() - 0.5; });
            var final = unique.slice(0, 30);

            // Render with the SAME style as Trending
            container.innerHTML = '';
            container.style.cssText = 'display:flex;gap:12px;overflow-x:auto;padding:4px 0 12px 0;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;';
            container.classList.add('foryou-scroll');

            // Add scrollbar hide style once
            if (!document.getElementById('foryou-scroll-style')) {
                var s = document.createElement('style');
                s.id = 'foryou-scroll-style';
                s.textContent = '.foryou-scroll::-webkit-scrollbar{display:none;} .foryou-card{flex:0 0 auto;width:150px;scroll-snap-align:start;background:rgba(20,20,20,0.7);backdrop-filter:blur(15px);-webkit-backdrop-filter:blur(15px);border:1px solid rgba(0,224,208,0.2);border-radius:14px;overflow:hidden;cursor:pointer;transition:all 0.3s ease;box-shadow:0 4px 15px rgba(0,0,0,0.5);position:relative;} .foryou-card:active{transform:scale(0.95);border-color:#00e0d0;box-shadow:0 8px 25px rgba(0,224,208,0.3);} .foryou-thumb-wrap{position:relative;width:100%;height:150px;overflow:hidden;} .foryou-thumb-wrap img{width:100%;height:100%;object-fit:cover;display:block;} .foryou-rank{position:absolute;top:8px;left:8px;background:linear-gradient(135deg,#00e0d0,#008f85);color:#000;font-weight:900;font-size:12px;padding:3px 8px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.6);z-index:2;} .foryou-play-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.9) 0%,transparent 50%);display:flex;align-items:flex-end;justify-content:flex-end;padding:8px;} .foryou-play-icon{width:34px;height:34px;border-radius:50%;background:#00e0d0;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 10px rgba(0,224,208,0.6);} .foryou-play-icon svg{width:16px;height:16px;fill:#000;margin-left:2px;} .foryou-info{padding:8px 10px 10px 10px;} .foryou-title{color:#fff;font-size:12px;font-weight:bold;line-height:1.25;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;margin-bottom:4px;} .foryou-artist{color:#888;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}';
                document.head.appendChild(s);
            }

            final.forEach(function(s, idx) {
                var card = document.createElement('div');
                card.className = 'foryou-card';
                card.innerHTML = '<div class="foryou-thumb-wrap"><div class="foryou-rank">#' + (idx + 1) + '</div><img src="' + (s.thumbnail || '') + '" onerror="this.style.opacity=\'0.3\'"><div class="foryou-play-overlay"><div class="foryou-play-icon"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div></div><div class="foryou-info"><div class="foryou-title">' + (s.title || '').replace(/</g, '&lt;') + '</div><div class="foryou-artist">' + (s.artist || '').replace(/</g, '&lt;') + '</div></div>';

                card.onclick = function() {
                    var newQueue = final.map(function(x) {
                        return {
                            id: { videoId: x.id },
                            snippet: {
                                title: x.title,
                                channelTitle: x.artist,
                                thumbnails: { default: { url: x.thumbnail }, high: { url: x.thumbnail } }
                            }
                        };
                    });
                    window.ytResults = newQueue;
                    window.playQueue = newQueue;
                    if (typeof window.playYoutube === 'function') window.playYoutube(idx);
                };
                container.appendChild(card);
            });

            console.log('[For You] Loaded ' + final.length + ' fresh songs.');
        } catch(err) {
            container.innerHTML = '<p style="color:#ff5555;font-size:12px;padding:10px 0;">Could not load songs.</p>';
        }
    }

    // Override the original loadForYou function
    window.loadForYou = loadForYouFresh;
    window.refreshForYou = loadForYouFresh;

    // Trigger on load, after the app is ready
    function init() {
        setTimeout(function() {
            var forYou = document.getElementById('forYou');
            if (forYou) {
                window.loadForYou();
            }
        }, 3000);

        // Also refresh when the app becomes visible again (user returns to app)
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                // Refresh For You every time the app comes back to focus
                setTimeout(function() {
                    if (typeof window.refreshForYou === 'function') window.refreshForYou();
                }, 1000);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
// END FOR YOU UPGRADE











// SLEEP TIMER V3
(function() {
    var sleepEndTime = null;
    var sleepCountdownInterval = null;
    var currentSleepMinutes = null;
    var popupUpdateInterval = null;

    function injectStyle() {
        if (document.getElementById('sleepTimerStyleV3')) return;
        var style = document.createElement('style');
        style.id = 'sleepTimerStyleV3';
        style.textContent = `
            #sleepBackdrop {
                display: none;
                position: fixed;
                top: 0; left: 0;
                width: 100vw; height: 100vh;
                z-index: 99999998;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(4px);
            }
            #sleepBackdrop.show { display: block; }
            #sleepTimerPopup {
                display: none;
                position: fixed;
                top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                z-index: 99999999;
                background: rgba(15, 15, 15, 0.97);
                backdrop-filter: blur(30px);
                -webkit-backdrop-filter: blur(30px);
                border: 1.5px solid rgba(0, 224, 208, 0.6);
                border-radius: 20px;
                padding: 24px 20px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.9), 0 0 50px rgba(0,224,208,0.4);
                min-width: 280px;
                text-align: center;
                animation: sleepPopIn 0.3s ease;
            }
            @keyframes sleepPopIn {
                from { opacity: 0; transform: translate(-50%, -45%); }
                to { opacity: 1; transform: translate(-50%, -50%); }
            }
            #sleepTimerPopup.show { display: block; }
            .sleep-title {
                color: #00e0d0;
                font-size: 16px;
                font-weight: 900;
                letter-spacing: 1px;
                text-transform: uppercase;
                margin-bottom: 12px;
                text-shadow: 0 0 15px rgba(0,224,208,0.6);
            }
            #sleepStatus {
                display: block;
                color: #fff;
                font-size: 13px;
                padding: 10px;
                margin-bottom: 14px;
                background: rgba(0, 224, 208, 0.1);
                border-radius: 10px;
                border: 1px solid rgba(0, 224, 208, 0.3);
            }
            #sleepStatus.active {
                background: rgba(0, 224, 208, 0.25);
                border-color: #00e0d0;
                color: #00e0d0;
                font-weight: bold;
                animation: statusPulse 1.5s ease-in-out infinite;
            }
            @keyframes statusPulse {
                0%, 100% { box-shadow: 0 0 8px rgba(0,224,208,0.3); }
                50%      { box-shadow: 0 0 20px rgba(0,224,208,0.7); }
            }
            .sleep-opt {
                display: block;
                width: 100%;
                padding: 12px;
                margin-bottom: 8px;
                background: rgba(0, 224, 208, 0.1);
                border: 1px solid rgba(0, 224, 208, 0.3);
                border-radius: 10px;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                font-family: inherit;
                transition: all 0.2s ease;
            }
            .sleep-opt:active {
                background: rgba(0, 224, 208, 0.3);
                border-color: #00e0d0;
            }
            .sleep-opt.active-opt {
                background: linear-gradient(135deg, #00e0d0, #008f85) !important;
                color: #000 !important;
                border-color: #00e0d0 !important;
                box-shadow: 0 0 20px rgba(0, 224, 208, 0.7) !important;
            }
            .sleep-test {
                background: rgba(255, 200, 0, 0.1) !important;
                border-color: rgba(255, 200, 0, 0.4) !important;
                color: #ffcc00 !important;
                font-size: 12px !important;
            }
            .sleep-cancel {
                background: rgba(255, 77, 77, 0.15) !important;
                border-color: rgba(255, 77, 77, 0.4) !important;
                color: #ff5555 !important;
                margin-top: 10px;
                margin-bottom: 0;
            }
        `;
        document.head.appendChild(style);
    }

    function injectPopup() {
        if (document.getElementById('sleepBackdrop')) return;

        // Backdrop (invisible full-screen catcher)
        var backdrop = document.createElement('div');
        backdrop.id = 'sleepBackdrop';
        document.body.appendChild(backdrop);
        backdrop.onclick = window.closeSleepPopup;

        // Popup
        var popup = document.createElement('div');
        popup.id = 'sleepTimerPopup';
        popup.innerHTML = `
            <div class="sleep-title">😴 Sleep Timer</div>
            <div id="sleepStatus">No timer set</div>
            <button class="sleep-opt" data-min="15" onclick="window.setSleepTimer(15)">15 minutes</button>
            <button class="sleep-opt" data-min="30" onclick="window.setSleepTimer(30)">30 minutes</button>
            <button class="sleep-opt" data-min="60" onclick="window.setSleepTimer(60)">60 minutes</button>
            <button class="sleep-opt sleep-test" data-min="0.16" onclick="window.setSleepTimer(0.16)">⚡ Test (10 seconds)</button>
            <button class="sleep-opt sleep-cancel" onclick="window.cancelSleepTimer()">✕ Cancel Timer</button>
        `;
        document.body.appendChild(popup);
        popup.addEventListener('click', function(e) { e.stopPropagation(); });
    }

    function updatePopupState() {
        var statusEl = document.getElementById('sleepStatus');
        var buttons = document.querySelectorAll('.sleep-opt[data-min]');
        if (!statusEl) return;

        if (sleepEndTime) {
            var remaining = sleepEndTime - Date.now();
            if (remaining <= 0) { statusEl.textContent = 'No timer set'; statusEl.classList.remove('active'); return; }
            var mins = Math.floor(remaining / 60000);
            var secs = Math.floor((remaining % 60000) / 1000);
            var timeText = mins > 0 ? (mins + 'm ' + secs + 's') : (secs + 's');
            statusEl.textContent = '⏰ Timer active — ' + timeText + ' left';
            statusEl.classList.add('active');
            buttons.forEach(function(b) {
                if (parseFloat(b.dataset.min) === currentSleepMinutes) b.classList.add('active-opt');
                else b.classList.remove('active-opt');
            });
        } else {
            statusEl.textContent = 'No timer set';
            statusEl.classList.remove('active');
            buttons.forEach(function(b) { b.classList.remove('active-opt'); });
        }
    }

    window.openSleepPopup = function() {
        injectPopup();
        var p = document.getElementById('sleepTimerPopup');
        var b = document.getElementById('sleepBackdrop');
        if (p) {
            updatePopupState();
            p.classList.add('show');
            if (b) b.classList.add('show');
            if (popupUpdateInterval) clearInterval(popupUpdateInterval);
            popupUpdateInterval = setInterval(function() {
                var p2 = document.getElementById('sleepTimerPopup');
                if (!p2 || !p2.classList.contains('show')) {
                    clearInterval(popupUpdateInterval);
                    popupUpdateInterval = null;
                    return;
                }
                updatePopupState();
            }, 1000);
        }
    };

    window.closeSleepPopup = function() {
        var p = document.getElementById('sleepTimerPopup');
        var b = document.getElementById('sleepBackdrop');
        if (p) p.classList.remove('show');
        if (b) b.classList.remove('show');
        if (popupUpdateInterval) { clearInterval(popupUpdateInterval); popupUpdateInterval = null; }
    };

    window.setSleepTimer = function(minutes) {
        window.cancelSleepTimer();
        currentSleepMinutes = minutes;
        sleepEndTime = Date.now() + (minutes * 60 * 1000);
        var btn = document.getElementById('sleepBtn');
        if (btn) { btn.classList.add('active'); btn.title = 'Sleep in ' + minutes + ' min'; }
        sleepCountdownInterval = setInterval(function() {
            var remaining = sleepEndTime - Date.now();
            if (remaining <= 0) { triggerSleep(); return; }
            var mins = Math.floor(remaining / 60000);
            var secs = Math.floor((remaining % 60000) / 1000);
            var btn2 = document.getElementById('sleepBtn');
            if (btn2) btn2.title = 'Sleep in ' + mins + 'm ' + secs + 's';
            updatePopupState();
        }, 1000);
        showToast('😴 Sleep timer set for ' + (minutes < 1 ? Math.round(minutes * 60) + ' seconds' : minutes + ' minutes'));
        window.closeSleepPopup();
    };

    window.cancelSleepTimer = function() {
        if (sleepCountdownInterval) { clearInterval(sleepCountdownInterval); sleepCountdownInterval = null; }
        sleepEndTime = null;
        currentSleepMinutes = null;
        var btn = document.getElementById('sleepBtn');
        if (btn) { btn.classList.remove('active'); btn.title = 'Sleep Timer'; }
        updatePopupState();
    };

    function triggerSleep() {
        var steps = 20, stepMs = 500, step = 0;
        if (window.ytPlayer && typeof window.ytPlayer.setVolume === 'function') {
            var fadeIv = setInterval(function() {
                step++;
                var vol = Math.max(0, 100 - Math.round((step / steps) * 100));
                try { window.ytPlayer.setVolume(vol); } catch(e) {}
                if (step >= steps) {
                    clearInterval(fadeIv);
                    try { window.ytPlayer.pauseVideo(); } catch(e) {}
                    try { window.ytPlayer.setVolume(100); } catch(e) {}
                }
            }, stepMs);
        } else {
            var ap = document.getElementById('audioPlayer');
            if (ap) {
                var startVol = ap.volume;
                var fadeIv2 = setInterval(function() {
                    step++;
                    var vol = Math.max(0, startVol - ((step / steps) * startVol));
                    try { ap.volume = vol; } catch(e) {}
                    if (step >= steps) {
                        clearInterval(fadeIv2);
                        try { ap.pause(); } catch(e) {}
                        try { ap.volume = startVol; } catch(e) {}
                    }
                }, stepMs);
            }
        }
        window.cancelSleepTimer();
        showToast('😴 Sleep timer ended. Music stopped.');
    }

    function showToast(msg) {
        var old = document.getElementById('sleepToast');
        if (old) old.parentNode.removeChild(old);
        var toast = document.createElement('div');
        toast.id = 'sleepToast';
        toast.textContent = msg;
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#00e0d0,#008f85);color:#000;font-weight:bold;font-size:13px;padding:12px 20px;border-radius:25px;z-index:99999999;box-shadow:0 10px 30px rgba(0,224,208,0.6);opacity:0;transition:opacity 0.3s ease;max-width:90vw;text-align:center;';
        document.body.appendChild(toast);
        setTimeout(function(){ toast.style.opacity = '1'; }, 20);
        setTimeout(function(){
            toast.style.opacity = '0';
            setTimeout(function(){ if (toast.parentNode) toast.parentNode.removeChild(toast); }, 400);
        }, 2500);
    }

    function init() {
        injectStyle();
        injectPopup();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
// END SLEEP TIMER V3

// SLEEP POPUP TOUCH CLOSE
(function() {
    document.addEventListener('touchstart', function(e) {
        var modal = document.getElementById('sleepModal');
        if (!modal || !modal.classList.contains('show')) return;
        var popup = document.getElementById('sleepTimerPopup');
        var sleepBtn = document.getElementById('sleepBtn');
        // If touch is NOT inside the popup AND NOT on the sleep button itself → close
        if (popup && !popup.contains(e.target) && !(sleepBtn && sleepBtn.contains(e.target))) {
            window.closeSleepPopup();
        }
    }, { passive: true });

    document.addEventListener('click', function(e) {
        var modal = document.getElementById('sleepModal');
        if (!modal || !modal.classList.contains('show')) return;
        var popup = document.getElementById('sleepTimerPopup');
        var sleepBtn = document.getElementById('sleepBtn');
        if (popup && !popup.contains(e.target) && !(sleepBtn && sleepBtn.contains(e.target))) {
            window.closeSleepPopup();
        }
    });
})();
// END SLEEP POPUP TOUCH CLOSE

// MY PLAYLIST - RENDER FOLLOWED ARTISTS
(function() {
    function renderPlArtists() {
        var row1 = document.getElementById('plArtistsRow1');
        var row2 = document.getElementById('plArtistsRow2');
        if (!row1 || !row2) return;

        var list = window.followedArtists || [];
        if (list.length === 0) {
            row1.innerHTML = '<div style="color:#666;font-size:12px;padding:8px 0;font-style:italic;">Follow artists to see them here 💚</div>';
            row2.style.display = 'none';
            return;
        }
        row2.style.display = 'flex';

        // Split list into 2 rows
        var half = Math.ceil(list.length / 2);
        var top = list.slice(0, half);
        var bottom = list.slice(half);

        function makeCard(a) {
            var name = (a.name || '').replace(/</g, '&lt;');
            var img = a.img || ('https://ui-avatars.com/api/?name=' + encodeURIComponent(a.name || 'X') + '&background=00e0d0&color=000&size=200');
            return '<div class="pl-artist-card" data-name="' + (a.name || '').replace(/"/g, '&quot;') + '"><img src="' + img + '" onerror="this.src=\'https://ui-avatars.com/api/?name=X&background=00e0d0&color=000&size=200\'"><div class="pl-artist-label">' + name + '</div></div>';
        }

        row1.innerHTML = top.map(makeCard).join('');
        row2.innerHTML = bottom.map(makeCard).join('');

        // Make both rows scroll together
        var syncing = false;
        function syncScroll(source, target) {
            if (syncing) return;
            syncing = true;
            target.scrollLeft = source.scrollLeft;
            setTimeout(function() { syncing = false; }, 30);
        }
        row1.onscroll = function() { syncScroll(row1, row2); };
        row2.onscroll = function() { syncScroll(row2, row1); };

        // Tap → open artist profile
        document.querySelectorAll('.pl-artist-card').forEach(function(card) {
            card.onclick = function() {
                var name = card.getAttribute('data-name');
                var img = card.querySelector('img').src;
                if (typeof window.openArtistProfile === 'function') {
                    window.openArtistProfile(name, img);
                }
            };
        });
    }

    // Refresh every time the playlist view becomes visible
    var lastVisible = false;
    setInterval(function() {
        var v = document.getElementById('view-library');
        if (!v) return;
        var isVisible = v.classList.contains('active');
        if (isVisible && !lastVisible) {
            // Just opened → render
            renderPlArtists();
        }
        if (isVisible) lastVisible = true;
        else lastVisible = false;
    }, 500);

    // Initial render after a delay (in case app loads on library tab)
    setTimeout(renderPlArtists, 2500);
})();
// END MY PLAYLIST - RENDER FOLLOWED ARTISTS







// MY PLAYLIST - FAVORITES (swipe-left actions)
(function() {
    var FAV_KEY = 'bi_my_favorites';
    var openCard = null; // only one card open at a time

    function loadFavs() {
        try {
            var raw = localStorage.getItem(FAV_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch(e) { return []; }
    }
    function saveFavs(list) {
        try { localStorage.setItem(FAV_KEY, JSON.stringify(list)); } catch(e) {}
    }

    function closeAll() {
        document.querySelectorAll('.pl-fav-card.swiped').forEach(function(c) {
            c.classList.remove('swiped');
            if (c.parentElement) c.parentElement.classList.remove('open');
        });
        openCard = null;
    }

    function handleAction(action, song) {
        closeAll();
        if (action === 'play') {
            var mock = {
                id: { videoId: song.id },
                snippet: {
                    title: song.title,
                    channelTitle: song.artist,
                    thumbnails: { default: { url: song.thumbnail }, high: { url: song.thumbnail } }
                }
            };
            window.ytResults = [mock];
            window.playQueue = window.ytResults;
            if (typeof window.playYoutube === 'function') window.playYoutube(0);
        }
        else if (action === 'queue') {
            try {
                var q = (window.playQueue && window.playQueue.length) ? window.playQueue : (window.ytResults || []);
                if (!Array.isArray(q) || q.length === 0) q = [];
                q.splice((window.currentIndex || 0) + 1, 0, {
                    id: { videoId: song.id },
                    snippet: {
                        title: song.title,
                        channelTitle: song.artist,
                        thumbnails: { default: { url: song.thumbnail }, high: { url: song.thumbnail } }
                    }
                });
                window.playQueue = q;
                window.ytResults = q;
                showFavToast('📋 Added to queue');
            } catch(e) { showFavToast('Could not queue'); }
        }
        else if (action === 'share') {
            var url = 'https://www.youtube.com/watch?v=' + song.id;
            try { navigator.clipboard.writeText(url); } catch(e) {}
            if (navigator.share) {
                navigator.share({ title: song.title, text: 'Listen to ' + song.title + ' on B.I Music!', url: url }).catch(function(){});
            } else {
                showFavToast('🔗 Link copied');
            }
        }
        else if (action === 'remove') {
            var favs = loadFavs();
            favs = favs.filter(function(s) { return s.id !== song.id; });
            saveFavs(favs);
            renderFavs();
            showFavToast('Removed from favorites');
        }
    }

    function renderFavs() {
        var row = document.getElementById('plFavRow');
        if (!row) return;
        var favorites = loadFavs();
        if (favorites.length === 0) {
            row.innerHTML = '<div class="pl-fav-empty">Tap ❤️ on any song to save it here. Swipe left for options.</div>';
            return;
        }
        row.innerHTML = '';
        favorites.forEach(function(s, i) {
            var wrap = document.createElement('div');
            wrap.className = 'pl-fav-wrap';

            // Actions behind the card
            var actions = document.createElement('div');
            actions.className = 'pl-fav-actions';
            actions.innerHTML =
                '<button class="pl-fav-action play" data-act="play"><span class="ico">▶️</span>Play</button>' +
                '<button class="pl-fav-action queue" data-act="queue"><span class="ico">📋</span>Queue</button>' +
                '<button class="pl-fav-action share" data-act="share"><span class="ico">📤</span>Share</button>' +
                '<button class="pl-fav-action remove" data-act="remove"><span class="ico">❌</span>Remove</button>';
            actions.querySelectorAll('.pl-fav-action').forEach(function(btn) {
                btn.onclick = function(e) {
                    e.stopPropagation();
                    handleAction(btn.getAttribute('data-act'), s);
                };
            });
            wrap.appendChild(actions);

            // The card itself
            var card = document.createElement('div');
            card.className = 'pl-fav-card';
            card.innerHTML =
                '<img src="' + (s.thumbnail || '') + '" onerror="this.src=\'https://via.placeholder.com/100\'">' +
                '<div class="pl-fav-title">' + (s.title || 'Unknown').replace(/</g, '&lt;') + '</div>';
            wrap.appendChild(card);

            // Swipe logic
            var startX = 0, startY = 0, moved = false, swiped = false, dragging = false;

            card.addEventListener('touchstart', function(e) {
                var t = e.touches[0];
                startX = t.clientX;
                startY = t.clientY;
                moved = false;
                dragging = false;
                swiped = card.classList.contains('swiped');
            }, { passive: true });

            card.addEventListener('touchmove', function(e) {
                var t = e.touches[0];
                var dx = t.clientX - startX;
                var dy = t.clientY - startY;

                // If vertical movement bigger than horizontal → let it scroll
                if (!dragging && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) {
                    return;
                }
                if (Math.abs(dx) > 8) {
                    dragging = true;
                    moved = true;
                }
            }, { passive: true });

            card.addEventListener('touchend', function(e) {
                var t = e.changedTouches[0];
                var dx = t.clientX - startX;

                if (moved && dragging) {
                    if (dx < -40 && !swiped) {
                        // Swiped left → open
                        closeAll();
                        card.classList.add('swiped');
                        wrap.classList.add('open');
                        openCard = card;
                    } else if (dx > 40 && swiped) {
                        // Swiped right → close
                        card.classList.remove('swiped');
                        wrap.classList.remove('open');
                        openCard = null;
                    }
                    return;
                }

                if (!moved) {
                    if (swiped) {
                        // Tapping an open card just closes it
                        card.classList.remove('swiped');
                        wrap.classList.remove('open');
                        openCard = null;
                    } else {
                        // Plain tap → play
                        handleAction('play', s);
                    }
                }
            });

            // Desktop support
            card.onclick = function() {
                if (!('ontouchstart' in window)) {
                    if (card.classList.contains('swiped')) {
                        card.classList.remove('swiped');
                    } else {
                        handleAction('play', s);
                    }
                }
            };

            row.appendChild(wrap);
        });
    }

    // Close open card when tapping elsewhere
    document.addEventListener('touchstart', function(e) {
        if (openCard && !e.target.closest('.pl-fav-wrap')) {
            closeAll();
        }
    }, { passive: true });

    function getCurrentSong() {
        try {
            if (window.currentSource === 'youtube' && window.ytResults && window.ytResults[window.currentIndex]) {
                var t = window.ytResults[window.currentIndex];
                return {
                    id: t.id.videoId,
                    title: t.snippet.title || '',
                    artist: t.snippet.channelTitle || '',
                    thumbnail: (t.snippet.thumbnails && t.snippet.thumbnails.high && t.snippet.thumbnails.high.url) || ''
                };
            }
        } catch(e) {}
        return null;
    }

    // Heart button
    window.toggleLikeCurrent = function() {
        var heart = document.getElementById('fullHeart');
        var song = getCurrentSong();
        if (!song || !song.id) return;

        var favs = loadFavs();
        var idx = favs.findIndex(function(s) { return s.id === song.id; });

        if (idx >= 0) {
            favs.splice(idx, 1);
            saveFavs(favs);
            if (heart) {
                heart.classList.remove('liked');
                heart.querySelectorAll('path').forEach(function(p) { p.style.fill = ''; });
            }
            showFavToast('Removed from favorites');
        } else {
            favs.push(song);
            saveFavs(favs);
            if (heart) {
                heart.classList.add('liked');
                heart.querySelectorAll('path').forEach(function(p) { p.style.fill = '#ff4d4d'; });
            }
            showFavToast('❤️ Saved to My Favorites');
        }
        renderFavs();
    };

    function showFavToast(msg) {
        var old = document.getElementById('favToast');
        if (old) old.parentNode.removeChild(old);
        var t = document.createElement('div');
        t.id = 'favToast';
        t.textContent = msg;
        t.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#00e0d0,#008f85);color:#000;font-weight:bold;font-size:13px;padding:12px 20px;border-radius:25px;z-index:2147483647;box-shadow:0 10px 30px rgba(0,224,208,0.6);opacity:0;transition:opacity 0.3s ease;';
        document.body.appendChild(t);
        setTimeout(function() { t.style.opacity = '1'; }, 20);
        setTimeout(function() {
            t.style.opacity = '0';
            setTimeout(function() { if (t.parentNode) t.parentNode.removeChild(t); }, 400);
        }, 2200);
    }

    setInterval(function() {
        var heart = document.getElementById('fullHeart');
        if (!heart) return;
        var song = getCurrentSong();
        if (!song || !song.id) return;
        var favs = loadFavs();
        var isFav = favs.some(function(s) { return s.id === song.id; });
        if (isFav) {
            heart.classList.add('liked');
            heart.querySelectorAll('path').forEach(function(p) { p.style.fill = '#ff4d4d'; });
        } else {
            heart.classList.remove('liked');
            heart.querySelectorAll('path').forEach(function(p) { p.style.fill = ''; });
        }
    }, 800);

    var lastVisible = false;
    setInterval(function() {
        var v = document.getElementById('view-library');
        if (!v) return;
        var isVisible = v.classList.contains('active');
        if (isVisible && !lastVisible) renderFavs();
        lastVisible = isVisible;
    }, 500);

    setTimeout(renderFavs, 2000);
})();
// END MY PLAYLIST - FAVORITES

// FAVORITES - GLOWING LINE SCROLL
(function() {
    var line = document.getElementById('plFavScrollLine');
    if (!line) {
        // Wait for it to exist
        setTimeout(function() { window.dispatchEvent(new Event('favLineReady')); }, 1000);
    }

    var dragStartX = 0;
    var dragStartScroll = 0;
    var dragging = false;

    function attach() {
        var line = document.getElementById('plFavScrollLine');
        var row = document.getElementById('plFavRow');
        if (!line || !row) {
            setTimeout(attach, 500);
            return;
        }
        if (line._bound) return;
        line._bound = true;

        // Touch
        line.addEventListener('touchstart', function(e) {
            var t = e.touches[0];
            dragStartX = t.clientX;
            dragStartScroll = row.scrollLeft;
            dragging = true;
        }, { passive: true });

        line.addEventListener('touchmove', function(e) {
            if (!dragging) return;
            e.preventDefault();
            var t = e.touches[0];
            var dx = t.clientX - dragStartX;
            row.scrollLeft = dragStartScroll - dx;
        }, { passive: false });

        line.addEventListener('touchend', function() {
            dragging = false;
        });

        // Mouse
        line.addEventListener('mousedown', function(e) {
            dragStartX = e.clientX;
            dragStartScroll = row.scrollLeft;
            dragging = true;
            e.preventDefault();
        });
        document.addEventListener('mousemove', function(e) {
            if (!dragging) return;
            var dx = e.clientX - dragStartX;
            row.scrollLeft = dragStartScroll - dx;
        });
        document.addEventListener('mouseup', function() {
            dragging = false;
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attach);
    } else {
        attach();
    }
})();
// END FAVORITES - GLOWING LINE SCROLL







// END SCREEN OVERLAY - SHOW/HIDE
(function() {
    var lastSongId = null;
    var isShown = false;

    function getOverlay() {
        return document.getElementById('endScreenOverlay');
    }

    function show() {
        var ov = getOverlay();
        if (!ov || isShown) return;
        ov.classList.add('show');
        isShown = true;
        console.log('[ES] SHOW');
    }

    function hide() {
        var ov = getOverlay();
        if (!ov || !isShown) return;
        ov.classList.remove('show');
        isShown = false;
        console.log('[ES] HIDE');
    }

    // Poll every 500ms
    setInterval(function() {
        if (window.currentSource !== 'youtube') {
            if (isShown) hide();
            return;
        }
        if (!window.ytReady || !window.ytPlayer || typeof window.ytPlayer.getCurrentTime !== 'function') {
            if (isShown) hide();
            return;
        }
        try {
            var dur = window.ytPlayer.getDuration() || 0;
            var cur = window.ytPlayer.getCurrentTime() || 0;
            if (dur <= 0) return;
            var remaining = dur - cur;

            var currentId = '';
            try {
                if (window.ytResults && window.ytResults[window.currentIndex]) {
                    currentId = window.ytResults[window.currentIndex].id.videoId;
                }
            } catch(e) {}
            if (currentId && currentId !== lastSongId) {
                lastSongId = currentId;
                if (isShown) hide();
            }

            if (remaining <= 20 && remaining > 0.5 && !isShown) {
                show();
            }
            if (remaining > 25 && isShown) {
                hide();
            }
        } catch(e) {}
    }, 500);
})();
// END END SCREEN OVERLAY - SHOW/HIDE











// ARTIST SIDE PANEL
(function() {
    var aspArtist = { name: '', img: '' };
    var aspSongs = [];

    window.openArtistSidePanel = async function(name, img) {
        if (!name) return;
        aspArtist = { name: name, img: img || '' };

        var panel = document.getElementById('artistSidePanel');
        if (!panel) return;

        var avatarEl = document.getElementById('aspAvatar');
        if (avatarEl) {
            avatarEl.src = img || ('https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=00e0d0&color=000&size=200');
        }

        var nameEl = document.getElementById('aspName');
        if (nameEl) nameEl.textContent = name;

        updateAspFollow();

        var songsList = document.getElementById('aspSongsList');
        if (songsList) songsList.innerHTML = '<div class="asp-loading">Loading songs...</div>';
        aspSongs = [];

        panel.classList.add('open');

        try {
            var pget = window.pget;
            if (!pget) {
                if (songsList) songsList.innerHTML = '<div class="asp-loading">API not available</div>';
                return;
            }

            var d = await pget('/search?q=' + encodeURIComponent(name + ' official video') + '&filter=videos');
            var items = (d.items || []).filter(function(v) { return v.url && v.title; }).slice(0, 20);

            if (!songsList) return;
            if (items.length === 0) {
                songsList.innerHTML = '<div class="asp-loading">No songs found</div>';
                return;
            }

            songsList.innerHTML = '';
            items.forEach(function(v, idx) {
                var vid = (v.url || '').replace('/watch?v=', '');
                aspSongs.push({
                    id: vid,
                    title: v.title,
                    artist: v.uploaderName || name,
                    thumbnail: v.thumbnail || ''
                });

                var row = document.createElement('div');
                row.className = 'asp-song-row';
                row.innerHTML =
                    '<img src="' + (v.thumbnail || '') + '" onerror="this.style.opacity=0.3">' +
                    '<div class="asp-song-info">' +
                        '<div class="asp-song-title">' + (v.title || '').replace(/</g, '&lt;') + '</div>' +
                        '<div class="asp-song-sub">' + (v.uploaderName || '').replace(/</g, '&lt;') + '</div>' +
                    '</div>';
                row.onclick = function() { playFromAsp(idx); };
                songsList.appendChild(row);
            });
        } catch(e) {
            if (songsList) songsList.innerHTML = '<div class="asp-loading">Error loading songs</div>';
            console.log('[ASP] Error:', e);
        }
    };

    function playFromAsp(idx) {
        if (!aspSongs[idx]) return;
        var queue = aspSongs.map(function(x) {
            return {
                id: { videoId: x.id },
                snippet: {
                    title: x.title,
                    channelTitle: x.artist,
                    thumbnails: { default: { url: x.thumbnail }, high: { url: x.thumbnail } }
                }
            };
        });
        window.ytResults = queue;
        window.playQueue = queue;
        if (typeof window.playYoutube === 'function') window.playYoutube(idx);
        window.closeArtistSidePanel();
    }

    window.closeArtistSidePanel = function() {
        var panel = document.getElementById('artistSidePanel');
        if (panel) panel.classList.remove('open');
    };

    window.aspToggleFollow = function() {
        if (!aspArtist.name) return;
        if (typeof window.toggleFollow === 'function') {
            window.toggleFollow(aspArtist.name, null, null);
        }
        updateAspFollow();
    };

    function updateAspFollow() {
        var btn = document.getElementById('aspFollowBtn');
        if (!btn) return;
        var list = window.followedArtists || [];
        var isF = list.some(function(a) {
            return (a.name || '').toLowerCase() === aspArtist.name.toLowerCase();
        });
        btn.textContent = isF ? 'Following' : 'Follow';
        btn.classList.toggle('following', isF);
    }

    // Bind the end screen avatar to open the side panel
    function bindEndScreenAvatar() {
        var av = document.getElementById('esAvatar');
        if (!av || av._aspBound) return;
        av._aspBound = true;
        av.onclick = function(e) {
            e.stopPropagation();
            e.preventDefault();
            var artistName = '';
            var artistImg = '';
            try {
                if (window.ytResults && window.ytResults[window.currentIndex]) {
                    artistName = window.ytResults[window.currentIndex].snippet.channelTitle || '';
                }
                var img = av.querySelector('img');
                if (img) artistImg = img.src;
            } catch(e) {}
            if (artistName) window.openArtistSidePanel(artistName, artistImg);
        };
    }

    // Keep trying to bind the avatar (in case end screen shows/hides)
    setInterval(bindEndScreenAvatar, 700);
})();
// END ARTIST SIDE PANEL

// AVATAR FIX - Fetch real artist image for esAvatar and side panel
(function() {
    var cachedArtistImages = {};

    function getCurrentArtistName() {
        try {
            if (window.ytResults && window.ytResults[window.currentIndex]) {
                return window.ytResults[window.currentIndex].snippet.channelTitle || '';
            }
        } catch(e) {}
        return '';
    }

    // Fetch real image from YouTube channel search
    async function fetchRealArtistImg(artistName) {
        if (!artistName || !window.pget) return '';
        if (cachedArtistImages[artistName]) return cachedArtistImages[artistName];
        try {
            var d = await window.pget('/search?q=' + encodeURIComponent(artistName) + '&filter=channels');
            var items = (d.items || []).slice(0, 5);
            var nm = artistName.toLowerCase().replace(/vevo|official|topic|\s*-\s*topic/gi, '').trim();
            var best = '';
            for (var i = 0; i < items.length; i++) {
                var cn = (items[i].name || '').toLowerCase().replace(/vevo|official|topic|\s*-\s*topic/gi, '').trim();
                if ((cn === nm || cn.indexOf(nm) === 0 || nm.indexOf(cn) === 0) && items[i].thumbnail) {
                    best = items[i].thumbnail;
                    break;
                }
            }
            if (!best && items[0] && items[0].thumbnail) best = items[0].thumbnail;
            if (best) cachedArtistImages[artistName] = best;
            return best;
        } catch(e) {}
        return '';
    }

    // Set the center avatar
    async function updateCenterAvatar() {
        var av = document.getElementById('esAvatar');
        if (!av) return;
        var artistName = getCurrentArtistName();
        if (!artistName) return;

        // Don't reset if already set to the real image for this artist
        if (av._currentArtist === artistName && av.querySelector('img') && av.querySelector('img').src.indexOf('ui-avatars') < 0) return;
        av._currentArtist = artistName;

        // Show placeholder first
        av.innerHTML = '<img src="https://ui-avatars.com/api/?name=' + encodeURIComponent(artistName) + '&background=00e0d0&color=000&size=200">';

        // Fetch and set real image
        var realImg = await fetchRealArtistImg(artistName);
        if (realImg && av._currentArtist === artistName) {
            var imgEl = av.querySelector('img');
            if (imgEl) imgEl.src = realImg;
        }
    }

    // Poll to update center avatar when overlay shows
    setInterval(function() {
        var ov = document.getElementById('endScreenOverlay');
        if (ov && ov.classList.contains('show')) {
            updateCenterAvatar();
        }
    }, 1000);

    // Expose the image fetcher so the side panel can use it
    window.fetchRealArtistImg = fetchRealArtistImg;

    // Override the avatar click to pass the real image
    setTimeout(function() {
        var av = document.getElementById('esAvatar');
        if (!av) return;
        av.onclick = function(e) {
            e.stopPropagation();
            e.preventDefault();
            var artistName = getCurrentArtistName();
            if (!artistName) return;
            var imgEl = av.querySelector('img');
            var img = imgEl ? imgEl.src : '';
            // If we have the real image cached, use it
            if (cachedArtistImages[artistName]) img = cachedArtistImages[artistName];
            if (typeof window.openArtistSidePanel === 'function') {
                window.openArtistSidePanel(artistName, img);
            }
        };
    }, 2000);
})();
// END AVATAR FIX



// AUTO SELECT
(function() {
    var cyclingInterval = null;
    var activeCardIdx = -1;
    var autoSelectStarted = false;
    var autoSelectCancelled = false;
    var lastSongId = '';
    var messageEl = null;

    function getCards() {
        return [
            document.getElementById('esCard1'),
            document.getElementById('esCard2'),
            document.getElementById('esCard3'),
            document.getElementById('esCard4')
        ];
    }

    function clearAllStates() {
        getCards().forEach(function(c) {
            if (!c) return;
            c.classList.remove('autoselect-active');
            c.classList.remove('autoselect-picked');
        });
    }

    function ensureMessage() {
        if (messageEl && document.body.contains(messageEl)) return messageEl;
        var box = document.getElementById('fullArtBox');
        if (!box) return null;
        messageEl = document.createElement('div');
        messageEl.id = 'esAutoSelectMsg';
        messageEl.textContent = '🎯 AUTO-SELECTING...';
        box.appendChild(messageEl);
        return messageEl;
    }

    function showMessage() {
        var m = ensureMessage();
        if (m) m.classList.add('show');
    }

    function hideMessage() {
        if (messageEl) messageEl.classList.remove('show');
    }

    function cycle() {
        if (autoSelectCancelled) return;
        var cards = getCards();
        if (!cards[0]) return;

        var availableIdx = [];
        for (var i = 0; i < 4; i++) {
            if (cards[i] && cards[i].innerHTML.trim().length > 0) availableIdx.push(i);
        }
        if (availableIdx.length === 0) return;

        cards.forEach(function(c) { if (c) c.classList.remove('autoselect-active'); });
        activeCardIdx = availableIdx[Math.floor(Math.random() * availableIdx.length)];
        cards[activeCardIdx].classList.add('autoselect-active');
    }

    function startAutoSelect() {
        if (autoSelectStarted) return;
        autoSelectStarted = true;
        autoSelectCancelled = false;
        activeCardIdx = -1;

        // Clear any stale state from previous videos
        clearAllStates();
        showMessage();

        cyclingInterval = setInterval(cycle, 450);
        cycle();
        console.log('[ES] Auto-select started');
    }

    function stopAutoSelect(playSelected) {
        if (cyclingInterval) {
            clearInterval(cyclingInterval);
            cyclingInterval = null;
        }
        autoSelectStarted = false;
        hideMessage();

        if (playSelected && !autoSelectCancelled) {
            var cards = getCards();
            var availableIdx = [];
            for (var i = 0; i < 4; i++) {
                if (cards[i] && cards[i].innerHTML.trim().length > 0) availableIdx.push(i);
            }
            if (availableIdx.length === 0) return;

            var finalIdx = activeCardIdx >= 0 && availableIdx.indexOf(activeCardIdx) >= 0
                ? activeCardIdx
                : availableIdx[Math.floor(Math.random() * availableIdx.length)];

            cards.forEach(function(c) { if (c) c.classList.remove('autoselect-active'); });
            cards[finalIdx].classList.add('autoselect-picked');
            console.log('[ES] Auto-selected card', finalIdx + 1);

            setTimeout(function() {
                if (autoSelectCancelled) return;
                playAutoSelected(finalIdx);
            }, 500);
        }
    }

    function playAutoSelected(idx) {
        var cards = getCards();
        var card = cards[idx];
        if (!card || !card._songData) return;
        var song = card._songData;
        var queue = [song].map(function(x) {
            return {
                id: { videoId: x.id },
                snippet: {
                    title: x.title,
                    channelTitle: x.uploaderName || '',
                    thumbnails: { default: { url: x.thumbnail }, high: { url: x.thumbnail } }
                }
            };
        });
        window.ytResults = queue;
        window.playQueue = queue;
        if (typeof window.playYoutube === 'function') window.playYoutube(0);
        console.log('[ES] Playing auto-selected:', song.title);

        var ov = document.getElementById('endScreenOverlay');
        if (ov) ov.classList.remove('show');

        clearAllStates();
        autoSelectStarted = false;
        autoSelectCancelled = false;
    }

    function cancelOnUserTap() {
        var cards = getCards();
        cards.forEach(function(c) {
            if (!c) return;
            if (c._autoselectBound) return;
            c._autoselectBound = true;
            var original = c.onclick;
            c.onclick = function(e) {
                autoSelectCancelled = true;
                if (cyclingInterval) { clearInterval(cyclingInterval); cyclingInterval = null; }
                clearAllStates();
                hideMessage();
                autoSelectStarted = false;
                if (original) original(e);
            };
        });
    }

    // Watch overlay state: when it hides, clear everything
    setInterval(function() {
        var ov = document.getElementById('endScreenOverlay');
        if (!ov) return;
        var visible = ov.classList.contains('show');
        if (!visible) {
            // Overlay not shown — make sure everything is clean
            if (cyclingInterval) { clearInterval(cyclingInterval); cyclingInterval = null; }
            clearAllStates();
            hideMessage();
            autoSelectStarted = false;
        }
    }, 500);

    // Main poll: check remaining time
    setInterval(function() {
        if (window.currentSource !== 'youtube') {
            stopAutoSelect(false);
            clearAllStates();
            return;
        }
        if (!window.ytReady || !window.ytPlayer || typeof window.ytPlayer.getCurrentTime !== 'function') return;

        try {
            var dur = window.ytPlayer.getDuration() || 0;
            var cur = window.ytPlayer.getCurrentTime() || 0;
            if (dur <= 0) return;
            var remaining = dur - cur;

            // New song? Reset
            var currentId = '';
            try {
                if (window.ytResults && window.ytResults[window.currentIndex]) {
                    currentId = window.ytResults[window.currentIndex].id.videoId;
                }
            } catch(e) {}
            if (currentId && currentId !== lastSongId) {
                lastSongId = currentId;
                stopAutoSelect(false);
                clearAllStates();
                autoSelectCancelled = false;
                autoSelectStarted = false;
            }

            // Start at 6 sec remaining
            if (remaining <= 6 && remaining > 0.3 && !autoSelectStarted && !autoSelectCancelled) {
                cancelOnUserTap();
                startAutoSelect();
            }

            // Stop at 0.5 sec remaining
            if (remaining <= 0.5 && autoSelectStarted) {
                stopAutoSelect(true);
            }
        } catch(e) {}
    }, 300);
})();
// END AUTO SELECT



// END SCREEN ARTIST POPULATE - V2
(function() {
    var playedInEndScreen = [];
    var PLAYED_KEY = 'bi_es_played';
    var populatedForSongId = null;

    try {
        var raw = localStorage.getItem(PLAYED_KEY);
        playedInEndScreen = raw ? JSON.parse(raw) : [];
    } catch(e) { playedInEndScreen = []; }

    function savePlayed() {
        try { localStorage.setItem(PLAYED_KEY, JSON.stringify(playedInEndScreen.slice(-150))); } catch(e) {}
    }

    var BAD_WORDS = [
        'interview', 'podcast', 'reaction', 'behind the scenes', 'behind-the-scenes',
        'vlog', 'trailer', 'teaser', 'documentary', 'explained', 'unboxing',
        'review', 'highlights', 'breaking news', 'news', 'conference',
        'speech', 'standup', 'stand-up', 'comedy', 'q&a', 'q & a', 'q and a',
        'ama', 'on the street', 'first listen', 'lofi', 'study', 'sleep', 'relax', 'meditation'
    ];

    function hasBadWord(text) {
        if (!text) return false;
        var t = text.toLowerCase();
        for (var i = 0; i < BAD_WORDS.length; i++) {
            if (t.indexOf(BAD_WORDS[i]) >= 0) return true;
        }
        return false;
    }

    // Get ALL artist names from the current song (main + featured)
    function getArtistTargets() {
        var targets = [];
        try {
            if (!window.ytResults || !window.ytResults[window.currentIndex]) return targets;
            var song = window.ytResults[window.currentIndex];
            var title = song.snippet.title || '';
            var channel = song.snippet.channelTitle || '';

            // Main channel artist
            var mainArtist = cleanName(channel);
            if (mainArtist) targets.push(mainArtist);

            // Featured artists from title (ft. / feat. / with)
            var ftMatches = title.match(/(?:ft\.?|feat\.?|featuring|with)\s+([A-Za-z0-9\s&\.\-']+?)(?:\s*[\(\[]|\s*-|\s*$)/gi);
            if (ftMatches) {
                ftMatches.forEach(function(m) {
                    var cleaned = m.replace(/^(?:ft\.?|feat\.?|featuring|with)\s+/i, '').replace(/[\s\-\(\[\)\]]+$/,'').trim();
                    var cn = cleanName(cleaned);
                    if (cn && targets.indexOf(cn) < 0) targets.push(cn);
                });
            }

            // Also grab any artist from the title before " - " or "("
            var beforeDash = title.split(' - ')[0].trim();
            var beforeDashClean = cleanName(beforeDash);
            if (beforeDashClean && targets.indexOf(beforeDashClean) < 0) targets.push(beforeDashClean);
        } catch(e) {}
        return targets;
    }

    function cleanName(name) {
        if (!name) return '';
        return name.toLowerCase()
            .replace(/vevo|official|topic|\s*-\s*topic|records|entertainment|music|channel/gi, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Return true if the artist name (first word of it) appears anywhere in the text
    function textContainsArtist(text, artist) {
        if (!text || !artist) return false;
        var t = text.toLowerCase();
        var nm = cleanName(artist);
        if (!nm) return false;

        // Whole name
        if (t.indexOf(nm) >= 0) return true;

        // First word (if at least 4 chars — avoid "the", "ft")
        var firstWord = nm.split(' ')[0];
        if (firstWord.length >= 4 && t.indexOf(firstWord) >= 0) return true;

        return false;
    }

    function belongsToArtist(song, targets) {
        if (!song || !targets || targets.length === 0) return false;
        var uploader = song.uploaderName || '';
        var title = song.title || '';

        for (var i = 0; i < targets.length; i++) {
            if (textContainsArtist(uploader, targets[i])) return true;
            if (textContainsArtist(title, targets[i])) return true;
        }
        return false;
    }

    function getCards() {
        return [
            document.getElementById('esCard1'),
            document.getElementById('esCard2'),
            document.getElementById('esCard3'),
            document.getElementById('esCard4')
        ];
    }

    function renderCards(picks) {
        var cards = getCards();
        cards.forEach(function(el, i) {
            if (!el) return;
            var s = picks[i];
            el._songData = s;
            el.innerHTML =
                '<img class="es-thumb" src="' + (s.thumbnail || '') + '" onerror="this.style.opacity=0.3">' +
                '<div class="es-title">' + (s.title || 'Unknown').replace(/</g, '&lt;') + '</div>';
            el.onclick = function(e) {
                e.stopPropagation();
                e.preventDefault();
                playFromCard(el._songData);
            };
        });
    }

    function playFromCard(song) {
        if (!song) return;
        var queue = [song].map(function(x) {
            return {
                id: { videoId: x.id },
                snippet: {
                    title: x.title,
                    channelTitle: x.uploaderName || '',
                    thumbnails: { default: { url: x.thumbnail }, high: { url: x.thumbnail } }
                }
            };
        });
        window.ytResults = queue;
        window.playQueue = queue;
        if (typeof window.playYoutube === 'function') window.playYoutube(0);
    }

    function populate() {
        var pool = window.simPool || [];
        if (pool.length < 4) return;

        var currentSongId = '';
        try {
            if (window.ytResults && window.ytResults[window.currentIndex]) {
                currentSongId = window.ytResults[window.currentIndex].id.videoId || '';
            }
        } catch(e) {}
        if (!currentSongId) return;
        if (currentSongId === populatedForSongId) return;

        var targets = getArtistTargets();
        if (targets.length === 0) targets = [''];

        // Filter pool: belongs to artist, no bad words, not played
        var candidates = pool.filter(function(s) {
            if (!s || !s.id) return false;
            if (hasBadWord(s.title)) return false;
            if (targets[0] && belongsToArtist(s, targets)) return true;
            return false;
        });

        // Remove already-played
        var fresh = candidates.filter(function(s) {
            return playedInEndScreen.indexOf(s.id) < 0;
        });

        // If not enough FRESH candidates → reset played list (only for candidates)
        if (fresh.length < 4) {
            // Try to reset played list and use candidates again
            candidates.forEach(function(s) { playedInEndScreen = playedInEndScreen.filter(function(id){ return id !== s.id; }); });
            fresh = candidates.slice();
        }

        // Only if artist has < 4 songs in pool, fall back to broader pool
        // BUT still filter by "not bad word" and "targets somewhere in title/uploader"
        if (fresh.length < 4) {
            fresh = pool.filter(function(s) {
                if (!s || !s.id) return false;
                if (hasBadWord(s.title)) return false;
                if (targets[0] && belongsToArtist(s, targets)) return true;
                return false;
            });
        }

        // Final fallback: if artist has NOTHING in the pool, use general pool
        if (fresh.length < 4) {
            fresh = pool.filter(function(s) {
                return !hasBadWord(s.title);
            });
        }

        if (fresh.length < 4) return;

        fresh.sort(function() { return Math.random() - 0.5; });
        var picks = fresh.slice(0, 4);

        picks.forEach(function(p) {
            if (playedInEndScreen.indexOf(p.id) < 0) playedInEndScreen.push(p.id);
        });
        savePlayed();

        renderCards(picks);
        populatedForSongId = currentSongId;

        console.log('[ES] Targets:', targets, '| Pool matched:', candidates.length, '| Picked:', picks.length);
    }

    setInterval(function() {
        var ov = document.getElementById('endScreenOverlay');
        if (!ov) return;
        if (ov.classList.contains('show')) {
            populate();
        } else {
            populatedForSongId = null;
        }
    }, 800);
})();
// END END SCREEN ARTIST POPULATE - V2
