import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const verifyJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(403).json({ message: "No token provided or incorrect format" });
    }

    const accessToken = token.split(' ')[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.user = decoded;
        next();
    });
};

export default verifyJWT;