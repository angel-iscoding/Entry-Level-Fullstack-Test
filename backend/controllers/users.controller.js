import express from 'express';
import * as usersService from '../services/users.service.js';
import { verifyToken } from '../services/auth.service.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await usersService.getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/update/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params;
    const updateData = req.body;

    const response = await usersService.update(id, updateData);
    res.json(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;
