'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const db = {};
const { sequelize }= require('../config/db-connection');

fs.readdirSync(__dirname)
    .forEach(item => {
        const itemPath = path.join(__dirname, item);
        if (fs.statSync(itemPath).isDirectory()) {
            // Look for files ending with model.js in the directory
            fs.readdirSync(itemPath).forEach(file => {
                if (file.endsWith('model.js')) {
                    const modelPath = path.join(itemPath, file);
                    const model = require(modelPath)(sequelize, Sequelize.DataTypes);
                    db[model.tableName] = model;
                }
            });
        } else if (item.endsWith('model.js')) {
            // Directly require and configure the model if it's a file ending with model.js
            const model = require(itemPath)(sequelize, Sequelize.DataTypes);
            db[model.tableName] = model;
        }
    });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
