import express from "express";
import CommentController from "../controller/comment.controller.js";

const router = express.Router();

//  Create a comment structure for a user/post (if not exists)
router.post("/create", CommentController.createUserPost);

//  Add a new comment to a post
router.post("/add", CommentController.addComment);

// Get all comments for a specific user's post
router.get("/:userid/:postid", CommentController.getComments);

export default router;
