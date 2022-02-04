const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const bcrypt = require("bcryptjs");
const _ = require("lodash/core");

// Init Postgres
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification

// Connect to Postgres
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  }
});

// GET all tags
router.get("/", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const user = await client.query(
      `SELECT * FROM users WHERE id=${req.userId}`
    );
    res.status(201).json(user.rows);
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// POST store Favorites
router.post("/favorites", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const query = `UPDATE users SET favorites='${req.body.favorites}' WHERE id=${req.userId}`;
    await client.query(query);
    res.status(201).json({ message: "Success! Favorites have been saved." });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// POST new user
router.post("/", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    if (!req.body.name) {
      res.status(400).json({
        error: `No name was provided`,
      });
    }

    if (!req.body.pwd && !req.body.access_code) {
      res.status(400).json({
        error: `No means of identification (Password or Access Code) were provided!`,
      });
    }

    let name = req.body.name;
    let pwd = req.body.pwd;
    let email = req.body.email;
    let access_code = req.body.access_code;
    let infos = req.body.infos;
    let username = req.body.username;

    if (typeof name == "undefined") {
      name = null;
    } else {
      name = `'${name}'`;
    }
    if (typeof pwd == "undefined") {
      pwd = null;
    } else {
      pwd = `'${await bcrypt.hash(pwd, 12)}'`;
    }
    if (typeof access_code == "undefined") {
      access_code = null;
    } else {
      access_code = `'${access_code}'`;
    }
    if (typeof email == "undefined") {
      email = null;
    } else {
      email = `'${email}'`;
    }
    if (typeof infos == "undefined") {
      infos = null;
    } else {
      infos = `'${infos}'`;
    }
    if (typeof username == "undefined") {
      username = null;
    } else {
      username = `'${username}'`;
    }

    const query = `INSERT INTO public.users(
        name, pwd, email, access_code, infos, username)
        VALUES (${name}, 
                ${pwd}, 
                ${email}, 
                ${access_code}, 
                ${infos}, 
                ${username});`;

    console.log(query);

    await client.query(query);
    res.status(201).json({ message: "Success! User have been created." });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

module.exports = router;
