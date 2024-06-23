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

// Function to perform POST request to create a new headless payment
export async function stipexNewHeadlessPayment(paymentData) {
    const url = `${baseUrl}/headless_payments`;

    try {
        const response = await stipex.post(url, paymentData, { headers: getHeaders()});
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

// Function to perform GET request to retrieve all headless payments by ID
export async function stipexGetHeadlessPaymentxId(paymentId) {
    const url = `${baseUrl}/headless_payments/${paymentId}`;

    try {
        const response = await stipex.get(url, { header: getHeaders()});
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

// Function to perform PUT request to update a specific headless payment by ID
export async function stipexUpdateHeadlessPayment(paymentId, updatedPaymentData) {
    const url = `${baseUrl}/headless_payments/${paymentId}`;

    try {
        const response = await stipex.put(url, updatedPaymentData, { headers: getHeaders()});
        return response.data;
    } catch (error) {
        handleError(error)
    }
}

// Function to perform DELETE request to delete a specific headless payment by ID 
export async function stipexDeleteHeadlessPayment(paymentId) {
    const url = `${baseUrl}/headless_payments/${paymentId}`;

    try {
        const response = await stipex.delete(url, { headers: getHeaders()});
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

// Function to perform POST request to create a new user under a specific headless payment
export async function stipexNewUser(headlessPaymentId, userData) {
    const url = `${baseUrl}/headless_payments/${headlessPaymentId}/users`;

    try {
        const response = await stipex.post(url, userData, { headers: getHeaders()});
        return response.data;
    } catch (error) {
        handleError(error);
    }
}


// Function to perform GET request to retrieve all users under a specific headless payment
export async function stipexGetUsers(headlessPaymentId) {
    const url = `${baseUrl}/headless_payments/${headlessPaymentId}/users`;
    
    try {
      const response = await stipex.get(url, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
}
  
  // Function to perform GET request to retrieve a specific user by ID under a specific headless payment
export async function stipexGetUserById(headlessPaymentId, userId) {
    const url = `${baseUrl}/headless_payments/${headlessPaymentId}/users/${userId}`;
    
    try {
      const response = await stipex.get(url, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
}
  
  // Function to perform PUT request to update a specific user by ID under a specific headless payment
export async function stipexUpdateUser(headlessPaymentId, userId, updatedUserData) {
    const url = `${baseUrl}/headless_payments/${headlessPaymentId}/users/${userId}`;
    
    try {
      const response = await stipex.put(url, updatedUserData, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
}
  
  // Function to perform DELETE request to delete a specific user by ID under a specific headless payment
export async function stipexDeleteUser(headlessPaymentId, userId) {
    const url = `${baseUrl}/headless_payments/${headlessPaymentId}/users/${userId}`;
    
    try {
      const response = await stipex.delete(url, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
}

  
// Function to perform POST request to create a new transaction under a specific headless payment
export async function stipexNewTransaction(headlessPaymentId, transactionData) {
    const url = `${baseUrl}/headless_payments/${headlessPaymentId}/transactions`;
    
    try {
      const response = await stipex.post(url, transactionData, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
}


// Function to perform GET request to retrieve all transactions under a specific headless payment
export async function stipexGetTransactions(headlessPaymentId) {
    const url = `${baseUrl}/headless_payments/${headlessPaymentId}/transactions`;
    
    try {
      const response = await stipex.get(url, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
}

// Function to perform GET request to retrieve a specific transaction by ID under a specific headless payment
export async function stipexGetTransactionById(headlessPaymentId, transactionId) {
    const url = `${baseUrl}/headless_payments/${headlessPaymentId}/transactions/${transactionId}`;
    
    try {
      const response = await stipex.get(url, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
}


// Function to perform PUT request to update a specific transaction by ID under a specific headless payment
export async function stipexUpdateTransaction(headlessPaymentId, transactionId, updatedTransactionData) {
    const url = `${baseUrl}/headless_payments/${headlessPaymentId}/transactions/${transactionId}`;
    
    try {
      const response = await stipex.put(url, updatedTransactionData, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
