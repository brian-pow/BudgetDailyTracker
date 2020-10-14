'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));

//Dynamo client
const dynamoDb = new AWS.DynamoDB.DocumentClient();

//Handle outgoing request and error
module.exports.submit = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const type = requestBody.type;
  const name = requestBody.name;
  const amount = requestBody.amount;

  submitItem(itemInfo(type, name, amount))
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          message: `Success`,
          id: res.id,
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: err.toString()
      })
    });
};

//Submit (put) to database
const submitItem = item => {
  const itemInfo = {
    TableName: "budget",
    Item: item,
  };
  return dynamoDb.put(itemInfo).promise()
    .then(res => item);
};

//Create and format item to put
const itemInfo = (type, name, amount) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid.v1(),
    type: type,
    name: name,
    amount: amount,
    submittedAt: timestamp,
  };
};