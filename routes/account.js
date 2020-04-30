const express = require('express');
const fs = require('fs');
const { promisify } = require('util');

const router = express.Router();
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

router.post('/', async (req, res) => {
    try {
      let account = req.body;
      console.log(account);


    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });

  export default router ;
