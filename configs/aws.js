require('dotenv').config({path: './.env'});
const AWS = require('aws-sdk');

const S3_BUCKET =process.env.AWS_BUCKET_NAME;
const REGION ="EU (Paris) eu-west-3";
const ACCESS_KEY_ID=process.env.AWS_ID;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET;



AWS.config.update({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
})

module.exports = {myBucket:myBucket,S3_BUCKET:S3_BUCKET};