require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const seedData = require('./utils/seed');

// Connect to Database
connectDB().then(() => {
  seedData();
});

const app = express();

const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/needs', require('./routes/needs'));
app.use('/api/volunteers', require('./routes/volunteers'));
app.use('/api/match', require('./routes/match'));
app.use('/api/dashboard-stats', require('./routes/dashboard'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
