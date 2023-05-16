import * as AWS from "@aws-sdk/client-rekognition";
import * as fs from "fs";
const client = new AWS.Rekognition({
    region: process.env.REGION,
    credentials: {
        accessKeyId: 'adwa',
        secretAccessKey: 'awd'
    }
});

function test() {
    client.compareFaces({
        SourceImage: {
            Bytes: fs.readFileSync('./images/a.jpg')
        },
        TargetImage: {
            Bytes: fs.readFileSync('./images/b.jpg')
        }
    }, (err, data) => {
        console.log(err, data)
    });
}

export default test

