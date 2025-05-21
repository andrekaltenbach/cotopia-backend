const router = require('express').Router();
const User = require('../models/User.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.get('/user/:userId', isAuthenticated, (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then(({ email, name, createdAt, updatedAt }) => {
      const user = {
        email,
        name,
        createdAt,
        updatedAt,
      };
      res.status(200).json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete('/user/:userId', isAuthenticated, (req, res, next) => {
  const { userId } = req.params;

  User.findByIdAndDelete(userId)
    .then((deletedUser) => res.json(deletedUser))
    .catch((err) => res.json(err));
});

module.exports = router;
