import fetch from 'node-fetch';

async function fetchClimateData(latitude, longitude) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}`);
    const climateData = await response.json();
    return climateData;
  } catch (error) {
    console.error('Error fetching climate data:', error);
    throw new Error('Failed to fetch climate data');
  }
}

export { fetchClimateData };
