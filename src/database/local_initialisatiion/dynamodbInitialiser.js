const log4js = require("log4js");
const logger = log4js.getLogger("clientTable");
const AWS = require("aws-sdk");
AWS.config.update({
  endpoint: "http://localhost:8000",
  region: "eu-west-1"
});
const dynamodb = new AWS.DynamoDB();

function createTable(params, tableName){
    dynamodb.createTable(params, function(err, data) {
    if (err) {
        if (err.code === "ResourceInUseException") {
        logger.info(`Table ${tableName} already exists.`);
        } else {
        logger.error(
            `Unable to create table: ${tableName}. Error JSON:`,
            JSON.stringify(err, null, 2)
        );
        }
    } else {
        logger.info(
        `Created table: ${tableName}. Table description JSON:`,
        JSON.stringify(data, null, 2)
        );
    }
    });
}

exports.createTable = createTable;
