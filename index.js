const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB using mongoose
mongoose.connect('mongodb+srv://username:password@mydb.rrpxiqa.mongodb.net/mydb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

// Middleware
app.use(bodyParser.json());

// Mongoose schema and model
const { Schema, model } = mongoose;
const userSchema = new Schema({
  name: String,
  age: Number,
  email: String
});
const User = model('User', userSchema);

// Routes
app.post('/users', async (req, res) => {
  const { name, age, email } = req.body;
  try {
    const newUser = new User({ name, age, email });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // HTTP 201: Created
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Internal Server Error');
  }
});

//Read Operation (GET): LIST
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

//GET BY ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update Operation (PUT/PATCH):
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, age, email }, { new: true });
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete Operation (DELETE):
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
