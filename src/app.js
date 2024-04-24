import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/user.model.js';
import UserService from './services/user.service.js';
import climateRoutes from './routes/climate.routes.js';
import soilTypeRoutes from './routes/soilType.routes.js';
import plantRoutes from './routes/plant.routes.js';

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes for user registration and login
app.post('/register', async (req, res) => {
  const { username, password, location } = req.body;
  try {
    const newUser = new User(false, username, password, location);
    const createdUser = await UserService.registerUser(newUser);
    res.json(createdUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserService.authenticateUser(username, password);
    res.json(user);
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Routes for climate, soil types, and plants
app.use('/climate', climateRoutes);
app.use('/soil-types', soilTypeRoutes);
app.use('/plants', plantRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
