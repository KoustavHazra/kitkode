const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authControllers = require("../controllers/auth-controller");
const { signupSchema, loginSchema } = require("../../mongo_db/validators/auth-validator");
const { validate } = require("../middleware/validate-middleware");
const { authMiddleware } = require("../middleware/auth-middleware");

router.use(bodyParser.json());


router.route("/").get(authControllers.home);
router.route("/signup").post(validate(signupSchema), authControllers.signup);
router.route("/login").post(validate(loginSchema), authControllers.login);
router.route("/logged_in_user").get(authMiddleware, authControllers.user);

module.exports = router;