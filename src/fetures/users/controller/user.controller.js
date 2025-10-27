import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import UserModel from "../model/user.model.js";

export default class UserController {
    static signup(req, res, next) {
        const user = UserModel.Signup(req.body);
        res.status(201).send(user);
    }
    static signin(req, res, next) {
        const { email, password, name } = req.body;
        const user = UserModel.Signin(email, password);
        if (!user) {
            res.send("User is not found..");
        }
        else {
            const token = jwt.sign({ UserID: user._id, Email: user._Email }, process.env.JWT_TOKEN_KEY, {
                algorithm: "HS256",
                expiresIn: "6d",
            })
            const EXPIRE = 6 * 24 * 60 * 60 * 1000; // 6 days in ms
            res.cookie("jwtToken", token, {
                maxAge: EXPIRE,
                httpOnly: true,
            });

            if (!token) {
                res.status(400).send("Invilled Signin..");
            }
            res.status(201).send("Your are signin..");
        }
    }
}
