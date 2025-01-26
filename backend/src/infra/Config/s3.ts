const AWS = require('aws-sdk');


const s3 = AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
    region: process.env.AWS_REGION
});

module.exports = s3;