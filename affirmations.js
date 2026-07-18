const fs = require('fs');
const path = require('path');
const os = require('os');

// Define an array of affirmations directly in the code
const affirmations = [
  'This is gonna be your year!',
  'You can absolutely climb that V4!',
  'You are capable of learning anything you set your mind to.',
  'Every line of code you write makes you a better developer.',
  'Your hard work today is building the career you want tomorrow.',
];

// Define the path to the desktop
const desktopPath = path.join(os.homedir(), 'Desktop');

// Function to get a random affirmation and save it to a file on the desktop
function saveRandomAffirmationToDesktop() {
  // Pick a random affirmation from the array
  const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];

  // Define the new file path on the desktop (this will overwrite the file each time)
  const newFilePath = path.join(desktopPath, 'daily-affirmations.txt');

  // Write the random affirmation to a new file on the desktop (this will overwrite it)
  fs.writeFile(newFilePath, randomAffirmation, (err) => {
    if (err) {
      console.error('Error writing the affirmation to the file:', err);
    } else {
      console.log('Random affirmation saved to:', newFilePath);
    }
  });
}

// Call the function to get and save a random affirmation
saveRandomAffirmationToDesktop();
