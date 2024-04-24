// routes/plantRoutes.js

import express from 'express';
import PlantController from '../controllers/plants.controller.js';

const router = express.Router();

// Route to fetch plant recommendations based on user location
router.get('/plants', PlantController.getPlantRecommendations);

// Route to fetch plant recommendations based on location query
router.get('/plants/location', PlantController.getPlantRecommendationsByLocation);

export default router;
