const configuration = require("../config");
const AWS = require("aws-sdk");
AWS.config.update({
    endpoint: configuration.database.endpoint,
    region: configuration.aws.region
});
const dynamodb = new AWS.DynamoDB();
exports.dynamodb = dynamodb;
