StipexJS
StipexJS is a Node.js package designed for dynamic API integrations, allowing you to send requests to various endpoints with customizable headers and JSON data.

Installation
To install stipexjs, you can add it to your Node.js project using npm:

sh
Copy code
npm install stipexjs
Usage
Basic Usage
javascript
Copy code
const StipexJS = require('stipexjs');

// Instantiate stipex js
const stipex = new StipexJS();

// Set headers (optional)
stipex.setHeaders({
    'STIPEX_BANK_API_KEY': 'your_bank_api_key',
    'STIPEX_API_KEY': 'your_api_key',
    'STIPEX_API_SECRET': 'your_api_secret',
    'STIPEX_COMPONENT_ID': 'your_component_id',
    'STIPEX_TERMINAL_ID': 'your_terminal_id',
    'STIPEX_CUSTOMER_ID': 'your_customer_id'
});

(async () => {
    try {
        const endpoint = 'your_endpoint'; // Specify your API endpoint
        const method = 'POST'; // Specify HTTP method (GET, POST, PUT, DELETE, etc.)
        const data = {
            key: 'value' // JSON data to send
        };

        const response = await stipex.request(endpoint, method, data);
        console.log('Response:', response);
    } catch (error) {
        console.error('Request failed:', error.message);
    }
})();


CLI Usage
StipexJS also provides a CLI for sending JSON data to endpoints. Install stipexjs globally to use the CLI:

sh

npm install -g stipexjs
Use the CLI to send JSON data:

sh

stipexjs send -e https://your-endpoint.com -m POST -d '{"key": "value"}'
Replace https://your-endpoint.com with your actual endpoint and {"key": "value"} with your JSON data.

Environment Variables
For both the package usage and CLI, StipexJS relies on environment variables for configuration. Create a .env file in your project root with the following variables:

env

STIPEX_TERMINAL_ID='your_terminal_id'
STIPEX_CUSTOMER_ID='your_customer_id'
STIPEX_BANK_API_KEY='your_bank_api_key'
STIPEX_API_KEY='your_api_key'
STIPEX_API_SECRET='your_api_secret'
STIPEX_COMPONENT_ID='your_component_id'
STIPEX_API_VERSION='v1'  # Optional: Specify your API version if needed

Make sure to replace 'your_terminal_id', 'your_customer_id', 'your_bank_api_key', 'your_api_key', 'your_api_secret', 'your_component_id', and 'https://stipex.co' with your actual values.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contributing
Contributions are welcome! Fork the repository and submit a pull request.

Issues
If you encounter any issues or have questions, please open an issue on GitHub.

Credits
StipexJS is maintained by Greg Maina.