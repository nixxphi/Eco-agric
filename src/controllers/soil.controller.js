
import { getUserLocation } from '../services/location.service';
import { fetchSoilData } from '../services/soil.service';

async function getSoilData(req, res) {
  try {
    const { latitude, longitude } = req.query || await getUserLocation();
    const soilData = await fetchSoilData(latitude, longitude);
    res.json({ soilData });
  } catch (error) {
    console.error('Error fetching soil data:', error);
    res.status(500).json({ error: 'Failed to fetch soil data' });
  }
}

export default {
  getSoilData,
};
