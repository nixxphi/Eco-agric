import fetch from 'node-fetch';
import plants from './plants.model'; // Assuming plants.model.js is the path

class User {
  constructor(username, password, location) {
    this.username = username;
    this.password = password;
    this.location = location;
  }

  async getSoilType() {
    try {
      const { latitude, longitude } = this.location;
      const response = await fetch(`https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=clay&property=sand&depth=0-5cm&value=mean`);
      const data = await response.json();
      
      const soilProperties = data.properties;
      const clayContent = soilProperties.find(prop => prop.class === 'clay').value;
      const sandContent = soilProperties.find(prop => prop.class === 'sand').value;

      let soilType;

      // Classifying soil based on clay and sand content
      if (clayContent > 40) {
        soilType = 'clay';
      } else if (sandContent > 80) {
        soilType = 'sandy';
      } else if (clayContent >= 20 && sandContent >= 20) {
        soilType = 'loamy';
      } else {
        // Attempt to classify silt and peat. The API doesnt provide enough info, silt and peat are distinguished by organic matter
        if (clayContent < 10 && sandContent < 50) {
          soilType = 'silt';
        } else if (clayContent < 10 && sandContent < 30) {
          soilType = 'peat';
        } else {
          soilType = 'loamy'; 
        }
      }

      return soilType;
    } catch (error) {
      console.error('Error fetching soil type:', error);
      throw new Error('Failed to fetch soil type');
    }
  }

  async selectPlants() {
    try {
      const soilType = await this.getSoilType();
      
      const plantsForSoilType = plants.default;
      const selectedPlants = plantsForSoilType[soilType.toLowerCase()];
      return selectedPlants;
    } catch (error) {  
      console.error('Error selecting plants:', error);
      throw new Error('Failed to select plants');
    }
  }
}

export default User;
