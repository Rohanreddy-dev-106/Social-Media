import express from "express";
import FollowController from "../controller/follower.controller.js";
import jwtAuth from "../../middlewares/jwt.Auth.js";

const router = express.Router();


router.post("/create", jwtAuth, FollowController.createnewfollowdata);


router.post("/follow", jwtAuth, FollowController.follow);


router.post("/unfollow", jwtAuth, FollowController.unfollow);

export default router;
