with open('script.js','r') as f:
    s = f.read()

old = "el.onclick=function(){playQueue=artistSongPool.map"
new = "el.onclick=function(){document.querySelectorAll('.list-item.playing-now').forEach(function(n){n.classList.remove('playing-now');});el.classList.add('playing-now');playQueue=artistSongPool.map"

if old in s:
    s = s.replace(old, new, 1)
    with open('script.js','w') as f:
        f.write(s)
    print("DONE - replaced")
else:
    print("NOT FOUND - old line doesn't match")
