const AWS = require('aws-sdk');
require('dotenv').config(); // Load environment variables

// Set up AWS configuration using environment variables
AWS.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: process.env.MY_AWS_REGION
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = dynamodb;
