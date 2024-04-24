// controllers/user.controller.js
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

// Controller method for user registration
export const register = async (req, res) => {
  try {
    const { username, password, location } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = new User(false, username, hashedPassword, location); 
    const result = await newUser.createUser(process.env.MONGODB_URI, process.env.dbName);
    res.status(201).json({ message: 'User registered successfully', user: result });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Controller method for user login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username); // Assuming you have a method to find a user by username
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.json({ message: 'User logged in successfully', user: { username: user.username, location: user.location } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Failed to log in user' });
  }
};
