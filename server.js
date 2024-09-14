const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up the view engine (HTML files in the 'views' directory)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Route for the home page
app.get('/', (req, res) => {
  res.render('index', { title: 'Automatic Plant Watering Device' });
});

// Route for the live data page
app.get('/live', (req, res) => {
  res.render('live', { title: 'Live Data' });
});

// Route for the team page
app.get('/team', (req, res) => {
  res.render('team', { title: 'Team' });
});

// Generate random data for moisture level and pump status
function getRandomData() {
    const moistureLevel = Math.floor(Math.random() * 100); // Random moisture level between 0 and 100
    const pumpStatus = moistureLevel > 40 ? 'OFF' : 'ON'; // Pump is OFF if moisture level is above 40%, else ON
    return { moistureLevel, pumpStatus };
}
  

// API to fetch live data
app.get('/api/data', (req, res) => {
  const data = getRandomData();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
