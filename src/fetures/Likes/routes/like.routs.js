import express from "express";
import LikeController from "../controller/like.controller.js";
import jwtAuth from "../../middlewares/jwt.Auth.js";

const router = express.Router();

router.post("/like", jwtAuth,LikeController.LikePost);
router.delete("/unlike/:userid/:postid",jwtAuth, LikeController.DislikePost);
router.get("/likes/:userid",jwtAuth, LikeController.GetMyLikes);
router.get("/likes",jwtAuth, LikeController.GetAll);

export default router;
