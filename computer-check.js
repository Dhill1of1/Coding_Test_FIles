const os = require('os');

const uptimeInSeconds = os.uptime();

// 7 days in seconds
const SECONDS_IN_A_WEEK = 60 * 60 * 24 * 7;

// Convert uptime to hours, minutes, and seconds
const hours = Math.floor(uptimeInSeconds / 3600);
const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
const seconds = Math.floor(uptimeInSeconds % 60);

// Write your code below

console.log(`Your computer has been awake for ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);

if (uptimeInSeconds < SECONDS_IN_A_WEEK) {
  console.log('Nice, your computer has rested recently. No need to restart yet!');
} else {
  console.log('Your computer has been awake for over a week. Consider restarting it!');
}
