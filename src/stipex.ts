require('dotenv').config();
const axios = require('axios');

class StipexJS {
    apiVersion: string;
    headers: { 'Content-Type': string; Authorization: string; };
    constructor() {
        this.apiVersion = process.env.STIPEX_API_VERSION || 'v1'; // Default to 'v1' if not provided
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STIPEX_API_KEY}`
        };
    }

    setHeaders(customHeaders: { 'Content-Type': string; Authorization: string; }) {
        this.headers = { ...this.headers, ...customHeaders };
    }

    async request(endpoint: string, method: string, data: string) {
        try {
            const url = endpoint.includes('http') ? endpoint : `${process.env.STIPEX_HOME_PAGE}/${this.apiVersion}/${endpoint}`;
            const response = await axios({
                method,
                url,
                headers: this.headers,
                data
            });
            return response.data;
        } catch (error) {
            console.error('Error making request:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

module.exports = StipexJS;
