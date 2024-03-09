const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});


// securing the password 
userSchema.pre('save', async function(next) {

    const user = this;
    if (!user.isModified('password')) {
        next();
    }

    try {
        // hash the password
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(`Error occurred while hashing user password ${error}`);
    }
});

// generate jwt token
userSchema.methods.generateToken = async function() {
    try {
        const token = jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        }, JWT_SECRET, { expiresIn: '30d' });

        return token;
        
    } catch (error) {
        console.error(`Error occurred while generating JWT token ${error}`);
    }
};

// validating the password
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema); 
// here model has two attributes: 'User' -- collection name
// userSchema -- the structure of the collection

module.exports = User; // Export the User model for use in other files