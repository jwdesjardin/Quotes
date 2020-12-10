//dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//mideleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//start database
(async () => {
  const db = require('./models/index');

  try {
    const response = await db.sequelize.authenticate();
    console.log('connection successfully established');
  } catch (err) {
    console.log('ERROR in establishing connection');
  }

  await db.sequelize.sync({});
})();

// Greeting for api
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

//use routes
const tagRoutes = require('./routes/tag.js');
const authorRoutes = require('./routes/author.js');
const quoteRoutes = require('./routes/quote.js');
app.use('/tag', tagRoutes);
app.use('/author', authorRoutes);
app.use('/quote', quoteRoutes);

// 404 route
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route Not Found',
    },
  });
});

// global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: [ err.message ],
      stack: err.stack,
    },
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// listen on port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
