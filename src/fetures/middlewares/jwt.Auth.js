import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function jwtAuth(req, res, next) {
    const token = req.cookies.jwtToken;
    console.log(token);

    if (!token) {
        res.status(401).send("Invallid cred...");
    } else {
        try {
            const paylode = jwt.verify(
                token,
                process.env.JWT_TOKEN_KEY,
            );
            console.log(paylode);
            // attach the userid to req object with a key value pare
            req.UserID = paylode.UserID;

        } catch (error) {
            res.status(401).send("Invallid cred...");
        }
        next();
    }
}
