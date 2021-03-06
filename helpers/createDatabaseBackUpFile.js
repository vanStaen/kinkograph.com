const fs = require('fs');
const { Client } = require("pg");
require('dotenv').config({ path: __dirname + '/./../.env' })


// init Postgres
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: true })
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification


// Connect to Postgres 
client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('Connected to postgres db!')
    }
})

// Fetch content from db
const fetchDatabaseContent = async (table) => {
    try {
        const pictures = await client.query(`SELECT * FROM ${table};`);
        return pictures.rows;
    } catch (err) {
        console.log({ error: `${err})`, });
    }
}

// Write Backup file 
const writeBackupFile = async () => {
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; //Start from 0
        const day = today.getDate();
        const databasePictureContent = await fetchDatabaseContent('pictures');
        const databaseTagsContent = await fetchDatabaseContent('tags');
        const databaseUsersContent = await fetchDatabaseContent('users');
        filenamePic = `picture_db_${day}${month}${year}.json`;
        filenameTag = `tag_db_${day}${month}${year}.json`;
        filenameUser = `user_db_${day}${month}${year}.json`;
        fs.writeFileSync(`../ressources/db_backups/${filenamePic}`, JSON.stringify(databasePictureContent));
        fs.writeFileSync(`../ressources/db_backups/${filenameTag}`, JSON.stringify(databaseTagsContent));
        fs.writeFileSync(`../ressources/db_backups/${filenameUser}`, JSON.stringify(databaseUsersContent));
    } catch (err) {
        console.log({ error: `${err})`, });
    }
};

// Write Backup file 
const excecuteScript = async () => {
    try {
        await writeBackupFile();
        console.log("Backup Success!")
        client.end();
    } catch (err) {
        console.log({ error: `${err})`, });
    }
};

// Running the script
excecuteScript();




