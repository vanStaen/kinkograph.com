const router = require("express").Router();
const { userService } = require("../service/userService");

// Get all user
router.get("/", async (req, res) => {
  /*if (!req.isAdmin) {
  res.status(401).json({
      error: "You do not have administrator rights.",
  });
  return;
  }*/
  try {
    const getAllUser = await userService.getUsers();
    res.status(200).json({
      getAllUser,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// POST new user
router.post("/", async (req, res) => {
  try {
    if (!req.body.userInput.username) {
      throw new Error(
        `No username was provided`,
      );
    }
    if (!req.body.userInput.pwd && !req.body.userInput.access_code) {
      throw new Error(
        `No means of identification (Password or Access Code) were provided!`
      );
    }
    await userService.addUser(req.body.userInput);
    res.status(201).json({ message: "Success! User have been created." });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

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

// POST store Favorites
router.patch("/", async (req, res) => {
  /*if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  } */
  try {
    await userService.updateUser(req.userId, { input: req.body.input });
    res.status(201).json({ message: "Success! The updates have been saved." });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

module.exports = router;
