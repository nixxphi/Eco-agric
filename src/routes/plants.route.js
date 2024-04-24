
import express from 'express';
import PlantController from '../controllers/plant.controller.js';

const router = express.Router();

// Route to fetch plant recommendations based on user location
router.get('/plants', PlantController.getPlantRecommendations);

export default router;
