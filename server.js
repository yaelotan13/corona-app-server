const app = require('./app');
const { mongoConnect } = require('./util/database');

const PORT = process.env.PORT || '5000';

mongoConnect(() => {
    app.listen(PORT);
    console.log(`HTTP server is listening on port ${PORT}.`);
    console.log('Mode: ', process.env.DEV ? 'Development.' : 'Production.');
});

// npm start for development mode
// npm run deploy for production mode
