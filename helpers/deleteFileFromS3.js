const AWS = require('aws-sdk');

const deleteFileFromS3 = async (fileName) => {

    // Define S3 bucket login info
    const s3 = await new AWS.S3({
        accessKeyId: process.env.AWS_IAM_KEY,
        secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
        Bucket: process.env.S3_BUCKET_ID
    });

    const params = {
        Bucket: process.env.S3_BUCKET_ID,
        Key: fileName,
    };

    // Uploading files to the bucket
    await s3.deleteObject(params, function (err, data) {
        if (err) { throw err; }
        console.log(`File deleted successfully`);
    });

}

module.exports = deleteFileFromS3;
