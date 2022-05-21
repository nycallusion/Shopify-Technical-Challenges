const fs = require('fs');
const path = require('path');
const {error} = require('../middleware/errorHandler');
const { v4: uuidv4 } = require('uuid');

let db = {};

const writeDB = (db) => {
  fs.writeFileSync('./database/data/db.json', JSON.stringify(db));
};



exports.createWH = (warehouse) => {
  if (!db[warehouse]) {
    db[warehouse] = [];
    writeDB(db);
    return db;
  } else {
    throw error(409, 'Warehouse Location Already Exist' );
  }
};


exports.createItem = ({warehouse, name, quantity}) => {
  let findWarehouse = db[warehouse];
  if (findWarehouse) {
    for (let i = 0; i < findWarehouse.length; i++) {
      let item = findWarehouse[i];
      if (item.name === name) {
        throw error(409, 'Item Already Exist' );
      }
    }
    let id = uuidv4();
    const newItem = {id, name, quantity};
    db[warehouse].push(newItem);
    writeDB(db);
    return newItem;
  }
};

exports.readAll = () => {
  return db;
};

exports.findOne = (id) => {
  for (const warehouse in db) {
    for (let i = 0; i < db[warehouse].length; i++) {
      console.log(warehouse);
      if (db[warehouse][i].id === id) {
        return db[warehouse][i];
      }
    }
  }
};

exports.update = ({id, quantity, warehouse}) => {
  let updatedItem;

  db[warehouse] = db[warehouse].map(item => {
    if (item.id === id) {
      item.quantity = quantity;
      updatedItem = item;
    }
    return item;
  });
  writeDB(db);
  return updatedItem;
};

exports.delete = (warehouse, id) => {
  let findWarehouse = db[warehouse];
  if (findWarehouse) {
    db[warehouse] = findWarehouse.filter(item => item.id !== id);
    writeDB(db);
    return db;
  } else {
    throw error(404, 'Warehouse Doesnt Exist' );
  }
  return db;
};







exports.dataDir = path.join(__dirname, 'data');
exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
    fs.mkdirSync(exports.dataDir);
    fs.writeFile('./database/data/db.txt', '', function (err) {
      if (err) { throw err; }
      console.log('database created.');
    });
  }
  if (!Object.keys(db).length) {
    let rawData = fs.readFileSync('./database/data/db.json');
    db = JSON.parse(rawData);
    console.log(db);
  }
};
  
