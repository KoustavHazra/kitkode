const Contact = require('../../mongo_db/models/contact-models');

const contactForm = async (req, res) => {
    try {
        const response = req.body;
        console.log("Received message:", response);
        await Contact.create(response);
        return res.status(201).json({ message: "Message sent successfully.", response });
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ message: 'Message not delivered.' });
    }
};


module.exports = { contactForm };