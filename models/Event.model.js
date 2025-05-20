const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
      enum: ['event', 'help', 'real estate', 'trade', 'transportation'],
    },
    typeOfEvent: {
      type: String,
      required: [true, 'Type is required.'],
      enum: ['request', 'offer'],
    },
    location: {
      type: String,
      required: [true, 'Location is required.'],
    },
    toLocation: {
      type: String,
    },
    image: {
      type: String,
    },
    eventURL: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model('Event', eventSchema);
