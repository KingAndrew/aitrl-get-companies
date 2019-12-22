////////////// GetCompanies ///////////////////////
'use strict';

// Added to handle injection
// const vandium = require('./node_modules/vandium');

// let mysql = require('./node_modules/mysql');
let mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 100,
  host            : process.env.rds_host,
  user            : process.env.rds_user,
  password        : process.env.rds_password,
  database        : process.env.rds_database,
  port            : process.env.rds_port
});

exports.handler = (event, context, callback) => {
  //prevent timeout from waiting event loop
  context.callbackWaitsForEmptyEventLoop = false;
  
  console.log('\nGetCompanies event: ', event);
  console.log('\nGetCompanies context: ', context);

  //process.env.
  console.log('\nGetCompanies : ', process.env.rds_host);
  console.log('\nGetCompanies : ', process.env.rds_user);
  console.log('\nGetCompanies : ', process.env.rds_password);
  console.log('\nGetCompanies : ', process.env.rds_port);
  console.log('\nGetCompanies : ', process.env.rds_database);

  pool.getConnection(function(error, connection) {
    if (error) {
      callback(err);
    } else {
      let sql = 'SELECT * FROM company';
      console.log('\nGetCompanies SQL: ', sql);
      
      connection.query(sql, function(queryError, results) {
        connection.release();

        if(queryError) {
          console.error(queryError.message);
          callback(queryError);
        }
        else
        {
          
          console.log('\nGetCompanies Results: ', results[0]);
          callback(null, results);
        }
      });
    }
  });
};
