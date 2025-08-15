const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This is the blueprint for our chore
const choreSchema = new Schema({
  name: {
    type: String,
    required: true // Every chore must have a name
  },
  points: {
    type: Number,
    required: true, // Every chore must have a point value
    default: 0
  },
  completed: {
    type: Boolean,
    default: false // Chores are not completed by default
  }
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' fields

// The model is the tool we use to interact with the 'chores' collection in the DB
const Chore = mongoose.model('Chore', choreSchema);

// Export the model so we can use it in other files (like server.js)
module.exports = Chore;