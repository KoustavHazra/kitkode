
module.exports = {
    adminMiddleware: async (req, res, next) => {
        try {
            if (!req.user || !req.user.isAdmin) {
                return res.status(403).json({ "message": "Forbidden. User is not an admin." });
            }
            next();
        } catch (error) {
            next(error);
            return res.status(500).json({ "message": "Internal server error." });
        }
    }
};
