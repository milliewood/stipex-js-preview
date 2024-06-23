import stipex from "../../api/stipex"
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Ensure to import uuidv4
import { v4 as uuidv4 } from 'uuid';


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// Global references 
const baseUrl = process.env.STIPEX_KINETIC_PAY_API;
// initialize stipex 
const stipex = stipex();
const token = localStorage.getItem('jwtToken');

////////////////////////////////////////////////////////////

// Endpoint URLs
const erc20paymentUrl = `${baseUrl}/erc20_token_payments`;
const erc20paymentUrlxId = `${baseUrl}/erc20_token_payments/:id`;

const walletsUrl = `${baseUrl}/wallets`;
const walletsUrlxId = `${baseUrl}/wallets/:id`;

const paymentsUrl = `${baseUrl}/payments`;
const paymentsUrlxId = `${baseUrl}/payments/:id`;

const stipexConnectorUrl = `${baseUrl}/websocket/connect`;
const stipexDisconnectorUrl = `${baseUrl}/websocket/disconnect`;

const chargeFlowUrl = `${baseUrl}/charge_flows`;
const chargeFlowUrlxId = `${baseUrl}/charge_flows/:id`;

// Function to generate an idempotency key
function generateIdempotencyKey() {
    return uuidv4();
}

// Function to handle errors
function handleError(error) {
    console.error('Error:', error);
    throw error;
}

// Function to set common headers
function getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'STIPEX_API_KEY': process.env.STIPEX_API_KEY || '',
      'STIPEX_API_SECRET': process.env.STIPEX_API_SECRET || '',
      'Idempotency-Key': generateIdempotencyKey(),
    };
}

export async function stipexNewERC20Payments(paymentData) {
    try {
      const response = await stipex.post(erc20paymentUrl, paymentData, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
}

export async function stipexGetERC20PaymentsxId(id) {
    const url = `${erc20paymentUrlxId.replace(':id', id)}`;

    try {
        const response = await stipex.get(url, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function stipexGetWalletxId(id) {
    const url = `${walletsUrlxId.replace(':id', id)}`;
    try {
      const response = await stipex.get(url, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
}

export async function stipexNewWallet(walletData) {
    try {
      const response = await stipex.post(walletsUrl, walletData, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
}

export async function stipexNewPayments(paymentData) {
    try {
      const response = await stipex.post(paymentsUrl, paymentData, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
}

export async function stipexWebSocketConnector() {
    try {
      const response = await stipex.post(stipexConnectorUrl, {}, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
}

export async function stipexWebSocketDisconnector() {
    try {
      const response = await stipex.post(stipexDisconnectorUrl, {}, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
}

// Function to perform POST request to /charge_flows
export async function stipexNewChargeFlow(chargeFlowData) {
    try {
      const response = await stipex.post(chargeFlowUrl, chargeFlowData, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
}
  
// Function to perform GET request to /charge_flows/:id
export async function stipexGetChargeFlowxId(id) {
    const url = `${chargeFlowUrlxId.replace(':id', id)}`;
    try {
      const response = await stipex.get(url, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
}