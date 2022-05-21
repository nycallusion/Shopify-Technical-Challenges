const db = require('./database');
const {errorLogger, errorResponder} = require('./middleware/errorHandler');

// Configure Express
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client/dist')));


// Get all (cRud)
app.get('/api', async(req, res, next) => {
    try {
      
    }
    catch(err){
        next(err);
    }
});

  // Create (Crud)
app.post('/api/warehouse', async(req, res, next) => {
    try {
        let createWH = await db.createWH(req.body.val);
        console.log(createWH)
    }
    catch(err){
        next(err);
    }
});

// Read one (cRud)
app.get('/api/:id', async(req, res, next) => {
    try {

    }
    catch(err){
        next(err);
    }
});

// Update (crUd)
app.put('/api/:id', async(req, res, next) => {
    try {

    }
    catch(err){
        next(err);
    }
});

// Delete (cruD)
app.delete('/api/:id', async(req, res, next) => {
    try {

    }
    catch(err){
        next(err);
    }
});


// error handler
app.use(errorLogger);
app.use(errorResponder);

// Start & Initialize Web Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

db.initialize();