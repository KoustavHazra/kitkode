const JWT_SECRET = "secret";
var jwt = require('jsonwebtoken');
const User = require("../../mongo_db/models/user-models");

module.exports = {
    authMiddleware: async (req, res, next) => {
        const cookies = req.headers.cookie;
        console.log("req.headers from server", cookies);
        if (!cookies) {
            return res.status(401).json({message: "Unauthorized HTTP. Token not provided."});
        }
        try {
            const jwtToken = cookies.split("=")[1];
            const isVerified = jwt.verify(jwtToken, JWT_SECRET);
            const userData = await User.findOne({ email: isVerified.email }).select({password: 0});
            console.log(`userData in jwt verification from server ${userData}`);
            req.user = userData;
            req.token = jwtToken;
            req.userID = userData._id;
            next();

        } catch (error) {
            console.log(`jwt token verification issue from server ${error}`);
            next(error);
            return res.status(401).json({message: "Unauthorized. Invalid token."});
        }
        
    }
};

// module.exports = {
//     authMiddleware: async (req, res, next) => {
//         const authHeader = req.headers.cookie;
//         if (!authHeader) {
//             return res.status(401).json({msg: "Unauthorized HTTP. Token not provided."});
//         }
//         const jwtToken = authHeader.replace("Bearer", "").trim();
//         try {
//             const isVerified = jwt.verify(jwtToken, JWT_SECRET);
//             const userData = await User.findOne({ email: isVerified.email }).select({password: 0});
//             req.user = userData;
//             req.token = authHeader;
//             req.userID = userData._id;
//             next();
//         } catch (error) {
//             next(error);
//             return res.status(401).json({msg: "Unauthorized. Invalid token."});
//         }
        
//     }
// };