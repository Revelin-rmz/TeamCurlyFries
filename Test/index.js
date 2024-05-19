const { MongoClient } = require('mongodb');
const readline = require('readline');

// Setup readline for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const uri = 'mongodb+srv://Muneeb:MuneebZaidi786@cluster0.jspmhtb.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db('userDetails');
}

async function insertDocument(collectionName, document) {
  try {
    const database = await connectToDatabase();
    const collection = database.collection(collectionName);
    const result = await collection.insertOne(document);
    console.log(`Document inserted with _id: ${result.insertedId}`);
  } catch (err) {
    console.error('Error inserting document:', err);
  }
}
async function poll(poll_Name, game_Name, dev_User, poll_Question, date_Made, date_Ended, pollOption1, pollOption2, pollOption3, pollOption4) {
  const pollDocument = {
    poll_name: poll_Name,
    game: game_Name,
    user: dev_User,
    poll_question: poll_Question,
    date_made: date_Made,
    date_ended: date_Ended,
    poll_option1: pollOption1,
    poll_option2: pollOption2,
    poll_option3: pollOption3,
    poll_option4: pollOption4
  };
  await insertDocument('Poll_Table', pollDocument);
}
  
async function dev_UI(game_Name, devUser, pollQuestion, poll_Name) {
  const pollDocument = {
    poll_Title: poll_Name,
    game: game_Name,
    Dev: devUser,
    question: pollQuestion
  };
  await insertDocument('DevUI_Table', pollDocument);
}

  async function Voting_User(Username, Email, Password) {
    const userDocument = {
      voter_name: Username,
      email: Email,
      password: Password
    };
    await insertDocument('Voting_Table', userDocument);
  }

async function Dev_User(Username, Email, Password) {
  const userDocument = {
    Dev_name: Username,
    email: Email,
    password: Password
  };
  await insertDocument('Dev_Table', userDocument);
}

async function main() {
  await poll("EPIC UPDATE", "League", "Yousif Salman", "Do you want this epic ?", "2024-05-18", "2024-05-14", "Yes", "No", "maybe", "Your Gay");
  await dev_UI("League", "Muneeb", "What Should Be Added?", "Leaugue Question");
  await Voting_User("Muneeb04", "max@gg.com", "password123");
  await Dev_User("Developer01", "dev@gg.com", "password456");

  rl.close();
  await client.close();
}

main().catch(console.error);