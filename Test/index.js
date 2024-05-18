const { MongoClient } = require('mongodb');
const readline = require('readline');

// Setup readline for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// id variable for the userID
var id = 0;

// MongoDB connection URI and options

const uri = 'mongodb+srv://Muneeb:MuneebZaidi786@cluster0.jspmhtb.mongodb.net/';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function poll(pollName, game, devUser, pollQuestion, dateMade, dateEnded, pollOption1, pollOption2, pollOption3, pollOption4) {
  try {
    // Connect to the MongoDB server

    await client.connect();

    // Select the database and collection
    const database = client.db('userDetails');
    const collection = database.collection('poll');

    // Create the document to be inserted
    const pollDocument = {
      user_ID: id,
      poll_name: pollName,
      game: game,
      dev_user: devUser,
      poll_question: pollQuestion,
      date_made: dateMade,
      date_ended: dateEnded,
      poll_option1: pollOption1,
      poll_option2: pollOption2,
      poll_option3: pollOption3,
      poll_option4: pollOption4
    };

    // Increment id
    id++;

    // Insert the document into the collection
    const result = await collection.insertOne(pollDocument);
    console.log(`Document inserted with _id: ${result.insertedId}`);

    // Close the readline interface and MongoDB connection
    rl.close();
    await client.close();

  } catch (err) {
    console.error(err);
  }
}

//poll("EPIC UPDATE", "League", "Yousif Salman", "Do you want this epic that upgrades sett damages to 2000?", "2024-05-18", "2024-05-14", "Yes", "No", "maybe", "Your Gay");

async function devTable(pollName, game, devUser, pollQuestion) {
    try {
      // Connect to the MongoDB server
  
      await client.connect();
  
      // Select the database and collection
      const database = client.db('userDetails');
      const collection = database.collection('poll');
  
      // Create the document to be inserted
      const pollDocument = {
        user_ID: id,
        poll_name: pollName,
        game: game,
        dev_user: devUser,
      };
  
      // Increment id
      id++;
  
      // Insert the document into the collection
      const result = await collection.insertOne(pollDocument);
      console.log(`Document inserted with _id: ${result.insertedId}`);
  
      // Close the readline interface and MongoDB connection
      rl.close();
      await client.close();
  
    } catch (err) {
      console.error(err);
    }
  }
  
