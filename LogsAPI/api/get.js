const AWS = require('aws-sdk'); 
AWS.config.setPromisesDependency(require('bluebird'));

//Dynamo client
const dynamoDb = new AWS.DynamoDB.DocumentClient();

//Perform Dynamo get and return items
module.exports.list = (event, context, callback) => {
  var params = {
    KeyConditionExpression: '#type = :type',
    ExpressionAttributeNames:{
      "#type": "type"
    },
    ExpressionAttributeValues: {
      ':type': event.pathParameters.type
    },
    TableName: "budget"
  };

  const onScan = (err, data) => {
    if (err) {
      console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
      callback(err);
    } else {
      console.log("Scan succeeded.");
      return callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          items: data.Items
        })
      });
    }
  };

  dynamoDb.query(params, onScan);

};