const mongoose = require('mongoose');
const router = require('express').Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const Event = require('../models/Event.model');

router.post('/events', isAuthenticated, (req, res, next) => {
  const event = req.body;
  const eventData = {
    ...req.body,
    createdBy: req.payload._id,
  };

  Event.create(eventData)
    .then((response) => res.status(201).json(response))
    .catch((err) => res.json(err));
});

router.get('/events', (req, res, next) => {
  Event.find({})
    .populate('createdBy')
    .then((allEvents) => res.json(allEvents))
    .catch((err) => res.json(err));
});

router.get('/events/:eventId', (req, res, next) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Event.findById(eventId)
    .populate('createdBy')
    .then((event) => res.json(event))
    .catch((err) => res.json(err));
});

router.put('/events/:eventId', isAuthenticated, (req, res, next) => {
  const { eventId } = req.params;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Event.findByIdAndUpdate(eventId, update, { new: true })
    .then((updatedEvent) => res.json(updatedEvent))
    .catch((err) => res.json(err));
});

router.delete('/events/:eventId', isAuthenticated, (req, res, next) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Event.findByIdAndDelete(eventId)
    .then((deletedEvent) => res.json(deletedEvent))
    .catch((err) => res.json(err));
});
module.exports = router;
