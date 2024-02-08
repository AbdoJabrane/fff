const axios = require('axios');

async function m3uUrlToJson(m3uUrl) {
  try {
    const response = await axios.get(m3uUrl, { maxContentLength: Infinity });
    const m3uContent = response.data;
    const playlist = m3uToJson(m3uContent);
    return playlist;
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu M3U à partir de l\'URL :', error.message);
    return null;
  }
}

function m3uToJson(m3uContent) {
    console.log(m3uContent)
  const lines = m3uContent.split('\n');
 
  const playlist = [];

  for (const line of lines) {
    if (line.startsWith('#EXTINF:')) {
      const match = line.match(/#EXTINF:(\d+),(.*)/);
      if (match) {
        const duration = match[1];
        const title = match[2];
        playlist.push({ duration, title, path: '' });
      }
    } else if (line.trim() !== '' && !line.startsWith('#') && playlist.length > 0) {
      playlist[playlist.length - 1].path = line.trim();
    }
  }

  return playlist;
}

// Example usage with an M3U URL
const m3uUrl = 'http://80332-dated.cdn-o2.me/get.php?username=63cdb7d224&password=eaf3fe6c4303&type=m3u_plus&output=ts';
m3uUrlToJson(m3uUrl)
  .then((jsonPlaylist) => {
    console.log(JSON.stringify(jsonPlaylist, null, 2));
  })
  .catch((err) => {
    console.error('Erreur lors de la conversion de l\'URL M3U en JSON :', err.message);
  });
