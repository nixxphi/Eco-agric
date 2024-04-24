import User from '../models/user.model.js';

// Controller method to fetch plant recommendations based on user location
export const getPlantRecommendations = async (req, res) => {
  try {
    const { username } = req.user; 
    const user = new User(false, username, '', req.user.location); 
    const selectedPlants = await user.selectPlants();
    res.json({ plants: selectedPlants });
  } catch (error) {
    console.error('Error fetching plant recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch plant recommendations' });
  }
};
