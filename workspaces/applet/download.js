const fs = require('fs');
const https = require('https');

const files = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'site.webmanifest'
];

const baseUrl = 'https://raw.githubusercontent.com/notfortiktok2000-maker/nacy-consulting/main/public/';

files.forEach(file => {
  https.get(baseUrl + file, (res) => {
    if (res.statusCode === 200) {
      const fileStream = fs.createWriteStream('./public/' + file);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        console.log('Downloaded ' + file);
      });
    } else {
      console.log('Failed ' + file + ' status ' + res.statusCode);
    }
  }).on('error', (err) => {
    console.log('Error ' + file + ': ' + err.message);
  });
});
