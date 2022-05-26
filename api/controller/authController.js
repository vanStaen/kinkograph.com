const router = require("express").Router();
const { authService } = require("../service/authService");
const { userService } = require("../service/userService");

// Login
router.post("/login", async (req, res) => {
  try {
    if (!req.body.email && !req.body.username) {
      throw new Error("Please provide at least an 'Email' or a 'Username'");
    }
    if (req.body.remind === undefined) {
      throw new Error("The 'remind me'-flag shoud not be missing!");
    }
    const result = await authService.login(
      req,
      req.body.email,
      req.body.username,
      req.body.pwd,
      req.body.remind
    );
    res.status(200).json({
      result,
    });
  } catch (err) {
    res.status(403).json({
      result: {
        access: false,
        error: `${err}`,
      },
    });
  }
});

// Logout
router.delete("/logout", async (req, res) => {
  try {
    const logoutSuccess = await authService.logout(req);
    if (logoutSuccess) {
      res.status(200).json({
        success: logoutSuccess,
      });
    } else {
      throw new Error("Error during Logout!");
    }
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
  4;
});

// Has access?
router.get("/access", async (req, res) => {
  try {
    const hasAccess = await authService.access(req);
    if (hasAccess) {
      const nbPictureAtLastLogin = await userService.nbPictureAtLastLogin(req.userId);
      res.status(200).json({
        access: hasAccess,
        nb_picture_at_last_login: nbPictureAtLastLogin,
      });
    } else {
      res.status(200).json({
        access: false,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// Has validCode?
router.post("/code", async (req, res) => {
  try {
    if (!req.body.code) {
      throw new Error("Please provide a code to login!");
    }
    const result = await authService.code(req, req.body.code);
    if (result.access) {
      res.status(200).json(result);
    } else {
      res.status(200).json({
        access: false,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

module.exports = router;
