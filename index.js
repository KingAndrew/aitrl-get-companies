////////////// GetCompanies ///////////////////////
'use strict';

// Added to handle injection
const vandium = require('./node_modules/vandium');

let mysql = require('./node_modules/mysql');

exports.handler = vandium.generic()
  .handler((event, context, callback) => {

  console.log('\nGetCompanies event: ', event);
  console.log('\nGetCompanies context: ', context);
  
    let connection = mysql.createConnection({
      host: '[rds_host]',
      user: '[rds_user]',
      password: '[rds_password]',
//      port: '[rds_port]',
      database: '[rds_database]'
    });
    connection.connect(error => {
          if (error) throw error;
          console.log("Connected!");
      });

    let sql = 'SELECT * FROM company';

    console.log('\nGetCompanies SQL: ', sql);

    connection.query(sql, function(error, results, fields) {
      if(error) {
          console.error(error.message);
          throw error;
      }
      else
      {
          console.log('\nGetCompanies Results: ', results[0]);
          callback(null, results);
      }
    });
  })
