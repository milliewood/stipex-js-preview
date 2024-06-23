import stipex from "../../api/stipex"
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Ensure to import uuidv4
import { v4 as uuidv4 } from 'uuid';


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// Global references 
const baseUrl = process.env.STIPEX_BANK_API;
// Special url calls 
////////////////////////////////////////////////////////////

// initialize stipex 
const stipex = stipex();

////////////////////////////////////////////////////////////

const depositUrl = baseUrl + '/api/v1/deposits'
const withdrawalUrl = baseUrl + '/api/v1/withdrawals'
const transferUrl = baseUrl + '/api/v1/transfers/'
const reversalUrl = baseUrl + '/api/v1/reversals'


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

const headers = {
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${token}`,
    'STIPEX_API_KEY': process.env.STIPEX_API_KEY,
    'STIPEX_API_SECRET': process.env.STIPEX_API_SECRET,
    'Idempotency-Key': generateIdempotencyKey(), // Ensure idempotency
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

export async function stipexDeposit() {
    const depositUrl = baseUrl + '/api/v1/deposits'
    ////////////////////////////////////////////////////////////
    // Function to generate an idempotency key
    function generateIdempotencyKey() {
        return uuidv4();
    }

    // Create FormData object with required parameters
    const formData = new FormData();
    for (const key in depositData) {
        formData.append(key, depositData)
    }

    const headers = {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`,
        'STIPEX_API_KEY': process.env.STIPEX_API_KEY,
        'STIPEX_API_SECRET': process.env.STIPEX_API_SECRET,
        'Idempotency-Key': generateIdempotencyKey(), // Ensure idempotency
    }
    
    try {
        // Sending POST request with credentials in headers to deposit api
        const response = await stipex.post(depositUrl, formData, { headers });
        console.log('Stipex Bank:', response.data)
        return response.data;
    } catch (error) {
        console.error('Error creating deposit: ', error);
        throw error;
    }
};

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
export async function stipexWithdrawal() {
    const withdrawalUrl = baseUrl + '/api/v1/withdrawals'

    ////////////////////////////////////////////////////////////
    // Function to generate an idempotency key
    function generateIdempotencyKey() {
        return uuidv4();
    }

    // Create FormData object with required parameters
    const formData = new FormData();
    for (const key in withdrawalData) {
        formData.append(key, withdrawalData)
    }

    const headers = {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`,
        'STIPEX_API_KEY': process.env.STIPEX_API_KEY,
        'STIPEX_API_SECRET': process.env.STIPEX_API_SECRET,
        'Idempotency-Key': generateIdempotencyKey(), // Ensure idempotency
    }

    try {
        // Sending POST request wth credentials in the headers to create a withdrawal
        const response = await stipex.post (withdrawalUrl, formData, { headers });
        console.log('Stipex Bank:', response.data)
        return response.data;
    } catch (error) {
        console.error('Error creating withdrawal: ', error)
    }
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
export async function stipextransfer() {
    const transferUrl = baseUrl + '/api/v1/transfers/'

    ////////////////////////////////////////////////////////////
    // Function to generate an idempotency key
    function generateIdempotencyKey() {
        return uuidv4();
    }

    // Create FormData object with required parameters
    const formData = new FormData();
    for (const key in transferData) {
        formData.append(key, transferData)
    }

    const headers = {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`,
        'STIPEX_API_KEY': process.env.STIPEX_API_KEY,
        'STIPEX_API_SECRET': process.env.STIPEX_API_SECRET,
        'Idempotency-Key': generateIdempotencyKey(), // Ensure idempotency
    }

    try {
        const response = await stipex.post(transferUrl, formData, { headers });
        console.log('Stipex Bank:', response.data)
        return response.data;
    } catch (error) {
        console.error('Error creating transfer: ', error);
    }
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

export async function stipexReverse() { 
    const reversalUrl = baseUrl + '/api/v1/reversals'

    ////////////////////////////////////////////////////////////
    // Function to generate an idempotency key
    function generateIdempotencyKey() {
        return uuidv4();
    }

    // Create FormData object with required parameters
    const formData = new FormData();
    for (const key in reversalData) {
        formData.append(key, reversalData)
    }

    const headers = {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`,
        'STIPEX_API_KEY': process.env.STIPEX_API_KEY,
        'STIPEX_API_SECRET': process.env.STIPEX_API_SECRET,
        'Idempotency-Key': generateIdempotencyKey(), // Ensure idempotency
    }

    try {
        const response = await stipex.post(reversalUrl, formData, { headers });
        console.log('Stipex Bank:', response.data)
        return response.data;
    } catch (error) {
        console.error('Error Creating Reversal:', error)
    }
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
