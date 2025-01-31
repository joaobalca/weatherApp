const axios = require('axios');
const City = require('../models/cityModel');

const getWeather = async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    res.json(response.data);
  } 
  catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: `Sorry but it seems to be an invalid location` });
    } 
    else if (error.response && error.response.status === 429) {
      return res.status(429).json({ message: "You have exceeded the API rate limit. Please try again later." });
    } 
    else {
      return res.status(500).json({ message: 'Failed to fetch weather data' });
    }
  }
};

const getWeatherDetails = async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  // Check for missing lat/lon parameters
  if (!lat || !lon) {
    return res.status(400).json({ message: 'Latitude and Longitude are required.' });
  }
  
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: `Details for the provided coordinates not found. Please check and try again.` });
    } 
    else if (error.response && error.response.status === 429) {
      return res.status(429).json({ message: "You have exceeded the API rate limit. Please try again later.", });
    } 
    else {
      return res.status(500).json({ message: 'Failed to fetch data' });
    }
  }
};

const saveCity = async (req, res) => {
  const { name, userId } = req.body;

  try {
    const existingCity = await City.findOne({ name: name.toLowerCase(), userId });
    if (existingCity) {
      return res.status(400).json({ message: 'City already added!' });
    }

    const city = new City({ name: name.toLowerCase(), userId });
    const savedCity = await city.save();

    res.status(201).json({
      name: savedCity.name,
      userId: savedCity.userId
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to save the city' });
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
    return res.status(500).json({ message: 'Failed to fetch saved cities.' });
  }
};

const deleteSavedCities = async (req, res) => {
  const { name, userId } = req.body;

  if (!name || !userId) {
    return res.status(400).json({ message: 'City name and User ID are required.' });
  }

  try {
    const deletedCity = await City.findOneAndDelete({ name: name.toLowerCase(), userId });
    if (!deletedCity) {
      return res.status(404).json({ message: 'City not found in your saved list.' });
    }
    res.status(200).json({ message: 'City deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete city.' });
  }
};

module.exports = { getWeather, getWeatherDetails, saveCity, getSavedCities, deleteSavedCities };

