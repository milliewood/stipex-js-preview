////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
import stipex from "../../api/stipex"
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Ensure to import uuidv4
import { v4 as uuidv4 } from 'uuid';


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// Global references 
const baseUrl = process.env.STIPEX_SWIFT_PAY_API
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
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

// Function to perform POST request to create a new card
export async function stipexNewCard(cardData) {
    const url = `${baseUrl}/cards`;

    try {
        // Create FormData object with required parameters
        const formData = new FormData();
        for (const key in cardData) {
            formData.append(key, cardData[key]);
        }

        // Seding POST request with formData and headers
        const response = await stipex.post(url, formData, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

// Function to perform GET request to retrieve a specific card by ID
export async function stipexGetCardxId(cardId) {
    const url = `${baseUrl}/cards/${cardId}`;

    try {
        // Sending Get request with headers
        const response = await stipex.get(url, {headers: getHeaders() });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

