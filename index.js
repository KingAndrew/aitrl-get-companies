////////////// GetCompanies ///////////////////////
'use strict';

// Added to handle injection
const vandium = require('vandium');

let mysql = require('mysql');

exports.handler = vandium.generic()
  .handler((event, context, callback) => {

    let connection = mysql.createConnection({
      host: '[rds_host]',
      user: '[rds_user]',
      password: '[rds_password]',
      port: '[rds_port]',
      database: '[rds_database]'
    });

    let sql = 'SELECT * FROM company';

    console.log('GetCompanies SQL: ${sql}');

    connection.query(sql, function(error, results, fields) {
      console.log('GetCompanies Results ${results}');
      callback(null, results);
    });
  })