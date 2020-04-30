const express = require('express');
const fs = require('fs');
const { promisify } = require('util');
const accountRouter = require('./routes/account.js');

const app = express();
const port = 3005;

const exists = promisify(fs.exists);
const writeFile = promisify(fs.writeFile);

app.use(express.json());

global.fileName = 'account.json';

app.listen(port, async () => {
    try {
      const fileExists = await exists(global.fileName);
      if (!fileExists) {
        const initialJson = {
          nextId: 1,
          account: []
        };
        await writeFile(global.fileName, JSON.stringify(initialJson));
      }
    } catch (err) {
        console.log(err.message);
    }
    console.log('Servidor rodando na porta '+port);
  });
