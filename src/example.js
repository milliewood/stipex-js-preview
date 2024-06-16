const StipexJS = require('./stipex');

(async () => {
    // Instantiate stipex js
    const stipex = new StipexJS();

    // Set headers 
    stipex.setHeaders({
        'STIPEX_BANK_API_KEY': process.env.STIPEX_BANK_API_KEY,
        'STIPEX_API_KEY': process.env.STIPEX_API_KEY,
        'STIPEX_API_SECRET': process.env.STIPEX_API_SECRET,
        'STIPEX_COMPONENT_ID': process.env.STIPEX_COMPONENT_ID,
        'STIPEX_TERMINAL_ID': process.env.STIPEX_TERMINAL_ID,
        'STIPEX_CUSTOMER_ID': process.env.STIPEX_CUSTOMER_ID
    });

    try {
        const endpoint = process.argv[2];  // Get endpoint from command line arguments
        const data = {};  // Define your data object here
        const response = await stipex.request(endpoint, 'POST', data);
        console.log('Response:', response);
    } catch (error) {
        console.error('Request failed:', error.message);
    }
})();
