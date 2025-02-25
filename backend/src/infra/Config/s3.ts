import AWS from 'aws-sdk';


interface S3Config {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  region: process.env.AWS_REGION as string
});

export default s3;
