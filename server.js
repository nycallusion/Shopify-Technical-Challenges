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
app.get('/api/warehouse', async(req, res, next) => {
    try {
        const data = db.readAll();
        res.json(data);
    }
    catch(err){
        next(err);
    }
});

app.get('/api/:id', async(req, res, next) => {
    try {
        let item = db.findOne(req.params.id)
        res.json(item);
    }
    catch(err){
        next(err);
    }
});

  // Create (Crud)
app.post('/api/warehouse', async(req, res, next) => {
    try {
        let createWH = await db.createWH(req.body.warehouse);
        res.json({
            msg: 'Created',
            data: createWH
        })
    }
    catch(err){
        next(err);
    }
});

app.post('/api', async(req, res, next) => {
    try {
        let createItem = await db.createItem(req.body);
        res.status(200).json({
            msg: 'Created',
            data: createItem
        })
    }
    catch(err){
        next(err);
    }
});


// Update (crUd)
app.put('/api', async(req, res, next) => {
    try {
        db.update(req.body);
        res.status(204).json({msg: 'item updated'});
    }
    catch(err){
        next(err);
    }
});

// Delete (cruD)
app.delete('/api/:warehouse/:id', async(req, res, next) => {
    try {
        const {warehouse, id} = req.params;
        db.delete(warehouse, id);
        res.status(201).json({msg: 'item deleted'})
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