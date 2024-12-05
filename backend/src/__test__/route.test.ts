import request from 'supertest';
import express from 'express';
import Connection from '../lib/connection';
import App from '../app';
import fs from 'fs'

describe('API Integration Tests - Users Module', () => {
    let server: App;
    let appInstance: express.Application;

    beforeAll(async () => {

        await Connection.connectDB();

        server = new App();
        appInstance = server.getApp();

    });

    beforeEach(async () => {

    });

    afterEach(async () => {
        await Connection.connectDB();

    });

    test('GET /', async () => {
        const response = await request(appInstance).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome.');
    })


    const sampleCsvFilePath = 'real_estate_listings.csv';

    test('POST /bulk-upload', async () => {
        const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OWQxMjg3NWQxY2Q1M2FkMjU2NWJiMSIsInVzZXJuYW1lIjoiRGV2IiwiZW1haWwiOiJkZXZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkSlFTdUpXRm1EbWRXcFBmdlo0dWU1dS9LTGh2NjFiVy9scWMuay9DNWJ5dEliMTV3ZDcvdUciLCJwaG9uZSI6IjIzNjczMzM3MzMiLCJfX3YiOjB9LCJpYXQiOjE3MDQ4ODEzMzMsImV4cCI6MTcxMzUyMTMzM30.ZB3oVH7xrrQdO2AhyMLoQ7LWlw-ZdFUAnply9pKEMOk'; // Replace with your actual token
        const fileContent = fs.readFileSync(sampleCsvFilePath);
        const response = await request(appInstance)
            .post('/user/bulk-upload')
            .attach('file', fileContent, 'real_estate_listings.csv').set('Authorization', `Bearer ${userToken}`);;
        expect(response.status).toBe(200);

    });

    test('GET /bulk-uploads-list', async () => {
        const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OWQxMjg3NWQxY2Q1M2FkMjU2NWJiMSIsInVzZXJuYW1lIjoiRGV2IiwiZW1haWwiOiJkZXZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkSlFTdUpXRm1EbWRXcFBmdlo0dWU1dS9LTGh2NjFiVy9scWMuay9DNWJ5dEliMTV3ZDcvdUciLCJwaG9uZSI6IjIzNjczMzM3MzMiLCJfX3YiOjB9LCJpYXQiOjE3MDQ4ODEzMzMsImV4cCI6MTcxMzUyMTMzM30.ZB3oVH7xrrQdO2AhyMLoQ7LWlw-ZdFUAnply9pKEMOk'; // Replace with your actual token
        const response = await request(appInstance).get('/user/bulk-uploads-list').set('Authorization', `Bearer ${userToken}`);;
        expect(response.status).toBe(200);
    });

    test('GET /bulk-uploads-errors/:sessionId', async () => {
        const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OWQxMjg3NWQxY2Q1M2FkMjU2NWJiMSIsInVzZXJuYW1lIjoiRGV2IiwiZW1haWwiOiJkZXZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkSlFTdUpXRm1EbWRXcFBmdlo0dWU1dS9LTGh2NjFiVy9scWMuay9DNWJ5dEliMTV3ZDcvdUciLCJwaG9uZSI6IjIzNjczMzM3MzMiLCJfX3YiOjB9LCJpYXQiOjE3MDQ4ODEzMzMsImV4cCI6MTcxMzUyMTMzM30.ZB3oVH7xrrQdO2AhyMLoQ7LWlw-ZdFUAnply9pKEMOk'; // Replace with your actual token
        const sessionId = 'valid_session_id';
        let response = await request(appInstance).get(`/user/bulk-uploads-errors/${sessionId}`).set('Authorization', `Bearer ${userToken}`);
        expect(response.status).toBe(200);
    });

    test('DELETE /bulk-uploads-list/delete', async () => {
        const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OWQxMjg3NWQxY2Q1M2FkMjU2NWJiMSIsInVzZXJuYW1lIjoiRGV2IiwiZW1haWwiOiJkZXZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkSlFTdUpXRm1EbWRXcFBmdlo0dWU1dS9LTGh2NjFiVy9scWMuay9DNWJ5dEliMTV3ZDcvdUciLCJwaG9uZSI6IjIzNjczMzM3MzMiLCJfX3YiOjB9LCJpYXQiOjE3MDQ4ODEzMzMsImV4cCI6MTcxMzUyMTMzM30.ZB3oVH7xrrQdO2AhyMLoQ7LWlw-ZdFUAnply9pKEMOk'; // Replace with your actual token
        let response = await request(appInstance).delete('/user/bulk-uploads-list/delete').set('Authorization', `Bearer ${userToken}`);
        expect(response.status).toBe(200);
    });

    test('DELETE /listings/:id', async () => {
        const listingIdToDelete = '659677457331ca8b1f11c03f';
        const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OWQxMjg3NWQxY2Q1M2FkMjU2NWJiMSIsInVzZXJuYW1lIjoiRGV2IiwiZW1haWwiOiJkZXZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkSlFTdUpXRm1EbWRXcFBmdlo0dWU1dS9LTGh2NjFiVy9scWMuay9DNWJ5dEliMTV3ZDcvdUciLCJwaG9uZSI6IjIzNjczMzM3MzMiLCJfX3YiOjB9LCJpYXQiOjE3MDQ4ODEzMzMsImV4cCI6MTcxMzUyMTMzM30.ZB3oVH7xrrQdO2AhyMLoQ7LWlw-ZdFUAnply9pKEMOk'; // Replace with your actual token

        let response = await request(appInstance)
            .delete(`/user/listings/${listingIdToDelete}`)
            .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(204);
    });

    test('PUT /listings/:id', async () => {
        const listingId = '659677457331ca8b1f11c03f';
        const updatedListing = {
            "title": "12111",
            "description": "1",
            "price": 1,
            "address": "1",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
            "details": {
                "bedrooms": 1,
                "bathrooms": 1,
                "areaSquareFeet": 1,
                "isFurnished": true,
                "hasGarage": true,
                "isPetsAllowed": true,
                "hasSwimmingPool": true,
                "isSecurityEnabled": true,
                "isGatedCommunity": true,
                "hasGarden": true,
                "constructionYear": 1,
                "energyEfficiencyRating": "1",
                "agentName": "1",
                "contactEmail": "1",
                "contactPhone": 1
            }
        };

        const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OWQxMjg3NWQxY2Q1M2FkMjU2NWJiMSIsInVzZXJuYW1lIjoiRGV2IiwiZW1haWwiOiJkZXZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkSlFTdUpXRm1EbWRXcFBmdlo0dWU1dS9LTGh2NjFiVy9scWMuay9DNWJ5dEliMTV3ZDcvdUciLCJwaG9uZSI6IjIzNjczMzM3MzMiLCJfX3YiOjB9LCJpYXQiOjE3MDQ4ODEzMzMsImV4cCI6MTcxMzUyMTMzM30.ZB3oVH7xrrQdO2AhyMLoQ7LWlw-ZdFUAnply9pKEMOk'; // Replace with your actual token

        let response = await request(appInstance)
            .put(`/user/listings/${listingId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send(updatedListing);

        expect(response.status).toBe(200);
     
    });

    test('POST /listings', async () => {
        const testListing = {

            "title": "12111",
            "description": "1",
            "price": 1,
            "address": "1",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
            "details": { "bedrooms": 1, "bathrooms": 1, "areaSquareFeet": 1, "isFurnished": true, "hasGarage": true, "isPetsAllowed": true, "hasSwimmingPool": true, "isSecurityEnabled": true, "isGatedCommunity": true, "hasGarden": true, "constructionYear": 1, "energyEfficiencyRating": "1", "agentName": "1", "contactEmail": "1", "contactPhone": 1 }
        }


        const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OWQxMjg3NWQxY2Q1M2FkMjU2NWJiMSIsInVzZXJuYW1lIjoiRGV2IiwiZW1haWwiOiJkZXZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkSlFTdUpXRm1EbWRXcFBmdlo0dWU1dS9LTGh2NjFiVy9scWMuay9DNWJ5dEliMTV3ZDcvdUciLCJwaG9uZSI6IjIzNjczMzM3MzMiLCJfX3YiOjB9LCJpYXQiOjE3MDQ4ODEzMzMsImV4cCI6MTcxMzUyMTMzM30.ZB3oVH7xrrQdO2AhyMLoQ7LWlw-ZdFUAnply9pKEMOk'; // Replace with your actual token

        let response = await request(appInstance)
            .post('/user/listings')
            .set('Authorization', `Bearer ${userToken}`)
            .send(testListing);

        expect(response.status).toBe(201);
    });
})