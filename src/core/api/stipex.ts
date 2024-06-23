import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Function to generate an idempotency key
function generateIdempotencyKey() {
  return uuidv4();
}

// Define the origin server URL
const originServer = process.env.REACT_APP_STIPEX_LOGIN_API_SERVER + '/api/v1/protection';

// Generate an idempotency key
const key = generateIdempotencyKey();

// Retrieve the JWT token from localStorage
const token = localStorage.getItem('jwtToken');

// Create an Axios instance with custom headers
const stipex = axios.create({
  baseURL: originServer, // Set the base URL for the Axios instance
  headers: {
    'Content-Type': 'application/json',
    'STIPEX_CUSTOMER_ID': process.env.REACT_APP_STIPEX_CUSTOMER_ID || '', // Ensure fallback to empty string if undefined
    'Authorization': `Bearer ${token}`,
    'STIPEX_API_KEY': process.env.REACT_APP_STIPEX_API_KEY || '', // Ensure fallback to empty string if undefined
    'STIPEX_API_SECRET': process.env.REACT_APP_STIPEX_API_SECRET || '', // Ensure fallback to empty string if undefined
    'STIPEX_COMPONENT_ID': process.env.REACT_APP_STIPEX_COMPONENT_ID || '', // Ensure fallback to empty string if undefined
    'Idempotency-Key': key
  },
});

// Export the Axios instance for use in other parts of the application
export default stipex;
