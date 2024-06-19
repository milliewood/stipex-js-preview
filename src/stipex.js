require('dotenv').config();
const axios = require('axios');
const open = require('open');
const IntaSend = require('intasend-node'); // Import IntaSend package

class StipexJS {
    constructor() {
        this.apiVersion = process.env.STIPEX_API_VERSION || 'v1'; // Default to 'v1' if not provided
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STIPEX_API_KEY}`
        };
        this.server = null;
        this.intaSend = new IntaSend(
            'ISPubKey_live_82d2af7b-b3a7-4b1e-bc5d-f8f255a39d52', // IntaSend Public Key
            'ISSecretKey_live_6d1803e6-76de-4c60-bbb2-09ec631c2d64', // IntaSend Secret Key
            false // Set to false for live environment
        );
    }

    setHeaders(customHeaders) {
        this.headers = { ...this.headers, ...customHeaders };
    }

    async request(endpoint, method, data) {
        try {
            const url = endpoint.includes('http') ? endpoint : `${process.env.STIPEX_HOME_PAGE}/${this.apiVersion}/${endpoint}`;
            const response = await axios({
                method,
                url,
                headers: this.headers,
                data
            });
            await this.billApiCall(); // Charge for API call
            return response.data;
        } catch (error) {
            console.error('Error making request:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async billApiCall() {
        try {
            // Calculate cost for each API call (0.04$)
            const amount = 0.04;
            const response = await this.intaSend.chargeCard({
                amount,
                currency: 'USD',
                email: 'user@example.com', // Provide user's email
                phoneNumber: '254712345678' // Provide user's phone number
            });
            console.log('Payment successful:', response);
        } catch (error) {
            console.error('Payment failed:', error);
        }
    }

    initServer() {
        const express = require('express');
        const bodyParser = require('body-parser');
        const app = express();

        app.use(bodyParser.json());

        app.post('/login', async (req, res) => {
            try {
                const response = await this.request('login', 'POST', req.body);
                res.status(200).json(response);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        
        this.server = app.listen(3000, () => {
            console.log('StipexJS server listening on port 3000');
        });
    }

    async openLogin() {
        const loginUrl = process.env.STIPEX_LOGIN_APP_SERVER;
        if (loginUrl) {
            await open(loginUrl);
        } else {
            console.error('STIPEX_LOGIN_APP_SERVER is not defined in the environment variables.');
        }
    }
}

module.exports = StipexJS;
