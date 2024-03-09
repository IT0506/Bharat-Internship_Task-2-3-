const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/moneyTracker', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for transactions
const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Set up routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', './public/index.html')); // Send index.html file
});

app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/transactions', async (req, res) => {
  const { description, amount } = req.body;

  try {
    const newTransaction = new Transaction({ description, amount });
    await newTransaction.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});