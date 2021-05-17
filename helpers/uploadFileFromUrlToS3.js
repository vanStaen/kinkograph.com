const AWS = require('aws-sdk');
const fs = require('fs');

const uploadFileFromUrlToS3 = async (fileUrlLocal, key) => {

    // Define S3 bucket login info
    const s3 = await new AWS.S3({
        accessKeyId: process.env.AWS_IAM_KEY,
        secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
        Bucket: process.env.S3_BUCKET_ID
    });

    const file = await fs.readFileSync(fileUrlLocal);

    const params = {
        Bucket: process.env.S3_BUCKET_ID,
        Key: key,
        Body: file,
        ACL: 'public-read',
    };

    //console.log("key", key);
    //console.log("file", file);

    // Uploading files to the bucket
    await s3.upload(params, function (err, data) {
        if (err) { throw err; }
        //console.log(`File uploaded successfully. ${data.Location}`);
    }); 
    
    const url = `https://${process.env.S3_BUCKET_ID}.s3.eu-central-1.amazonaws.com/${key}`
    return url;
    
}

module.exports = uploadFileFromUrlToS3;


/*
### SOLUTION 1 : THEN/CATCH

uploadFileFromUrlToS3('./public/uploads/d7894ac0-2f45-11eb-af5b-1def7dbe0c26', 'd7894ac0-2f45-11eb-af5b-1def7dbe0c26')
    .then(finalURL => {
        console.log('Wait until it happens');
        console.log(finalURL);
    });

### SOLUTION 2 : AWAIT/SYNC

async function testrun() {
    const finalURL = await uploadFileFromUrlToS3('./public/uploads/d7894ac0-2f45-11eb-af5b-1def7dbe0c26', 'd7894ac0-2f45-11eb-af5b-1def7dbe0c26')
    console.log('Wait until it happens');
    console.log(finalURL);
}
testrun();

*/


