import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://georgelibatique819:WCXKFdFkyFLQ0adB@blazingedge.y4yyk.mongodb.net/?retryWrites=true&w=majority&appName=BlazingEdge";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  ssl: true,
  tlsAllowInvalidCertificates: false, // Keep this false for production
  tlsCAFile: undefined, // Let MongoDB driver handle the CA certificates
})

export async function connectMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log('🟢 MongoDB connected successfully!');
    return client;
  } catch (error) {
    console.error('🔴 Error connecting to MongoDB:', error);
    throw error;
  }
}

// Export the client for reuse across the application
export { client };