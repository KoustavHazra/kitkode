const express = require('express');
const router = express.Router();
const authContactFrom = require("../controllers/contact-controller");


router.route("/contact").post(authContactFrom.contactForm);

module.exports = router;