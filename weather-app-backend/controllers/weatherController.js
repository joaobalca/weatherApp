const axios = require('axios');
const City = require('../models/cityModel');

const getWeather = async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: `City "${city}" not found. Please check the name and try again.` });
    } else {
      res.status(500).json({ message: error.message || 'An error occurred while fetching weather data.' });
    }
  }
};



const saveCity = async (req, res) => {
  const { name, userId } = req.body;

  try {
    // Check if the city already exists for the user
    const existingCity = await City.findOne({ name: name.toLowerCase(), userId });
    if (existingCity) {
      return res.status(400).json({ message: 'City already added!' });
    }

    // Save the new city
    const city = new City({ name: name.toLowerCase(), userId });
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getSavedCities = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    const cities = await City.find({ userId });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch saved cities.' });
  }
};


module.exports = { getWeather, saveCity, getSavedCities };
