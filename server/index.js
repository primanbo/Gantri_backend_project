const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
  .get(getTest);

// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on port ${process.env.PORT || 3001}!`);
});
