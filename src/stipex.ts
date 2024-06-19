import { config } from 'dotenv';
import axios from 'axios';
import open from 'open';
import IntaSend from 'intasend-node';

class StipexJS {
    apiVersion: string;
    headers: Record<string, string>;
    server: any;
    intaSend: any;

    constructor() {
        config(); // Load environment variables from .env file
        this.apiVersion = process.env.STIPEX_API_VERSION || 'v1';
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STIPEX_API_KEY}`
        };
        this.server = null;
        this.intaSend = new IntaSend(
            'ISPubKey_live_82d2af7b-b3a7-4b1e-bc5d-f8f255a39d52',
            'ISSecretKey_live_6d1803e6-76de-4c60-bbb2-09ec631c2d64',
            false
        );
    }

    setHeaders(customHeaders: Record<string, string>) {
        this.headers = { ...this.headers, ...customHeaders };
    }

    async request(endpoint: string, method: string, data?: any) {
        try {
            const url = endpoint.includes('http') ? endpoint : `${process.env.STIPEX_HOME_PAGE}/${this.apiVersion}/${endpoint}`;
            const response = await axios({
                method,
                url,
                headers: this.headers,
                data
            });
            await this.billApiCall();
            return response.data;
        } catch (error) {
            console.error('Error making request:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async billApiCall() {
        try {
            const amount = 0.04;
            const response = await this.intaSend.chargeCard({
                amount,
                currency: 'USD',
                email: 'user@example.com',
                phoneNumber: '254712345678'
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

        app.post('/login', async (req: any, res: any) => {
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

export default StipexJS;
