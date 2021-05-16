const express = require("express");
const router = express.Router();
const { Client } = require("pg");


// Init Postgres
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: true })
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification

// Connect to Postgres 
client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    }
})

// GET all pictures from user
router.get("/", async (req, res) => {
    try {
        const user = await client.query(`SELECT * FROM pictures`);
        res.status(201).json(user.rows);
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});

// POST picture (based on Id)
router.post("/", async (req, res) => {
    try {
        const createQuery = `INSERT INTO public.pictures(id, url, tags) VALUES(${req.picDd}, ${req.body.url}, ${req.body.tags});`;
        await client.query(createQuery);
        res.status(200).json({
            success: `User created.`,
        });
    } catch (error) {
        res.status(400).json({
            error: `${err}`,
        });
    }
});

// PATCH picture (based on Id)
router.patch("/", async (req, res) => {
    let updateField = '';
    if (req.body.name) {
        updateField = updateField + "name='" + req.body.name + "',";
    }
    if (req.body.picurl) {
        updateField = updateField + "picurl='" + req.body.picurl + "',";
    }
    if (req.body.activities) {
        updateField = updateField + "activities='" + req.body.activities + "',";
    }
    const updateFieldEdited = updateField.slice(0, -1) // delete the last comma
    const updateQuery = `UPDATE pictures SET ${updateFieldEdited} WHERE id='${req.picId}'`;
    try {
        const udpate = await client.query(updateQuery);
        if (udpate.rowCount > 0) {
            res.status(200).json({
                success: `User updated.`,
            });
        } else {
            res.status(400).json({
                error: `No User found with id#${req.params.id}`,
            });
        }
    } catch (err) {
        res.status(400).json({
            error: `${err}`,
        });
    }
});

// DELETE user from table
router.delete("/", async (req, res) => {
    try {
        const deleteUser = `DELETE FROM  WHERE id='${req.picId}'`;
        await client.query(deleteUser);
        res.status(201).json({ success: `User with id #${req.userId} was deleted.` });
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});

module.exports = router;
