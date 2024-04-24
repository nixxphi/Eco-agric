import fetch from 'node-fetch';

async function fetchClimateData(latitude, longitude) {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${longitude}&lat=${latitude}&dim=0.10&api_key=${process.env.API_KEY}`);
    const climateData = await response.json();
    return climateData;
  } catch (error) {
    console.error('Error fetching climate data:', error);
    throw new Error('Failed to fetch climate data');
  }
}

export { fetchClimateData };
