import mongodb from 'mongodb';

const CROP_DATA_LINK = 'https://api.data.apps.fao.org/api/v2/bigquery?sql_url=https://data.apps.fao.org/catalog/dataset/86b7daf0-4fae-450b-b88f-76690e2fdc17/resource/0026de2e-c12c-457c-b4f5-8c4cd2ef7960/download/crop-calendar-parameterized-query.sql&crop_process=all&crop=all&download=true';
const MONGODB_URI = process.env.MONGODB_URI; // Replace with your MongoDB URI
const DATABASE_NAME = process.env.dbname;
const COLLECTION_NAME = 'plants';

export async function importCropData() {
  let client;
  try {
    // Fetch crop data
    const cropResponse = await fetch(CROP_DATA_LINK);
    const cropDataList = await cropResponse.json();

    // Connect to MongoDB database using the MongoDB URI
    client = new mongodb.MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Specify the database name
    const database = client.db(DATABASE_NAME);

    // Get the collection
    const collection = database.collection(COLLECTION_NAME);

    // Insert each crop data object into the collection
    for (const cropData of cropDataList) {
      await collection.insertOne(cropData);
      console.log(`Crop data inserted: ${cropData.name}`);
    }

    console.log('Crop data import completed successfully!');
  } catch (error) {
    console.error('Error importing crop data:', error);
  } finally {
    // Close the MongoDB connection
    if (client) {
      await client.close();
    }
  }
}
