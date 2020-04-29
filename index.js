const express = require('express');
import fs from 'fs';
import { promisify } from 'util';
import accountRouter from './routes/account.js';

const app = express();
const port = 3005;

app.get('/', (req, res) => res.send('Hello World') );

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
