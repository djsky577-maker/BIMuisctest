import re

with open('index.html', 'r') as f:
    html = f.read()

# The new direct download link
new_link = "https://drive.google.com/uc?export=download&id=1wF7LiFeCwp2HJWNHyC2Xmd-fVyAWKxsU"

# Find the downloadApkBtn and replace its href
old_pattern = r'(<a[^>]*id="downloadApkBtn"[^>]*href=")[^"]*(")'
if re.search(old_pattern, html):
    html = re.sub(old_pattern, r'\1' + new_link + r'\2', html, count=1)
    with open('index.html', 'w') as f:
        f.write(html)
    print("✅ APK download link updated to new APK")
else:
    print("⚠️ Could not find downloadApkBtn. Trying fallback...")
    # Try to find any Google Drive link in the file
    if 'drive.google.com' in html:
        html = re.sub(
            r'drive\.google\.com/[^\s"\'<>]*',
            new_link,
            html,
            count=1
        )
        with open('index.html', 'w') as f:
            f.write(html)
        print("✅ Fallback: Replaced first Google Drive link")
    else:
        print("❌ Could not find any APK link to update")

# Verify the change
with open('index.html', 'r') as f:
    check = f.read()
    if '1wF7LiFeCwp2HJWNHyC2Xmd-fVyAWKxsU' in check:
        print("✅ Confirmed: new APK link is in index.html")
    else:
        print("⚠️ Link verification failed")
