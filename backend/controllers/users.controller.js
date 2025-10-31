const express = require('express');
const router = express.Router();
const usersService = require('../services/users.service');

router.get('/', async (req, res) => {
  try {
    const users = await usersService.getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
