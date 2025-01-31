const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const City = require('../models/cityModel');

jest.mock('../models/cityModel');

describe('City Routes', () => {
    const mockCity = { name: 'Lisbon', userId: '12345' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should save a new city', async () => {
        City.findOne.mockResolvedValue(null);
        City.prototype.save = jest.fn().mockResolvedValue({
        name: 'Lisbon',
        userId: '12345'
        }); 

        const response = await request(app).post('/api/cities').send({ name: 'Lisbon', userId: '12345' });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Lisbon'); // This should now work
        expect(response.body.userId).toBe('12345');
    });


    it('should return 400 if city is already added', async () => {
        City.findOne.mockResolvedValue(mockCity); 

        const response = await request(app).post('/api/cities').send(mockCity);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('City already added!');
    });

    it('should return saved cities for a user', async () => {
        City.find.mockResolvedValue([mockCity]); 

        const response = await request(app).get('/api/cities').query({ userId: '12345' });

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe('Lisbon');
    });

    it('should return 400 if userId is missing', async () => {
        const response = await request(app).get('/api/cities');

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User ID is required.');
    });

    it('should delete a saved city', async () => {
        City.findOneAndDelete.mockResolvedValue(mockCity);

        const response = await request(app).delete('/api/cities').send(mockCity);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('City deleted successfully.');
    });

    it('should return 404 if city is not found', async () => {
        City.findOneAndDelete.mockResolvedValue(null); 

        const response = await request(app).delete('/api/cities').send(mockCity);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('City not found in your saved list.');
    });

    it('should return 400 if city name or userId is missing', async () => {
        const response = await request(app).delete('/api/cities').send({ name: 'Lisbon' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('City name and User ID are required.');
    });

    it('should return 500 if database operation fails', async () => {
        City.findOne.mockRejectedValue(new Error('Database error')); 

        const response = await request(app).post('/api/cities').send(mockCity);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Failed to save the city');
    });
});
