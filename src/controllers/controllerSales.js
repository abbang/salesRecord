'use strict'

//var SalesView = require('../../public');
let fs = require('fs');
let dateTime = require('node-datetime');
const fastcsv = require("fast-csv");
const db = require('../services/db');
const moment = require('moment');
const tableName = 'records';


exports.report = (req, res) => {
  try{
    const ws = fs.createWriteStream("data.csv");
    const jsonData = [];

    let query1 = 'SELECT * FROM ' + tableName + ' ORDER by `id` DESC';
    db.get().query(query1, (err, results) => {
      if (err) {
          res.send({ 
            status: 400, message: err
          });
          
      } else {

        results.forEach((value, index) => {
          jsonData.push({
            username: value.username,
            age: value.age,
            height: value.height,
            gender: value.gender,
            sales:value.sales,
            last_purchase_date: value.last_purchase_date
          }); 
        })

        fastcsv
        .write(jsonData, { headers: true })
        .on("finish", function() {
          res.send({
            status: 200,
            message: 'success'
          })
        })
        .pipe(ws);
  
      }
    });

  } catch(err) {
    console.log(err);
  }
}

exports.index = (req, res) => {
  return new Promise((resolve) => {
    let ress = {};

    let query1 = 'SELECT * FROM ' + tableName + ' ORDER by `id` DESC';

    db.get().query(query1, (err, result1) => {
        if (err) {
            resolve('Error');
            console.log(err);
        }

        ress.result = result1;

        res.render('salesrecord.handlebars', {
          title: 'Sales Record',
          result: ress.result
        });
    });
  }); 
}

exports.record = (req, res) => {
  try{
    let userCheck = '';
    let jsonCheck = '';
    let csvfile = req.body.files;
    let stream = fs.createReadStream(csvfile);
    let csvData = [];
    let csvStream = fastcsv
      .parse()
      .on("data", function(data) {
        csvData.push(data);
      })
      .on("end", function() {
        csvData.shift();

        let query1 = 'SELECT * FROM ' + tableName + ' ORDER by `id` DESC';
        db.get().query(query1, (err, results) => {
          if (err) {
              res.send({ 
                status: 400, message: err
              });
          }

          if(results.length === 0) {
            firstAdd().then((response) => {
              if(response === 'done') {
              let queryNext ="INSERT INTO records (username, age, height, gender, sales, last_purchase_date) VALUES ?";
                db.get().query(queryNext, [csvData], (error, response) => {  
              });
              stream.pipe(csvStream);
              res.json({
                status: 200,
                message: 'Success'
              });
              }
            });

          } else {
            userCheck = results[0].username;
            jsonCheck = csvData[0];
  
            if(jsonCheck.indexOf(userCheck) > -1) {
              res.json({
                status: 400,
                message: 'Rejected'
              });
            } else {
              let query ="INSERT INTO records (username, age, height, gender, sales, last_purchase_date) VALUES ?";
                db.get().query(query, [csvData], (error, response) => {  
              });
              stream.pipe(csvStream);
              res.json({
                status: 200,
                message: 'Success'
              });
            }
          }
        });
      });
    stream.pipe(csvStream);
  } catch(err) {
    res.send(err)
  }
}

function firstAdd (data) {
  return new Promise((resolve, reject) => {
    try{
      let dataTime = new Date().getTime();
      let query ="INSERT INTO records (username, age, height, gender, sales, last_purchase_date) VALUES ?";
        db.get().query(query, ['sample','27','159','Female','100',dataTime], (error, response) => {  
      });
      resolve('done');
    } catch(err) {
      console.log(err);
    }
  })
}