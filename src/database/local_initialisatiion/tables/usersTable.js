'use strict';

const { createTable } = require("../dynamodbInitialiser");

const tableName = "Users";

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

createTable(params, tableName);
