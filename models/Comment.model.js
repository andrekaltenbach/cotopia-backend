const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
    },
    commentText: {
      type: String,
      required: [true, 'Comment is required.'],
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
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

module.exports = model('Comment', commentSchema);
