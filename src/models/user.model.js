import fetch from 'node-fetch';
import plants from './plants.js';
import plant from '.plant.model.js'
import MongoClient from 'mongodb';
import bcrypt from 'bcrypt';

class User {
  constructor(isGuest, username = 'Guest', password = '', location) {
    this.isGuest = isGuest;
    this.username = username;
    this.password = password; // Only relevant for registered users, don't worry Iz
    this.location = location;
    this.observers = [];
  }

  // Method to add observers
  addObserver(observer) {
    this.observers.push(observer);
  }

  // Method to notify observers
  notifyObservers() {
    for (const observer of this.observers) {
      observer.update(this);
    }
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

      // Classify soil based on clay and sand content
      if (clayContent > 40) {
        soilType = 'clay';
      } else if (sandContent > 80) {
        soilType = 'sandy';
      } else if (clayContent >= 20 && sandContent >= 20) {
        soilType = 'loamy';
      } else {
        // Attempt to classify silt and peat (limited by API data)
        if (clayContent < 10 && sandContent < 50) {
          soilType = 'silt';
        } else if (clayContent < 10 && sandContent < 30) {
          soilType = 'peat';
        } else {
          soilType = 'loamy'; // Unclassified (could be silt or peat with a higher clay content... i dont know
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

  // Creating a new user with MongoDB
  async createUser() {
    if (!this.username || !this.password) {
      throw new Error('Username and password are required to create a new user.');
    }

    const mongodbUri = process.env.MONGODB_URI;
    const databaseName = process.env.dbName;

    const client = new MongoClient(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const database = client.db(databaseName);
      const usersCollection = database.collection('users');

      // Check if admin user should be created
      if (this.username === 'admin' && this.password === 'owner') {
        // Hash admin password
        const hashedPassword = await bcrypt.hash(this.password, 10);
        const adminUser = { username: this.username, password: hashedPassword };
        const insertResult = await usersCollection.insertOne(adminUser);
        console.log(`Admin user created with the following ID: ${insertResult.insertedId}`);
        return adminUser;
      }

      // For other users
      const hashedPassword = await bcrypt.hash(this.password, 10); 

      const newUser = { username: this.username, password: hashedPassword };
      const insertResult = await usersCollection.insertOne(newUser);
      console.log(`New user created with the following ID: ${insertResult.insertedId}`);

      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    } finally {
      await client.close();
    }
  }
}

export default User;
