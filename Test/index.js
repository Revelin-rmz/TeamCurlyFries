const { MongoClient } = require('mongodb');
const readline = require('readline');

// Setup readline for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// MongoDB connection URI and options
const uri = 'mongodb+srv://Muneeb:MuneebZaidi786@cluster0.jspmhtb.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB");

    // Select the database and collection
    const database = client.db('userDetails');
    const collection = database.collection('upVoteCollection');

    // Get user input for poll description and option
    rl.question('Enter the poll description: ', (pollDescription) => {
      rl.question('Enter the option: ', async (option) => {
        // Create the document to be inserted
        const pollDocument = {
          poll_description: pollDescription,
          option: option
        };

        // Insert the document into the collection
        const result = await collection.insertOne(pollDocument);
        console.log(`Document inserted with _id: ${result.insertedId}`);

        // Close the readline interface and MongoDB connection
        rl.close();
        await client.close();
      });
    });
  } catch (err) {
    console.error(err);
  }
}

run();
