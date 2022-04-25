const axios = require('axios');
const jsonwebtoken = require("jsonwebtoken");
require("dotenv/config");

const emailDisclaimer = `
  <br/>
  <hr size="1px" width="100%" color="#CCC">  
  <br/>
  <span style="color: #999">
  <b>Eco friendly</b><br/>
  Please do not print this email unless it is necessary. 
  Every unprinted email helps the environment.<br/><br/>
  <b>Confidentiality</b><br/>
  The information transmitted by this email is intended only for the person or
  entity to which it is addressed. This email may contain proprietary, 
  business-confidential and/or privileged material. If you are not the 
  intended recipient of this message, be aware that any use, review, 
  retransmission, distribution, reproduction or any action taken in 
  reliance upon this message is strictly prohibited. If you received this in error, 
  please contact the sender and delete the material from all computers.<br/><br/>
  <b>Cyber Security</b><br/>
  Do not click on links or attachments from senders that you do not recognize. 
  Be especially wary of .zip or other compressed or executable file types. 
  Do not provide sensitive personal information (like usernames and passwords) over email. 
  Watch for email senders that use suspicious or misleading domain names. 
  If you can’t tell if an email is legitimate or not, please transfer it to us at <u>info@rewaer.com</u>. 
  Be especially cautious when opening attachments or clicking links if you receive an email 
  containing a warning banner indicating that it originated from an external source.<br/><br/>
  <b>Virus transmission</b><br/>
  Warning: Although taking reasonable precautions to ensure no viruses or malicious 
  software are present in this email, the sender cannot accept responsibility for any 
  loss or damage arising from the use of this email or attachments.<br/><br/>
  <b>Personal opinions</b><br/>
  All views and opinions expressed in this email message are the personal opinions 
  of the author and do not represent those of the company. No liability can be held 
  for any damages, however, caused, to any recipients of this message. <br/><br/>
  <b>GDPR</b><br/>
  Rewaer is compliant with the General Data Protection Regulation (GDPR) (EU) 2016/679. 
  We are committed to guaranteeing the security and protection of the private information 
  that we process. To understand more about how we collect, store, and process your personal 
  information in compliance with GDPR, please take a look at our privacy policy
  </span>
  `;


exports.mailService = {

  async mail(sendto, subject, body) {
    const requestBody = {
      "from": "Rewaer <info@rewaer.com>",
      "to": sendto,
      "subject": subject,
      "body": `${body}<br/> ${emailDisclaimer}`,
      "key": process.env.MAILMAN_KEY
    };
    try {
      const response = await axios({
        url: process.env.MAILMAN_URL,
        method: "POST",
        data: requestBody,
      });
      if ((response.status !== 200) & (response.status !== 201)) {
        if (response.status === 401) {
          throw new Error(`Error! Unauthorized(401)`);
        } else {
          throw new Error(`Error! Status ${response.status}`);
        }
      }
      //Return true on success
      return true
    } catch (err) {
      console.log(err);
      return false
    }
  },

  async recover(sendto) {
    const recoveryToken = await jsonwebtoken.sign(
      { email: sendto },
      process.env.AUTH_SECRET_KEY_RECOVERY,
      { expiresIn: "10m" }
    );
    const body = `Hello beautiful,<br/>
                  <br/>A recover-link has been requested for this email address.
                  By following this link you'll be able to generate a new password for your account.<br/>
                  <b>If you did not request this, ignore this email</b> and nothing else will happen.<br/>
                  <br/>
                  This link will only be active for 10 minutes. <br/>
                  https://rewaer.com/recoverpwd/${recoveryToken}<br/>
                  <br/>
                  Rewaer App<br/>
                  <i>The Fashion App for minimalistic and sustainable geniuses!</i>
                  <br/>
                  ${emailDisclaimer}`;

    const requestBody = {
      "from": "Rewaer <info@rewaer.com>",
      "to": sendto,
      "subject": "Rewaer.app | Reset your password with this link",
      "body": body,
      "key": process.env.MAILMAN_KEY
    };
    
    try {
      const response = await axios({
        url: process.env.MAILMAN_URL,
        method: "POST",
        data: requestBody,
      });
      if ((response.status !== 200) & (response.status !== 201)) {
        if (response.status === 401) {
          throw new Error(`Error! Unauthorized(401)`);
        } else {
          throw new Error(`Error! Status ${response.status}`);
        }
      }
      //Return true on success
      return true
    } catch (err) {
      console.log(err);
      return false
    }
  },

  async emailVerify(sendto) {
    const emailVerifyToken = await jsonwebtoken.sign(
      { email: sendto },
      process.env.AUTH_SECRET_KEY_EMAILVERIFY,
      { expiresIn: "24h" }
    );
    const body = `Hello georgeous,<br/><br/>
                  Thank you for joining us, and welcome to your next aventure.
                  Protecting our community is the upmost important: By following the link 
                  underneath you will help us verify the email now linked to your account. 
                  This is the first step in getting the "verified-account" status.<br/><br/>
                  <b>If you did not created an account with us, please ignore this email</b> and nothing else will happen.<br/>
                  Feel free anytime to respond to this mail in order to contact us.<br/>
                  <br/>
                  This link will only be active for 24 hours. <br/>
                  https://rewaer.com/emailverify/${emailVerifyToken}<br/>
                  <br/>
                  Rewaer App<br/>
                  <i>Only trees should get new
                  leaves every years.</i>
                  <br/>
                  ${emailDisclaimer}`;

    const requestBody = {
      "from": "Rewaer <info@rewaer.com>",
      "to": sendto,
      "subject": "Rewaer.app | Confirm your email address with this link",
      "body": body,
      "key": process.env.MAILMAN_KEY
    };

    try {
      const response = await axios({
        url: process.env.MAILMAN_URL,
        method: "POST",
        data: requestBody,
      });
      if ((response.status !== 200) & (response.status !== 201)) {
        if (response.status === 401) {
          throw new Error(`Error! Unauthorized(401)`);
        } else {
          throw new Error(`Error! Status ${response.status}`);
        }
      }
      //Return true on success
      return true
    } catch (err) {
      console.log(err);
      return false
    }
  },

};
