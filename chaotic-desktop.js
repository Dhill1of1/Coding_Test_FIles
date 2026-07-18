const path = require('path');
// Write your code below

const desktopPath = path.join('Users', 'devinhillshomefolder', 'Desktop');

const files = [
  'vacation-photo.png',
  'notes.txt',
  'meme.JPG',
  'invoice.pdf',
  'screenshot.jpeg',
];

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.JPG', '.JPEG', '.PNG', '.GIF'];

// Find the first image file
const firstImage = files.find(file => imageExtensions.includes(path.extname(file)));

if (firstImage) {
  console.log('First image file found:', path.join(desktopPath, firstImage));
} else {
  console.log('No image files found!');
}
