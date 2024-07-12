var express = require('express');
var router = express.Router();

const User = require('../models/User');

router.put('/:id', async function (req, res, next) {
  const id = req.params.id;
  const updates = req.body;

  try {
    const user = await User.findById( id );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    Object.assign(user, updates);
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
});

module.exports = router;
