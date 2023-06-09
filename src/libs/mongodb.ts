import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

const client = new MongoClient(uri, options);


// Connect to the database immediately when the module is imported.
client.connect();


// Export the MongoClient instance directly.
export default client