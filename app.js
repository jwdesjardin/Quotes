const express = require('express');
const morgan = require('morgan');
var cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

(async () => {
    const db = require('./models/index');
  
    try {
      const response = await db.sequelize.authenticate();
      console.log('connection successfully established');
    } catch(err){
      console.log('ERROR in establishing connection');
    } 
    
    await db.sequelize.sync({force: true});
  
})();

const Quote = require('./models').Quote;
const Topic = require('./models').Topic;



/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        // Forward error to the global error handler
        next(error);
      }
    }
}

const tagRoutes = require('./routes/tag.js');
const authorRoutes = require('./routes/author.js');
app.use('/tag', tagRoutes);
app.use('/author', authorRoutes);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
    res.json({
    message: 'Welcome to the REST API project!',
    });
});

/* GET  */
app.get('/quotes', asyncHandler(async (req, res) => {
//Returns the currently authenticated user
    const quotes = await Quote.findAll({
        include: [{
            model: Topic,
            attributes: { exclude: ['id', 'createdAt', 'updatedAt', "QuoteTopics"]},
          }]
    });
    res.status(200).json(quotes);
}));

/* POST  */
app.post('/quotes', asyncHandler(async (req, res) => {
//Returns the currently authenticated user
    const quote = await Quote.create(req.body);
    const topic1 = await Topic.findOne({ where: { id: 1 }});
    const topic2 = await Topic.findOne({ where: { id: 2 }});
    await quote.addTopic(topic1);
    await quote.addTopic(topic2);
    res.status(201).json(quote);
}));

 /* DELETE  */
app.delete('/quotes/:id', asyncHandler(async (req, res) => {

    //Deletes a course and returns no content
    const quote = await Quote.findByPk(req.params.id);
    if(quote) {
      await quote.destroy();
      res.status(204).json({ msg : "Successfuly deleted Course" });
    } else {
      const error = new Error('The Quote could not be located and was not deleted');
      error.status = 404;
      throw error;
    }
  }));

  // send 404 if no other route matched
  app.use((req, res) => {
    res.status(404).json({ error: {
      message: 'Route Not Found',
    }});
  });
  
  // setup a global error handler
  app.use((err, req, res, next) => {
  
    res.status(err.status || 500).json({ error : {
      message: [err.message],
      stack: err.stack
    }});
  });
  
  // set our port
  app.set('port', process.env.PORT || 5000);
  
  // start listening on our port
  const server = app.listen(app.get('port'), () => {
    console.log(`Express server is listening on port ${server.address().port}`);
  });