// 1. Import necessary packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Chore = require('./models/Chore');
const Reward = require('./models/Reward'); // <-- NEW: Import the Reward model
const cors = require('cors');
// 2. Create the Express app
const app = express();
const PORT = 5000;

// 3. Add Middleware
app.use(cors());
app.use(express.json());

// 4. Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Successfully connected to MongoDB!'))
  .catch((error) => console.error('❌ Error connecting to MongoDB:', error));

// 5. Define API Routes
// --------------------

// --- CHORE ROUTES ---
// Route to GET all chores
app.get('/api/chores', async (req, res) => {
  try {
    const chores = await Chore.find();
    res.json(chores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to CREATE a new chore
app.post('/api/chores', async (req, res) => {
  const chore = new Chore({
    name: req.body.name,
    points: req.body.points
  });
  try {
    const newChore = await chore.save();
    res.status(201).json(newChore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// --- REWARD ROUTES --- <-- NEW SECTION
// Route to GET all rewards
app.get('/api/rewards', async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to CREATE a new reward
app.post('/api/rewards', async (req, res) => {
  const reward = new Reward({
    name: req.body.name,
    points: req.body.points // This is the 'cost' of the reward
  });
  try {
    const newReward = await reward.save();
    res.status(201).json(newReward);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// 6. Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});