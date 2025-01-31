const request = require('supertest');
const app = require('../server');
const axios = require('axios');
const mongoose = require('mongoose');

jest.mock('axios');

describe('Weather Routes', () => {
  it('should return weather data for a valid city', async () => {
    const mockWeatherData = { name: 'Lisbon', main: { temp: 20 } };
    axios.get.mockResolvedValueOnce({ data: mockWeatherData });

    const response = await request(app).get('/api/weather?city=Lisbon');

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Lisbon');
    expect(response.body.main.temp).toBe(20);
  });

  it('should return 400 if city is missing', async () => {
    const response = await request(app).get('/api/weather');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('City is required');
  });

  it('should return 500 if weather fetch fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API failure'));

    const response = await request(app).get('/api/weather?city=InvalidCity');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Failed to fetch weather data');
  });

  it('should return 429 if API rate limit is exceeded', async () => {
    axios.get.mockRejectedValueOnce({
      response: { status: 429 },
    });

    const response = await request(app).get('/api/weather?city=Lisbon');

    expect(response.status).toBe(429);
    expect(response.body.message).toBe('You have exceeded the API rate limit. Please try again later.');
  });

  it('should return 404 for a non-existent city', async () => {
    axios.get.mockRejectedValueOnce({
      response: { status: 404 },
    });

    const response = await request(app).get('/api/weather?city=NonExistentCity');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Sorry but it seems to be an invalid location');
  });

  it('should return 401 if API key is invalid', async () => {
    axios.get.mockRejectedValueOnce({
      response: { status: 401 },
    });

    const response = await request(app).get('/api/weather?city=Lisbon');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Failed to fetch weather data'); 
  });
  it('should return weather details for valid coordinates', async () => {
    const mockForecastData = {
      city: { name: 'Lisbon' },
      list: [{ main: { temp: 20 } }],
    };
    axios.get.mockResolvedValueOnce({ data: mockForecastData });

    const response = await request(app).get('/api/weatherDetails?lat=38.7169&lon=-9.139');

    expect(response.status).toBe(200);
    expect(response.body.city.name).toBe('Lisbon');
    expect(response.body.list[0].main.temp).toBe(20);
  });

  it('should return 400 if latitude or longitude is missing', async () => {
    const response = await request(app).get('/api/weatherDetails?lat=38.7169');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Latitude and Longitude are required.');
  });

  it('should return 404 for invalid coordinates', async () => {
    axios.get.mockRejectedValueOnce({
      response: { status: 404 },
    });

    const response = await request(app).get('/api/weatherDetails?lat=0&lon=0');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Details for the provided coordinates not found. Please check and try again.');
  });

  it('should return 429 if API rate limit is exceeded', async () => {
    axios.get.mockRejectedValueOnce({
      response: { status: 429 },
    });

    const response = await request(app).get('/api/weatherDetails?lat=38.7169&lon=-9.139');

    expect(response.status).toBe(429);
    expect(response.body.message).toBe('You have exceeded the API rate limit. Please try again later.');
  });

  it('should return 401 if API key is invalid', async () => {
    axios.get.mockRejectedValueOnce({
      response: { status: 401 },
    });

    const response = await request(app).get('/api/weatherDetails?lat=38.7169&lon=-9.139');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Failed to fetch data');
  });

  it('should return 500 for general failures', async () => {
    axios.get.mockRejectedValueOnce(new Error('API failure'));

    const response = await request(app).get('/api/weatherDetails?lat=38.7169&lon=-9.139');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Failed to fetch data');
  });
});

afterAll(async () => {
  // Close the MongoDB connection if it was opened during the test
  await mongoose.connection.close();
});
