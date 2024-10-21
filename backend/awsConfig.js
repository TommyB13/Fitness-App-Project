const AWS = require('aws-sdk');

// Set up AWS configuration (or ensure it's already configured in AWS CLI)
AWS.config.update({
  accessKeyId: "YOUR_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  region: "YOUR_AWS_REGION" // e.g., "us-west-2"
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = dynamodb;
