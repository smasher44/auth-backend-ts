import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://georgelibatique819:WCXKFdFkyFLQ0adB@blazingedge.y4yyk.mongodb.net/?retryWrites=true&w=majority&appName=BlazingEdge";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  ssl: true,
  tlsAllowInvalidCertificates: false,
  tlsCAFile: undefined, // Let MongoDB driver handle the CA certificates
})

let retries = 0;
const MAX_RETRIES = 3;

export async function connectMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
      console.log('🟢 MongoDB connected successfully!');
    return client;
  } catch (error) {
    console.error('🔴 Error connecting to MongoDB:', error);

    if (retries < MAX_RETRIES) {
      retries++;
      console.log(`Retrying connection attempt ${retries} of ${MAX_RETRIES}`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      return connectMongoDB();
    }
    throw error;
    // Implement retry logic
    // if (retries < 3) {
    //   await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    //   return connectMongoDB(retries + 1);
    // }

  } finally {
    // Add event listener for connection errors
    client.on('error', (error) => {
      console.error('MongoDB connection error:', error);
      connectMongoDB(); // Try to reconnect
    });
  }
}

// Export the client for reuse across the application
export { client };