
const User = require('../../mongo_db/models/user-models');

// Home Logic
const home = async (req, res) => {
    try {
      res.status(200).json({ msg: "Welcome to puzzles." });
    } catch (error) {
        console.error('Error during reaching home:', error);
    }
};

// Registration Logic
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(400).json({ message: 'User with the email already exists.' });
        }

        const newUser = await User.create({ username, email, password });
        const token = await newUser.generateToken();
        res.cookie('token', token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),  // 1 day
            httpOnly: true,
            sameSite: "lax"
        });

        console.log(`token in signup server ${token}`);
        
        console.log(`User signed up: ${newUser.email}`);
        return res.status(201).json({ message: "User signed up successfully.", 
                            token: token,
                            userId: newUser._id.toString() });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
};
  
// Login Logic
const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(400).json({ message: 'User not found.' });
        }

        const validPassword = await user.comparePassword(password);
        
        const token = await user.generateToken();
        res.cookie('token', token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),  // 1 day
            httpOnly: true,
            sameSite: "lax"
        });
        
        console.log(`token in login server ${token}`);

        if (validPassword) {
          console.log(`User logged in: ${email}`);
          res.status(200).json({ message: "User logged in successfully.", 
                                token: token,
                                userId: user._id.toString() });
        } else {
          res.status(401).json({ message: 'Unauthorized to login.'})
        }
        
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// to find the logged in user
const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(`userData from logged_in_user server: ${userData}`);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(`error from user route ${error}`);   
    }
}

module.exports = { home, signup, login, user };