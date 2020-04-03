const app = require('./app');

const PORT = '5000';

app.listen(PORT);
console.log(`HTTP server is listening on port ${PORT}.`);
console.log('Mode: ', process.env.DEV ? 'Development.' : 'Production.');

// npm start for development mode
// npm run deploy for production mode