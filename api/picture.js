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

// GET all data from user
router.get("/", async (req, res) => {
    if (!req.isAuth) {
        res.status(401).json({
            error: "Unauthorized",
        });
        return;
    }
    try {
        const user = await client.query(`SELECT * FROM users WHERE userid='${req.userId}'`);
        res.status(201).json(user.rows);
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});

// PATCH single user from daily (based on userId)
router.post("/", async (req, res) => {
    try {
        const createQuery = `INSERT INTO public.users(userid, name, picurl, activities) VALUES(${req.body.userid}, ${req.body.name}, ${req.body.picurl}, ${req.body.activities});`;
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

// PATCH single user from daily (based on userId)
router.patch("/", async (req, res) => {
    if (!req.isAuth) {
        res.status(401).json({
            error: "Unauthorized",
        });
        return;
    }
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
    const updateQuery = `UPDATE users SET ${updateFieldEdited} WHERE userid='${req.userId}'`;
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
        const deleteUser = `DELETE FROM users WHERE userid='${req.userId}'`;
        await client.query(deleteUser);
        res.status(201).json({ success: `User with id #${req.userId} was deleted.` });
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});


module.exports = router;
