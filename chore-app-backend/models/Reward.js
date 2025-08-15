const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The blueprint for our reward
const rewardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true // This is the 'cost' of the reward
  }
}, { timestamps: true });

// The model we'll use to interact with the 'rewards' collection
const Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;