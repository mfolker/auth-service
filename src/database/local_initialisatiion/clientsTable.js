const AWS = require("aws-sdk");
AWS.config.update({
  endpoint: "http://localhost:8000"
});
const dynamodb = new AWS.DynamoDB();

const tableName = "Clients";

const params = {
  TableName: tableName,
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" } //Partition key
  ],
  AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
    if (err.code === "ResourceInUseException") {
      console.log(`Table ${tableName} already exists.`);
    } else {
      console.error(
        `Unable to create table: ${tableName}. Error JSON:`,
        JSON.stringify(err, null, 2)
      );
    }
  } else {
    console.log(
      `Created table: ${tableName}. Table description JSON:`,
      JSON.stringify(data, null, 2)
    );
  }
});
