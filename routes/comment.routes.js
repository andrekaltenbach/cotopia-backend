const mongoose = require('mongoose');
const router = require('express').Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const Comment = require('../models/Comment.model');

router.post('/events/:eventId/comments', isAuthenticated, (req, res, next) => {
  const { eventId } = req.params;
  const comment = req.body;
  const newComment = {
    ...comment,
    event: eventId,
    createdBy: req.payload._id,
  };

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Comment.create(newComment)
    .then((response) => res.status(201).json(response))
    .catch((err) => res.json(err));
});

router.get('/events/:eventId/comments', (req, res, next) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Comment.find({ event: eventId })
    .populate('createdBy')
    .then((comments) => res.json(comments))
    .catch((err) => res.json(err));
});

module.exports = router;
