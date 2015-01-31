// Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict'

var Sequelize = require('sequelize'),
    fs = require('fs'),
    _ = require('lodash');


var sequelize = new Sequelize('virtualvulcano', 'root', 'vvroot', {
  host: process.env.DATABASE_PORT_3306_TCP_ADDR,
  dialect: 'mysql',
  logging: false,
});


var models = {};


module.exports = {

  /**
   * Setup database connection and initializes the models.
   */
  setup: function () {
    var relationships = [];

    _.each(fs.readdirSync('app/models'), function (name) {
      // Ignore this very same file
      if (name === 'db.js') {
        return;
      }

      // Extract the model definition object
      var object = require('./' + name);
      var options = object.options || {};

      // The name it's the same as the file without the extension.
      var modelName = name.substring(0, name.length - 3);

      // Replace dashes with lodashes for the table name.
      var tableName = modelName.replace(/\-/g, '_');

      models[modelName] = sequelize.define(tableName, object.model, options);

      relationships.push(object.relations);
    });

    _.each(_.filter(relationships), function (relation) {
      relation(models);
    });

  },

  /**
   * Gets the full list of models.
   * @return {Array.<SequelizeModel>} The list of sequelize models.
   */
  models: function () {
    return models;
  },
  
  /**
   * Gets a model by its name.
   * @param {string} name The name of the model to get.
   * @return {SequelizeModel|undefined} The model with that name or undefined
   * if it cannot be found.
   */
  model: function (name) {
    return models[name];
  },

}
