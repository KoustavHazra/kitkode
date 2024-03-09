const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const { authMiddleware } = require("../middleware/auth-middleware");
const { adminMiddleware } = require("../middleware/admin-middleware");

router.route("/users").get(
    authMiddleware, 
    adminMiddleware, 
    adminController.getAllUsers
    );
    
router.route("/contacts").get(
    authMiddleware, 
    adminMiddleware, 
    adminController.getAllContacts
    );

router.route("/users/:id").get(
    authMiddleware, 
    adminMiddleware, 
    adminController.getUserById
    );

router.route("/users/update/:id").patch(
    authMiddleware, 
    adminMiddleware, 
    adminController.updateUserById
    );

router.route("/users/delete/:id").delete(
    authMiddleware, 
    adminMiddleware, 
    adminController.deleteUserById
    );

router.route("/contacts/delete/:id").delete(
    authMiddleware, 
    adminMiddleware, 
    adminController.deleteContactById
    );

module.exports = router;