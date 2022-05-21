const fs = require('fs');
const path = require('path');
const {error} = require('../middleware/errorHandler');

let db = {};

const writeDB = (db) => {
  fs.writeFileSync('./database/data/db.json', JSON.stringify(db));
};


exports.createWH = (val) => {
  if (!db[val]) {
    db[val] = [];
    writeDB(db);
    return db;
  } else {
    throw error(409, 'Warehouse Location Already Exist' )
  }
};

exports.readAll = () => {

};

exports.readOne = () => {

};

exports.update = () => {

};

exports.delete = () => {

};







exports.dataDir = path.join(__dirname, 'data');
exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
    fs.mkdirSync(exports.dataDir);
    fs.writeFile('./database/data/db.txt', '', function (err) {
      if (err) throw err;
      console.log('database created.');
    });
  }
  if (!Object.keys(db).length){
    let rawData = fs.readFileSync('./database/data/db.json');
    db = JSON.parse(rawData);
    console.log(db);
  }
};
  
