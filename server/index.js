const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAllArt, getOneArt, addComment, addUser, getUsers } = require('./controller');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

  app
  .route('/api/art')
  // GET endpoint
  .get(getAllArt);

  app
  .route('/api/art/:ID')
  // GET endpoint
  .get(getOneArt);

  app
  .route('/api/art/:ID/comments')
  // POST endpoint
  .post(addComment);

  app
  .route('/api/users')
  // GET endpoint
  .get(getUsers)
  // POST endpoint
  .post(addUser);


// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on port ${process.env.PORT || 3001}!`);
});
