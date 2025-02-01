require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConfig');
const weatherRoutes = require('./routes/weatherRoutes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', weatherRoutes);

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Uncomment the code below to run the server locally
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  
module.exports = app;
  
