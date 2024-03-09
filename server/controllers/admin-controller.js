const User = require('../../mongo_db/models/user-models');
const Contact = require('../../mongo_db/models/contact-models');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select({'password': 0});
        if ( !users || users.length === 0 ) {
            return res.status(404).json({"message": "No users found."});
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error(`Error during fetching user data from database: ${error}`);
        next(error);
        return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
};

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        if ( !contacts || contacts.length === 0) {
            return res.status(404).json({ "message": "No contacts found." });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        console.error(`Error during fetching contact data from database: ${error}`);
        next(error);
        return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
};

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userData = await User.findOne({_id: id}, {password: 0});
        return res.status(200).json(userData);
    } catch (error) {
        console.error(`Error during updating user data from database: ${error}`);
        next(error);
        return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const { username, email } = req.body;
        const id = req.params.id;
        const updatedData = await User.updateOne(
                                {_id: id}, 
                                { $set: { username: username , email: email }}
                                );
        return res.status(200).json(updatedData);
    } catch (error) {
        console.error(`Error during deleting user data from database: ${error}`);
        next(error);
        return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({_id: id});
        return res.status(200).json({ "message": "User deleted successfully." });
    } catch (error) {
        console.error(`Error during deleting user data from database: ${error}`);
        next(error);
        return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
};

const deleteContactById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({_id: id});
        return res.status(200).json({ "message": "Message deleted successfully." });
    } catch (error) {
        console.error(`Error during deleting message from database: ${error}`);
        next(error);
        return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
};

module.exports = { getAllUsers, getAllContacts, getUserById, 
                    deleteUserById, updateUserById, deleteContactById };

