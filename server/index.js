const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const getTest = (req, res) => {
  res
    .status(200)
    .json(`GET success`);
};


  app
  .route('/api/art')
  // GET endpoint
  // .get(getTest);
  .get(getAllArt);

  app
  .route('/api/art/:ID')
  // GET endpoint
  // .get(getTest);
  .get(getOneArt);

  app
  .route('/api/art/:ID/comments')
  // POST endpoint
  // .post(postTest);
  .post(addComment);

  app
  .route('/api/users')
  // GET endpoint
  // .get(getTest)
  .get(getUsers)
  // POST endpoint
  // .post(postTest);
  .post(addUser);


// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on port ${process.env.PORT || 3001}!`);
});
