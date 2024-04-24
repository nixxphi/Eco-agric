// routes/userRoutes.js
import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

// User registration route
router.post('/register', UserController.register);

// User login route
router.post('/login', UserController.login);

export default router;
