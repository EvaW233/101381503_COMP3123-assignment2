const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/comp3123_assignment1';


mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log(`Connected to MongoDB on ${dbURI}`);
});

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed due to application termination');
    process.exit(0);
  });
});

module.exports = db;
