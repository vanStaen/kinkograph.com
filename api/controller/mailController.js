const router = require("express").Router();
const {mailService} = require("../service/mailService");

// Mail
router.post("/", async (req, res) => {
  try {
    if (!req.body.sendto) {
      throw new Error("Please provide a recipient!");
    }
    if (!req.body.subject) {
      throw new Error("Please provide a subject!");
    }
    if (!req.body.body) {
      throw new Error("Please provide an email body!");
    }
    const sendto = req.body.sendto;
    const subject = req.body.subject;
    const body = req.body.body;
    const mailSent = await mailService.mail(sendto, subject, body);
    res.status(200).json({
      sent: mailSent,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// RecoverPassword
router.post("/recover", async (req, res) => {
  try {
    if (!req.body.sendto) {
      throw new Error("Please provide a recipient!");
    }
    const sendto = req.body.sendto;
    const mailSent = await mailService.recover(sendto);
    res.status(200).json({
      sent: mailSent,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// Verify Password
router.post("/emailverify", async (req, res) => {
  try {
    if (!req.body.sendto) {
      throw new Error("Please provide a recipient!");
    }
    const sendto = req.body.sendto;
    const mailSent = await mailService.emailVerify(sendto);
    res.status(200).json({
      sent: mailSent,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});


module.exports = router;