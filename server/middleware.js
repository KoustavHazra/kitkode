const JWT_SECRET = "secret";
var jwt = require('jsonwebtoken');


module.exports = {
    auth: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(403).json({msg: "Missing auth header"});
        }
        const decoded = jwt.verify(authHeader, JWT_SECRET);
        if (decoded && decoded.id) {
            req.userId = decoded.id;
            next()
        } else {
            return res.status(403).json({msg: "Incorrect token"});
        }
    }
}


// # KitKode: LeetCode Clone

// KitKode is a clone of the popular LeetCode platform, designed to help users practice coding problems, improve algorithmic thinking, and prepare for technical interviews.

// ## Features

// - **Problem List:** Browse a curated list of algorithmic problems.
// - **Problem Details:** View detailed descriptions, input/output examples, and difficulty levels for each problem.
// - **Submission:** Submit your solutions to problems for evaluation.
// - **Submission Status:** Check the status of your submissions (Accepted/Rejected) and view detailed results.
// - **Authentication:** User authentication and authorization system.
// - **Responsive Design:** Responsive design for use on both mobile and desktop devices.

// ## Technologies Used

// - **Frontend:** HTML, CSS, JavaScript, React.js
// - **Backend:** Node.js, Express.js, MongoDB
// - **Authentication:** JSON Web Tokens (JWT)
// - **Version Control:** Git, GitHub

// ## Getting Started

// 1. Clone the repository:

//    ```bash
//    git clone https://github.com/your-username/kitkode.git

// 2. Install dependencies:

//    ```bash
//    cd kitkode
//    npm install

// 4. Start the development server:

//     ```bash
//    npm start

// 5. Open your browser and navigate to http://localhost:3000 to view the application.

// ## Contributing

// Contributions are welcome! If you'd like to contribute to KitKode, please fork the repository and submit a pull request. Please ensure that your code follows the project's coding standards and includes relevant tests.









// KitKode is a web application that replicates the functionality of LeetCode, a popular platform for practicing coding problems. This project aims to provide a similar experience for users to solve algorithmic problems, submit their solutions, and view detailed explanations.