const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { type, credentials } = req.body;
  console.log('Login type:', type);
  console.log('Credentials:', credentials);

  // Handle the login type and credentials here
  // For example, you might save them to a database or perform some other action

  res.send({ message: 'Login data received successfully' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
