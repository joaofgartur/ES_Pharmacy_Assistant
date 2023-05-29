import * as AWS from "@aws-sdk/client-dynamodb";
const client = new AWS.DynamoDBClient({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

async function get_item(id) {
    const params = {
        TableName: process.env.AWS_DYNAMODB_TABLE,
        Key: {
            id: {
                S: id
            }
        }
    }
    return await client.send(new AWS.GetItemCommand(params)) 
}

async function put_item(item) {
    const params = {
        TableName: process.env.AWS_DYNAMODB_TABLE,
        Item: item
    }
    return await client.send(new AWS.PutItemCommand(params)) 
}

async function update_item(id, UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues) {
    const params = {
        TableName: process.env.AWS_DYNAMODB_TABLE,
        Key: {
            id: {
                S: id
            }
        },
        UpdateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues
    }
    return await client.send(new AWS.UpdateItemCommand(params)) 
}

export default {
    get_item,
    put_item,
    update_item
}
