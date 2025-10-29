import express from "express";
import FollowController from "../controller/follower.controller.js";
import jwtAuth from "../../middlewares/jwt.Auth.js";

const router = express.Router();


router.post("/create", jwtAuth, FollowController.createnewfollowdata);


router.post("/followme", jwtAuth, FollowController.follow);


router.post("/unfollowme", jwtAuth, FollowController.unfollow);

export default router;
