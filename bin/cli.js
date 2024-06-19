#!/usr/bin/env node

const { Command } = require('commander');
const StipexJS = require('../src/stipex');
const program = new Command();
const { fork } = require('child_process');
const path = require('path');
const IntaSend = require('intasend-node'); // Import IntaSend package

program.version('1.0.0').description('StipexJS CLI for sending JSON data to specified endpoints');

program
  .command('send')
  .description('Send JSON data to an endpoint')
  .requiredOption('-e, --endpoint <endpoint>', 'API endpoint to send data to')
  .requiredOption('-m, --method <method>', 'HTTP method (GET, POST, PUT, DELETE)', 'POST')
  .requiredOption('-d, --data <data>', 'JSON data to send')
  .action(async (cmd) => {
    const { endpoint, method, data } = cmd;
    const stipex = new StipexJS();

    // Set headers if needed
    stipex.setHeaders({
      'STIPEX_BANK_API_KEY': process.env.STIPEX_BANK_API_KEY,
      'STIPEX_API_KEY': process.env.STIPEX_API_KEY,
      'STIPEX_API_SECRET': process.env.STIPEX_API_SECRET,
      'STIPEX_COMPONENT_ID': process.env.STIPEX_COMPONENT_ID,
      'STIPEX_TERMINAL_ID': process.env.STIPEX_TERMINAL_ID,
      'STIPEX_CUSTOMER_ID': process.env.STIPEX_CUSTOMER_ID
    });

    try {
      const jsonData = JSON.parse(data);
      const response = await stipex.request(endpoint, method, jsonData);
      console.log('Response:', response);
    } catch (error) {
      console.error('Request failed:', error.message);
    }
  });

program
  .command('init')
  .description('Initialize StipexJS server')
  .action(() => {
    const stipex = new StipexJS();
    stipex.initServer();
    fork(path.join(__dirname, '../revival/reviveServices.js'));
  });

program
  .command('login')
  .description('Login to StipexJS')
  .action(async () => {
    const stipex = new StipexJS();
    stipex.initServer();
    await stipex.openLogin();
    console.log('Redirecting to login page...');
  });

program.parse(process.argv);
