const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Kitkode server error, please contact the authorities.";
    const extraDetails = err.extraDetails || "Kitkode server error, please contact the authorities."

    return res.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;