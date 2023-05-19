import * as AWS from "@aws-sdk/client-rekognition";
import * as fs from "fs";

const client = new AWS.Rekognition({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

function find_face(image, cb) {
    client.searchFacesByImage({
        CollectionId: process.env.AWS_COLLECTION_ID,
        FaceMatchThreshold: 80,
        Image: {
            Bytes: image.blob
        },
        MaxFaces: 1
    }, (err, data) => cb(err, data));
}

function clear_faces() {
    client.deleteFaces({
        CollectionId: process.env.AWS_COLLECTION_ID,
        FaceIds: ['ALL']
    }, function(err, data) {
        console.log(err, data)
    });
}

function add_face(image, cb) {
    console.log(`Creating a face for ${image.name}`)
    client.indexFaces({
        CollectionId: process.env.AWS_COLLECTION_ID,
        DetectionAttributes: [ "ALL" ],
        ExternalImageId: image.name,
        Image: {
            Bytes: image.blob
        }
    }, (err, data) => cb(err, data))
}

async function create_collection() {
    const data = await client.send(new AWS.CreateCollectionCommand({
        CollectionId: process.env.AWS_COLLECTION_ID
    }))
    console.log(data)
}

export default {
    find_face,
    add_face,
    clear_faces,
    create_collection
}

