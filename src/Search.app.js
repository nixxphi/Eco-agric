
import User from './models/user.model.js';
import fetch from 'node-fetch';

// Function to search for climate, soil type, recommended crops, and Google Maps image for a given location
const searchLocation = async (latitude, longitude) => {
  try {
    // Create a new user object with the provided location
    const user = new User(false, 'Search', '', { latitude, longitude });

    // Get soil type based on the location
    const soilType = await user.getSoilType();

    // Fetch climate data
    const climateData = await user.getClimateData();

    // Select recommended crops based on soil type
    const recommendedCrops = await user.selectPlants();

    // Generate Google Maps image URL
    const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=12&size=400x300&markers=color:red%7C${latitude},${longitude}&key=YOUR_API_KEY`;

    return {
      soilType,
      climateData,
      recommendedCrops,
      mapImageUrl
    };
  } catch (error) {
    console.error('Error searching location:', error);
    throw new Error('Failed to search location');
  }
};

export default searchLocation;
