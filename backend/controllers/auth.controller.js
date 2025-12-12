import express from 'express';
import * as authService from '../services/auth.service.js';
import * as userService from '../services/users.service.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const {
      name,
      lastName,
      email,
      phone,
      password,
      currentIp,
      curentAgent
    } = req.body;

    const response = await userService.create({
      name,
      lastName,
      email,
      phone,
      password,
      currentIp,
      curentAgent
    });

    res.status(201).json(response);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await authService.loginUser({ email, password });

    res.status(201).json(response);
  } catch (error) {
    console.error('Error login user:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
