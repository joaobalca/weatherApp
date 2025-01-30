const express = require('express');
const { getWeather, getWeatherDetails, saveCity, getSavedCities, deleteSavedCities } = require('../controllers/weatherController');

const router = express.Router();

router.get('/weather', getWeather);
router.get('/weatherDetails', getWeatherDetails);
router.post('/cities', saveCity);
router.get('/cities', getSavedCities);
router.delete('/cities', deleteSavedCities);

module.exports = router;
