const { pool } = require('./config');

const getComments = art => {
  return pool
    .query('SELECT * FROM comments WHERE artid=$1', [art.id])
    .catch( err => 
      res
        .status(500)
        .send({ status: `something went wrong`, message: `art could not be retrieved. ${err.message}` })
    )
    .then( results => {
      art.comments = results.rows;
      return art;
    });
};

const anAsyncFunction = async art => {
  return getComments(art);
};

const getArtWithComments = async (arr) => {
  return Promise.all(arr.map(art => anAsyncFunction(art)));
};

module.exports = {
  getAllArt: (req, res) => {

    pool
      .query('SELECT * FROM art')
      .catch( err => 
        res
          .status(500)
          .send({ status: `something went wrong`, message: `art could not be retrieved. ${err.message}` })
      )
      .then( results => {
        
        getArtWithComments(results.rows)
          .then(allArt => {
            res
              .status(200)
              .json(allArt);
          });
      });
  },
  
  getOneArt: (req, res) => {
    const { ID } = req.params;
  
    pool
      .query('SELECT * FROM art WHERE id=$1', [ID])
      .catch( err =>
        res
          .status(500)
          .send({ status: `something went wrong`, message: `art ${ID} could not be retrieved. ${err.message}` })
      )
      .then( results => {
        getArtWithComments(results.rows)
          .then(art => {
            res
              .status(200)
              .json(art);
          });
      });
  },
  
  addComment: (req, res) => {
    const { name, content, userID } = req.body;
    const userid_fix = Number(userID)===0? NULL:Number(userID);
    const { ID } = req.params;
  
    let queryStr = 'INSERT INTO comments (artid, name, content, userid) SELECT $1, $2, $3, $4 WHERE NOT EXISTS (SELECT 1 FROM comments WHERE userid is NULL AND name = $2)';
  
    pool
      .query(queryStr, [ID, name, content, userid_fix])
      .catch( err =>
        res
          .status(500)
          .send({ status: `something went wrong`, message: `comment could not be added. ${err.message}` })
      )
      .then( () =>
        res
          .status(201)
          .send({ status: 'success', message: 'comment added.' })
      );
  },
  
  addUser: (req, res) => {
    const { name, age, location } = req.body;
  
    pool
      .query('INSERT INTO users (name, age, location) VALUES ($1, $2, $3)', [name, age, location])
      .catch( err => 
        res
          .status(500)
          .json({ status: `something went wrong`, message: `user ${name} could not be added. ${err.message}` })
      )
      .then( () =>
        res
          .status(201)
          .json({ status: `success`, message: `user ${name} added.` })
      );
  },
  
  getUsers: (req, res) => {
    pool
      .query('SELECT * FROM users')
      .catch( err =>
        res
        .status(500)
        .json({ status: `something went wrong`, message: `users could not be retrieved. ${err.message}` })
      )
      .then( results => 
        res
        .status(200)
        .json(results.rows)
      );
  },
};