const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tutorialDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a basic model for a resource (e.g., 'Item')
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

const Item = mongoose.model('Item', itemSchema);

// GET request
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

// POST request
app.post('/items', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.send(item);
});

// PATCH request
app.patch('/items/:id', async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(item);
});

// DELETE request
app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.send({ message: 'Item deleted' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

