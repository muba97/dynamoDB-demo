'use strict';
const AWS = require('aws-sdk');
module.exports={
  create: async(event,context)=>{
    let bodyObj = {}
    try{
      bodyObj = JSON.parse(event.body)
    }catch(jsonError){
      console.log("There was an error parsing the body",jsonError);
      return {
        statusCode: 400
      }
    }

    if(typeof bodyObj.name === 'undefined' || typeof bodyObj.age ==='undefined'){
      console.log('Missing parameters');
      return {
        statusCode:400
      }
    }

    let putParams= {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Item: {
        name: bodyObj.name,
        age: bodyObj.age
      }
    }
    let putResult = {}
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      putResult = await dynamodb.put(putParams).promise()
    }catch(putError){
      console.log("There was en error putting the kitten");
      console.log("putParams ",putParams);
      return {
        statusCode: 500
      }
    }
    return {
      statusCode:201
    }
  },
  list: async (event, context) => {
    let scanParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE
    }

    let scanResult = {}
    try{
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      scanResult = await dynamodb.scan(scanParams).promise()
    }catch(scanError){
      console.log("There was an error scanning for kittens");
      console.log("scanResult", scanError);
    }
    if(scanResult.Items === null || !Array.isArray(scanResult.Items)|| scanResult.Items.length===0){
      return {
        statusCode: 404
      }
    }
    return{
      statusCode: 200,
      body: JSON.stringify(scanResult.Items.map(kitten=>{
        return {
          name: kitten.name,
          age:kitten.age
        }
      }))
    } 
  },
  get: async (event, context) => {
    let getParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Key:{
        name:event.pathParameters.name
      }
    }
    let getResult={}
    try{
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      dynamodb.get(getParams).promise()
    }catch(getError){
      console.log("There was an error getting the kitten");
      console.log("getError",getError);
      return{
        statusCode:500
      }
    }
    if(getResult.Item= null){
      return{
        statusCode:404
      }
    }
    return{
      statusCode:200,
      body: JSON.stringify({
        name:getResult.Item.name,
        age: getResult.Item.age
      })
    }
  },
  update: async (event, context) => {
    let bodyObj = {};
    try {
      bodyObj = JSON.parse(event.body);
    } catch (jsonError) {
      console.log("There was an error parsing the body", jsonError);
      return {
        statusCode: 400,
      };
    }

    if (typeof bodyObj.age === "undefined") {
      console.log("Missing parameters");
      return {
        statusCode: 400,
      };
    }
    let updateParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Key: {
        name: event.pathParameters.name,
      },
      UpdateExpression: 'set #age = : age',
      ExpressionAttributeName: {
        '#age': 'age'
      },
      ExpressionAttributeValue:{
        ':age': bodyObj.age
      }
    };
    let updateResult = {};
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      dynamodb.update(getParams).promise();
    } catch (updateError) {
      console.log("There was an error updating the kitten");
      console.log("getError", updateError);
      return {
        statusCode: 500,
      };
    }
    return {
      statusCode: 200
    };
  },
  delete: async (event, context) => {
    let deleteParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Key: {
        name: event.pathParameters.name,
      },
    };
    let deleteResult = {};
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      dynamodb.delete(getParams).promise();
    } catch (deleteError) {
      console.log("There was an error deleting the kitten");
      console.log("getError", deleteError);
      return {
        statusCode: 500,
      };
    }
    return {
      statusCode: 200
    };
  }
};
