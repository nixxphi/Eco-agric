import { getUserLocation } from '../services/location.service';
import { fetchClimateData } from '../services/climate.service';

async function getClimateData(req, res) {
  try {
    const { latitude, longitude } = req.query || await getUserLocation();
    const climateData = await fetchClimateData(latitude, longitude);
    res.json({ climateData });
  } catch (error) {
    console.error('Error fetching climate data:', error);
    res.status(500).json({ error: 'Failed to fetch climate data' });
  }
}

export { getClimateData };
