////////////// GetCompanies ///////////////////////
'use strict';

// Added to handle injection
// const vandium = require('./node_modules/vandium');

let mysql = require('./node_modules/mysql');

exports.handler((event, context, callback) => {

  console.log('\nGetCompanies event: ', event);
  console.log('\nGetCompanies context: ', context);

  //process.env.
  console.log('\nGetCompanies : ', process.env.rds_host);
  console.log('\nGetCompanies : ', process.env.rds_host);
  console.log('\nGetCompanies : ', process.env.rds_user);
  console.log('\nGetCompanies : ', process.env.rds_password);
  console.log('\nGetCompanies : ', process.env.rds_port);
  console.log('\nGetCompanies : ', process.env.rds_database);

    let connection = mysql.createConnection({
      host: process.env.rds_host,
      user: process.env.rds_user,
      password: process.env.rds_password,
//      port: process.env.rds_port,
      database: process.env.rds_database
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
