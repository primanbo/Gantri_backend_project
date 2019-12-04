const { pool } = require('./config');

module.exports = {
  getAllArt: (req, res) => {
    pool.query('SELECT * FROM art', (err, results) => {
      if (err) {
        res
        .status(500)
        .send({ status: `something went wrong`, message: `art could not be retrieved. ${err.message}` });    }
      res
        .status(200)
        .json(results.rows);
    });
  },
  
  getOneArt: (req, res) => {
    const { ID } = req.params;
  
    pool.query('SELECT * FROM art WHERE id=$1', [ID], (err, results) => {
      if (err) {
        res
        .status(500)
        .send({ status: `something went wrong`, message: `art ${ID} could not be retrieved. ${err.message}` });
      }
      res
        .status(200)
        .json(results.rows);
    });
  },
  
  addComment: (req, res) => {
    const { name, content, userID } = req.body;
    const userid_fix = Number(userID)===0? NULL:Number(userID);
    const { ID } = req.params;
  
    let queryStr = 'INSERT INTO comments (artid, name, content, userid) SELECT $1, $2, $3, $4 WHERE NOT EXISTS (SELECT 1 FROM comments WHERE userid is NULL AND name = $2)';
  
    pool.query(queryStr, [ID, name, content, userid_fix], err => {
      if (err) {
        res
        .status(500)
        .send({ status: `something went wrong`, message: `comment could not be added. ${err.message}` });
      } else {
        res
          .status(201)
          .send({ status: 'success', message: 'comment added.' });
      }
    });
  },
  
  addUser: (req, res) => {
    const { name, age, location } = req.body;
  
    pool.query('INSERT INTO users (name, age, location) VALUES ($1, $2, $3)', [name, age, location], err => {
      if (err) {
        res
        .status(500)
        .json({ status: `something went wrong`, message: `user ${name} could not be added. ${err.message}` });
      }
      res
        .status(201)
        .json({ status: `success`, message: `user ${name} added.` });
    });
  },
  
  getUsers: (req, res) => {
    pool.query('SELECT * FROM users', (err, results) => {
      if (err) {
        res
        .status(500)
        .json({ status: `something went wrong`, message: `users could not be retrieved. ${err.message}` });
      }
      res
        .status(200)
        .json(results.rows);
    });
  },
}