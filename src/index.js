import express from 'express';
import fs from 'fs';
import { promisify } from 'util';
import accountRouter from './routes/account.js';

const app = express();
const port = 3005;

const exists = promisify(fs.exists);
const writeFile = promisify(fs.writeFile);

global.fileName = 'account.json';
app.use(express.json());
app.use('/account', accountRouter);

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
