const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://username:password@mydb.rrpxiqa.mongodb.net/mydb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

module.exports = db;
