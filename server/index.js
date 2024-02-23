const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const JWT_SECRET = "secret";
const { auth } = require("./middleware");
let USER_ID_COUNTER = 1;
const cors = require("cors");
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

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

const USERS = [];

app.get('/', (req, res) => {
    res.json({
        message: "hello kitkode!"
    })
})


app.post('/signup', async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    

    try {
        const userExists = USERS.find(user => user.email === email);
        if (userExists) {
            res.status(400).json({ message: 'User with the email already exists.' });
        }

        // // hashing the password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and add to the USERS array
        USERS.push({ email, password, id: USER_ID_COUNTER++ });

        // // Generate JWT
        // const token = generateToken(newUser.email);
        
        // // Send JWT in a cookie
        // res.cookie('jwt', token, { httpOnly: true });
        
        // // Send the JWT as a response
        // res.json({ message: 'User signed up successfully.', token });

        console.log(`User signed up: ${email}`);
        return res.json({ message: "User signed up successfully." });
        // Check if the user with the given email already exists
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

});

app.post('/login', async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    try {
        // find the users in the USERS array
        const user = USERS.find(user => user.email === email);
        if (!user) {
            res.status(400).json({ message: 'User not found.' });
        }

        // verify the password
        if (user.password !== password) {
            return res.status(403).json({ msg: "Incorrect password" });
        }

        // Generate JWT -- handle error if jwt token is wrong while using
        const token = jwt.sign({ 
                    id: user.id }, 
                    JWT_SECRET, 
                    { expiresIn: '1h' });
        
        // Send the JWT as a response
        console.log(`User logged in: ${email}`);
        return res.json({ message: 'User logged in successfully.', token });
        
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


app.get('/protected', auth, (req, res) => {
    res.json({ message: 'Protected route accessed successfully', user: req.user });
});


app.post('/logout', function(req, res) {
    // Clear the token cookie by setting an expired token
    res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });
    res.json({ message: 'Logged out successfully' });
});



app.get('/problems', (req, res) => {
    // returns the user all the problem questions from PROBLEMS array
    const filteredProblems = PROBLEMS.map(x => ({
        problemId: x.problemId,
        title: x.title,
        difficulty: x.difficulty,
        acceptance: x.acceptance
    }));

    res.json({
        problems: filteredProblems
    });
});

app.get('/problems/:id', (req, res) => {
    const id = req.params.id;
    const problem = PROBLEMS.find((x) => x.problemId === id);
    if (!problem) {
        return res.status(404).json({ message: 'Problem not found' });
      }
    res.json({ problem });
});

app.get('/me', auth, (req, res) => {
    const user = USERS.find((x) => x.id === req.userId);
    res.json({ email: user.email, id: user.id });
});
    

// app.get('/submissions', auth, function(req, res) {
//     // returns the user submissions for this problem
//     const userSubmissions = SUBMISSIONS.filter(submission => submission.email === req.user.email);
//     res.json(userSubmissions);
// })

app.post('/submissions', auth, function(req, res) {
    const isCorrect = Math.random() < 0.5;
    const problemId = req.body.problemId;
    const submission = req.body.submission;
    const submissionTime = new Date(); // Get the current time

    if (isCorrect) {
        SUBMISSIONS.push({
        submission,
        problemId,
        userId: req.userId,
        status: "Accepted",
        submissionTime: submissionTime // Include submission time
        });
        return res.json({
          status: "Accepted",
        });
    } else {
        SUBMISSIONS.push({
        submission,
        problemId,
        userId: req.userId,
        status: "Rejected",
        submissionTime: submissionTime // Include submission time
        });
        return res.json({
          status: "Rejected",
        });
    }
});

app.get("/submissions/:problemId", auth, (req, res) => {
  const problemId = req.params.problemId;

  const submissions = SUBMISSIONS.filter(
    (x) => x.problemId === problemId // && x.userId === req.userId
  );
  console.log("Filtered Submissions:", submissions);
  res.json({ "Filtered Submissions" : submissions });
});

// other routes to create:
    // 1. leaving as hard todos

// Route to add a new problem (only accessible to admins)
// app.post('/add_problem', auth, function(req, res) {
//     const { title, description, testcases } = req.body;
//     // Check if the user is an admin (for demonstration purposes, consider admin email hardcoded)
//     if (req.user.email !== 'hazrakoustav12@gmail.com') {
//         return res.status(403).json({ message: 'Only admins can add problems' });
//     }
//     const newProblem = { title, description, testcases };
//     PROBLEMS.push(newProblem);
//     res.json({ message: 'Problem added successfully' });
// });

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})

