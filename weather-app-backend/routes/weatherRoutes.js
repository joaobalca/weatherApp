const express = require('express');
const { getWeather, saveCity, getSavedCities } = require('../controllers/weatherController');

const router = express.Router();

router.get('/weather', getWeather);
router.post('/cities', saveCity);
router.get('/cities', getSavedCities);

module.exports = router;
