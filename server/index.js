// require("dotenv").config();

const express = require('express');
const connectDb = require('../mongo_db/db');
const authRoute = require('./routes/auth-route');
const contactRoute = require('./routes/contact-route');
const adminRoute = require('./routes/admin-route');
const errorMiddleware = require('./middleware/error-middleware');
const cors = require("cors");  // to handle cors error
const cookieParser = require("cookie-parser");

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;
const { auth } = require("./middleware");


app.use(bodyParser.json());  // Middleware to parse JSON bodies

app.use(cookieParser());

connectDb().then(() => {
  app.listen(port, function() {
    console.log(`Example app listening on port ${port}`)
  });
});

// cors handling
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

// routing ( always after handling cors )
app.use(express.json());
app.use(errorMiddleware);
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/admin", adminRoute);

/*
 * Temporary problems array schema
 */
const PROBLEMS = [
    {
      problemId: "1",
      title: "401. Bitwise AND of Numbers Range",
      difficulty: "Medium",
      acceptance: "42%",
      description:
        "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
      exampleIn: "left = 5, right = 7",
      exampleOut: "4",
    },
    {
      problemId: "2",
      title: "205. Add two numbers",
      difficulty: "Medium",
      acceptance: "41%",
      description:
        "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
      exampleIn: "a = 100 , b = 200",
      exampleOut: "300",
    },
    {
      problemId: "3",
      title: "202. Happy Number",
      difficulty: "Easy",
      acceptance: "54.9%",
      description: "Write an algorithm to determine if a number n is happy.",
      exampleIn: "n = 19",
      exampleOut: "true",
    },
    {
      problemId: "4",
      title: "203. Remove Linked List Elements",
      difficulty: "Hard",
      acceptance: "42%",
      description: "Given number k , removed kth element",
      exampleIn: "list: 1->2->3 , k=2",
      exampleOut: "1->3",
    },
    {
      problemId: "5",
      title: "201. Bitwise AND of Numbers Range",
      difficulty: "Medium",
      acceptance: "42%",
      description:
        "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
      exampleIn: "left = 5, right = 7",
      exampleOut: "4",
    },
    {
      problemId: "6",
      title: "205. Add two numbers",
      difficulty: "Medium",
      acceptance: "41%",
      description:
        "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
      exampleIn: "a = 100 , b = 200",
      exampleOut: "300",
    },
    {
      problemId: "7",
      title: "202. Happy Number",
      difficulty: "Easy",
      acceptance: "54.9%",
      description: "Write an algorithm to determine if a number n is happy.",
      exampleIn: "n = 19",
      exampleOut: "true",
    },
    {
      problemId: "8",
      title: "203. Remove Linked List Elements",
      difficulty: "Hard",
      acceptance: "42%",
      description: "Given number k , removed kth element",
      exampleIn: "list: 1->2->3 , k=2",
      exampleOut: "1->3",
    },
  ];


const SUBMISSIONS = [];

// const USERS = [];

// app.get('/', (req, res) => {
//     res.json({
//         message: "hello kitkode!"
//     })
// })


// app.post('/signup', async function(req, res) {
//     const username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;

//     try {
//         const userExists = await User.findOne({ email: email });
//         if (userExists) {
//             res.status(400).json({ message: 'User with the email already exists.' });
//         }

//         const newUser = await User.create({ username, email, password });
        
//         console.log(`User signed up: ${newUser.email}`);
//         return res.status(201).json({ message: "User signed up successfully.", 
//                           token: await newUser.generateToken(),
//                           userId: newUser._id.toString() });

//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


// app.post('/login', async function(req, res) {
//     const email = req.body.email;
//     const password = req.body.password;

//     try {
//         // find the users in the USERS array
//         // const user = USERS.find(user => user.email === email);
//         const user = await User.findOne({ email: email });
//         console.log(user);

//         if (!user) {
//             res.status(400).json({ message: 'User not found.' });
//         }

//         // verify the password
//         // if (user.password !== password) {
//         //     return res.status(403).json({ msg: "Incorrect password" });
//         // }
//         // const validPassword = await bcrypt.compare(password, user.password);
//         const validPassword = await user.comparePassword(password);
//         if (validPassword) {
//           console.log(`User logged in: ${email}`);
//           res.status(201).json({ message: "User logged in successfully.", 
//                                 token: await user.generateToken(),
//                                 userId: user._id.toString() });
//         } else {
//           res.status(401).json({ message: 'Unauthorized to login.'})
//         }
        
//         // Send the JWT as a response
//         // return res.json({ message: 'User logged in successfully.', token });
        
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Internal server error.' });
//     }
// });


// app.get('/protected', auth, (req, res) => {
//     res.json({ message: 'Protected route accessed successfully', user: req.user });
// });


// app.post('/logout', function(req, res) {
//     // Clear the token cookie by setting an expired token
//     res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });
//     res.json({ message: 'Logged out successfully' });
// });



// app.get('/problems', (req, res) => {
//     // returns the user all the problem questions from PROBLEMS array
//     const filteredProblems = PROBLEMS.map(x => ({
//         problemId: x.problemId,
//         title: x.title,
//         difficulty: x.difficulty,
//         acceptance: x.acceptance
//     }));

//     res.json({
//         problems: filteredProblems
//     });
// });

// app.get('/problems/:id', (req, res) => {
//     const id = req.params.id;
//     const problem = PROBLEMS.find((x) => x.problemId === id);
//     if (!problem) {
//         return res.status(404).json({ message: 'Problem not found' });
//       }
//     res.json({ problem });
// });

// app.get('/me', auth, (req, res) => {
//     const user = USERS.find((x) => x.id === req.userId);
//     res.json({ email: user.email, id: user.id });
// });
    

// app.post('/submissions', auth, function(req, res) {
//     const isCorrect = Math.random() < 0.5;
//     const problemId = req.body.problemId;
//     const submission = req.body.submission;
//     const submissionTime = new Date(); // Get the current time

//     if (isCorrect) {
//         SUBMISSIONS.push({
//         submission,
//         problemId,
//         userId: req.userId,
//         status: "Accepted",
//         submissionTime: submissionTime // Include submission time
//         });
//         return res.json({
//           status: "Accepted",
//         });
//     } else {
//         SUBMISSIONS.push({
//         submission,
//         problemId,
//         userId: req.userId,
//         status: "Rejected",
//         submissionTime: submissionTime // Include submission time
//         });
//         return res.json({
//           status: "Rejected",
//         });
//     }
// });

// app.get("/submissions/:problemId", auth, (req, res) => {
//   const problemId = req.params.problemId;

//   const submissions = SUBMISSIONS.filter(
//     (x) => x.problemId === problemId // && x.userId === req.userId
//   );
//   console.log("Filtered Submissions:", submissions);
//   res.json({ "Filtered Submissions" : submissions });
// });







