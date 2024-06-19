require('dotenv').config();
const axios = require('axios');

const urls = [
  process.env.STIPEX_LOGIN_API_SERVER,
  process.env.STIPEX_LOGIN_APP_SERVER,
  process.env.STIPEX_HOME_PAGE,
  process.env.STIPEX_DOCS,
  process.env.STIPEX_F_MPESA,
  process.env.STIPEX_ASSISTANT,
  process.env.STIPEX_KINETIC_PAY_API,
  process.env.STIPEX_SWIFT_PAY_API,
  process.env.STIPEX_BANK_API,
  process.env.STIPEX_SPLIT_CHARGE,
  process.env.STIPEX_CURRENCY_API,
  process.env.STIPEX_HEADLESS_PAYMENTS_API,
  process.env.STIPEX_QRCODE_API,
  process.env.STIPEX_PAY_FUNCTION_GERMANY,
  process.env.STIPEX_PAY_FUNCTION_VIRGINIA,
  process.env.STIPEX_PAY_FUNCTION_SINGAPORE,
  process.env.STIPEX_CUSTOMER_API,
  process.env.STIPEX_CREDENTIALS_API,
  process.env.STIPEX_TERMINAL_API,
  process.env.STIPEX_REWARDS_API,
  process.env.STIPEX_TERMINAL,
  process.env.STIPEX_PRODUCTS_API
];

async function reviveServices() {
  while (true) {
    for (const url of urls) {
      if (url) {
        try {
          await axios.get(url);
          console.log(`Successfully pinged: ${url}`);
        } catch (error) {
          console.error(`Failed to ping: ${url}`, error.message);
        }
      }
    }
    await new Promise(resolve => setTimeout(resolve, 100000)); // 100 seconds
  }
}

reviveServices();
