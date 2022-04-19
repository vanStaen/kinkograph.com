const router = require("express").Router();
const { userService } = require("../service/userService");

// Username Taken? 
router.post("/taken", async (req, res) => {
  try {
    if (!req.body.username) {
      throw new Error("Please provide a 'Username'");
    }
    const username = req.body.username.toLowerCase();
    const usernameTaken = await userService.taken(username);
    res.status(200).json({
      taken: usernameTaken,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// Email exist? 
router.post("/email", async (req, res) => {
  try {
    if (!req.body.email) {
      throw new Error("Please provide an email");
    }
    const email = req.body.email.toLowerCase();
    const emailExist = await userService.email(email);
    res.status(200).json({
      exist: emailExist,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// token still valid exist? 
router.post("/validtoken", async (req, res) => {
  try {
    if (!req.body.token) {
      throw new Error("Please provide a token");
    }
    const token = req.body.token;
    const tokenValid = await userService.validtoken(token);
    res.status(200).json({
      valid: tokenValid,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// Change password 
router.post("/changepassword", async (req, res) => {
  try {
    if (!req.body.token) {
      throw new Error("Please provide a token");
    }
    if (!req.body.password) {
      throw new Error("Please provide a new password");
    }
    const token = req.body.token;
    const password = req.body.password;
    const passwordChanged = await userService.changepassword(token, password);
    res.status(200).json({
      changed: passwordChanged,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});


// Email is verified?
router.post("/emailverified", async (req, res) => {
  try {
    const token = req.body.token;
    const emailIsVerified = await userService.emailverified(token);
    if (emailIsVerified) {
      res.status(200).json({
        emailVerified: emailIsVerified,
      });
    } else {
      res.status(200).json({
        emailVerified: false,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
  4;
});


module.exports = router;