const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAllArt, getOneArt, addComment, addUser, getUsers } = require('./controller');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Route requests
app
  .route('/api/art')
  .get(getAllArt);

app
  .route('/api/art/:ID')
  .get(getOneArt);

app
  .route('/api/art/:ID/comments')
  .post(addComment);

app
  .route('/api/users')
  .get(getUsers)
  .post(addUser);


// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on port ${process.env.PORT || 3001}!`);
});
