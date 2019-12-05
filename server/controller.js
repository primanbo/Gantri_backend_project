const { pool } = require('./config');

const getComments = art => {
  return pool
    .query('SELECT * FROM comments WHERE artid=$1', [art.id])
    .then( results => {
      art.comments = results.rows;
      return art;
    })
    .catch( err => 
      res
        .status(500)
        .send({ status: `something went wrong`, message: `art could not be retrieved. ${err.message}` })
    );
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
      .then( results => {
        getArtWithComments(results.rows)
          .then(allArt => {
            res
              .status(200)
              .json(allArt);
          });
      })
      .catch( err => 
        res
          .status(500)
          .send({ status: `something went wrong`, message: `art could not be retrieved. ${err.message}` })
      );

  },
  
  getOneArt: (req, res) => {
    const { ID } = req.params;
  
    pool
      .query('SELECT * FROM art WHERE id=$1', [ID])
      .then( results => {
        getArtWithComments(results.rows)
          .then(art => {
            res
              .status(200)
              .json(art[0]);
          });
      })
      .catch( err =>
        res
          .status(500)
          .send({ status: `something went wrong`, message: `art ${ID} could not be retrieved. ${err.message}` })
      );

  },
  
  addComment: (req, res) => {

    const { name, content, userID } = req.body;
    const { ID } = req.params;

    let queryStr;
    let queryParams;

    if (userID === undefined && name === undefined) {
      res
        .status(500)
        .send({ status: `something went wrong`, message: `comment could not be added. either name or userID is required.` });
      return;

    } 
    if (typeof userID !== `undefined`) {
      queryStr = 'INSERT INTO comments (artid, content, userid, name) SELECT $1, $2, $3, name FROM users WHERE userid = $3';
      queryParams = [ID, content, userID];
      
    } else {
      queryStr = `INSERT INTO comments (artid, content, userid, name) SELECT $1, $2, NULL, $3 WHERE NOT EXISTS (SELECT 1 FROM comments WHERE userid is NULL AND name='$3')`;
      queryParams = [ID, content, name];
      
    }
    
    pool
      .query(queryStr, queryParams)
      .then( () => {
        res
        .status(201)
        .send({ status: 'success', message: 'comment added.' });
      })
      .catch( err => {
          res
            .status(500)
            .send({ status: `something went wrong`, message: `comment could not be added. ${err.message}` });
      });

  },
  
  addUser: (req, res) => {

    const { name, age, location } = req.body;
  
    pool
      .query('INSERT INTO users (name, age, location) VALUES ($1, $2, $3)', [name, age, location])
      .then( () =>
        res
          .status(201)
          .json({ status: `success`, message: `user ${name} added.` })
      )
      .catch( err => 
        res
          .status(500)
          .json({ status: `something went wrong`, message: `user ${name} could not be added. ${err.message}` })
      );

  },
  
  getUsers: (req, res) => {

    pool
      .query('SELECT * FROM users')
      .then( results => 
        res
        .status(200)
        .json(results.rows)
      )
      .catch( err =>
        res
        .status(500)
        .json({ status: `something went wrong`, message: `users could not be retrieved. ${err.message}` })
      );

  },
};
