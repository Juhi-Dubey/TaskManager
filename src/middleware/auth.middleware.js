const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "No token provided",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: decoded.id};
        next();
    } 
    catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Token expired",
            });
        }
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Invalid token",
        });
    }
}

module.exports = {authMiddleware};