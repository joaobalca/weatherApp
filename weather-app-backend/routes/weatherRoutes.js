const express = require('express');
const { getWeather, saveCity, getSavedCities, deleteSavedCities } = require('../controllers/weatherController');

const router = express.Router();

router.get('/weather', getWeather);
router.post('/cities', saveCity);
router.get('/cities', getSavedCities);
router.delete('/cities', deleteSavedCities);

module.exports = router;
