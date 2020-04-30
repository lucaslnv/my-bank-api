import express from 'express';
import fs from 'fs';
import { promisify } from 'util';

const router = express.Router();
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

//REGISTRO
router.post('/registrar', async (req, res) => {
    try {
      let account = req.body;
      const data = JSON.parse(await readFile(global.fileName, 'utf8'));
      account = { id: data.nextId++, ...account };
      data.accounts.push(account)
      await writeFile(global.fileName, JSON.stringify(data));
      
      res.end();

    } catch (err) {
      res.status(400).send({ error: err.message });
    }
});

//DEPOSITO
router.post('/depositar', async (req, res) => {
  try {
    let newAccountBalance = req.body.newBalance;
    let accountId = req.body.id;
    
    const data = JSON.parse(await readFile(global.fileName, 'utf8'));

    let accountIndex = data.accounts.findIndex(account => account.id === accountId);

    newAccountBalance = data.accounts[accountIndex].balance + newAccountBalance;

    let account = { id: data.accounts[accountIndex].id, nome: data.accounts[accountIndex].name, balance: newAccountBalance };
    
    data.accounts[accountIndex] = account;

    await writeFile(global.fileName, JSON.stringify(data));

    res.end();

  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//SAQUE
router.post('/sacar', async (req, res) => {
  try {
    let newAccountBalance = req.body.newBalance;
    let accountId = req.body.id;
    
    const data = JSON.parse(await readFile(global.fileName, 'utf8'));

    let accountIndex = data.accounts.findIndex(account => account.id === accountId);

    newAccountBalance = data.accounts[accountIndex].balance - newAccountBalance;

    let account = { id: data.accounts[accountIndex].id, nome: data.accounts[accountIndex].name, balance: newAccountBalance };
    
    data.accounts[accountIndex] = account;

    await writeFile(global.fileName, JSON.stringify(data));

    res.end();

  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//CONSULTA SALDO
router.get('/saldo/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName, 'utf8'));
    const account = data.accounts.find(account => account.id === parseInt(req.params.id, 10));
    if (account) {
      res.send(account);
    } else {
      res.send('Conta não encontrada.');
      res.end();
    }

  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete('/deletar/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName, 'utf8'));
    data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id, 10));
    await writeFile(global.fileName, JSON.stringify(data));

    res.end();

  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
