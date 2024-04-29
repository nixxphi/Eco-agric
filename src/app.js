import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/user.model.js';
import UserService from './services/user.service.js';
import { fetchClimateData } from './services/climate.service.js';
import soilTypeRoutes from './routes/soilType.routes.js';
import plantRoutes from './routes/plant.routes.js';
import searchLocation from './search.app.js';
import { importCropData } from './importData.js'; // IMPORT importCropData FUNCTION

// LOAD ENVIRONMENT VARIABLES FROM .ENV FILE
dotenv.config();

// CREATE EXPRESS APP
const app = express();

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('CONNECTED TO MONGODB'))
  .catch(err => console.error('FAILED TO CONNECT TO MONGODB:', err));

// MIDDLEWARE TO PARSE JSON BODIES
app.use(express.json());

// ROUTES FOR USER REGISTRATION AND LOGIN
app.post('/register', async (req, res) => {
  const { username, password, location } = req.body;
  try {
    // REGISTER THE USER
    const newUser = new User(false, username, password, location);
    const createdUser = await UserService.registerUser(newUser);

    // IMPORT CROP DATA WHEN A USER IS REGISTERED
    await importCropData();

    res.json(createdUser);
  } catch (error) {
    console.error('ERROR REGISTERING USER:', error);
    res.status(500).json({ error: 'FAILED TO REGISTER USER' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserService.authenticateUser(username, password);
    res.json(user);
  } catch (error) {
    console.error('ERROR AUTHENTICATING USER:', error);
    res.status(401).json({ error: 'INVALID CREDENTIALS' });
  }
});

// ROUTE FOR FETCHING CLIMATE DATA
app.get('/climate', async (req, res) => {
  const { latitude, longitude } = req.query;
  try {
    const climateData = await fetchClimateData(latitude, longitude);
    res.json(climateData);
  } catch (error) {
    console.error('ERROR FETCHING CLIMATE DATA:', error);
    res.status(500).json({ error: 'FAILED TO FETCH CLIMATE DATA' });
  }
});

// ROUTES FOR SOIL TYPES AND PLANTS
app.use('/soil-types', soilTypeRoutes);
app.use('/plants', plantRoutes);

// START THE SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${PORT}`);
});

// SAMPLE TEST TO CHECK THE SEARCH FUNCTION
(async () => {
  try {
    const latitude = 37.7749;
    const longitude = -122.4194;
    const searchResult = await searchLocation(latitude, longitude);
    console.log(searchResult);
  } catch (error) {
    console.error('ERROR:', error);
  }
})();
