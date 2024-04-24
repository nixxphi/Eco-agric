import mongodb from 'mongodb';

class Plant {
  constructor(name, description, careInstructions) {
    this.name = name;
    this.description = description;
    this.careInstructions = careInstructions;
  }

  static async fetchCropData(cropName, collectionName) {
    try {
      // Connect to MongoDB database using the MongoDB URI from environment variables
      const client = new mongodb.MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();

      // Specify the database name
      const database = client.db(process.env.dbname);

      // Get the specified collection or use a default collection name if not provided
      const collection = database.collection(collectionName || 'plants');

      // Find the crop data by name
      const cropData = await collection.findOne({ name: cropName });
      if (!cropData) {
        throw new Error('Crop not found');
      }

      // Create a new Plant object with the retrieved data
      return new Plant(cropData.name, cropData.description, cropData.careInstructions);
    } catch (error) {
      console.error('Error fetching crop data:', error);
      throw new Error('Failed to fetch crop data');
    } finally {
      // Close the MongoDB connection
      client.close();
    }
  }
}

export default Plant;
