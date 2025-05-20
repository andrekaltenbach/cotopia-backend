const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
      enum: ['event', 'help', 'real estate', 'trade', 'transportation'],
    },
    typeOfEvent: {
      type: String,
      enum: ['request', 'offer'],
    },
    fromLocattion: {
      type: String,
      required: true,
    },
    toLocation: {
      type: String,
    },
    image: {
      type: String,
    },
    webURL: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Type.ObjectId,
      ref: 'User',
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model('Event', eventSchema);
