const express = require('express');
const { getWeather, saveCity, getSavedCities } = require('../controllers/weatherController');

const router = express.Router();

router.get('/weather', getWeather); // Fetch weather for a city
router.post('/cities', saveCity); // Save a city to the database
router.get('/cities', getSavedCities); // Retrieve saved cities

module.exports = router;
