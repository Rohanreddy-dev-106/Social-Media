import CommentsModel from "../model/comment.model.js";

export default class CommentController {
    
    // Create new user or post entry if not exists
    static createUserPost(req, res, next) {
        try {
            const { userid, postid } = req.body;

            if (!userid || !postid) {
                return res.status(400).json({ message: "userid and postid are required" });
            }

            const user = CommentsModel.createCommentUser(parseInt(userid), parseInt(postid));
            return res.status(201).json({
                message: "User comment structure created or post added successfully",
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    //  Add a comment to a user’s post
    static addComment(req, res, next) {
        try {
            const { userid, postid, commentText, commenter } = req.body;

            if (!userid || !postid || !commentText || !commenter) {
                return res.status(400).json({ message: "Missing fields" });
            }

            // Ensure user exists
            const user = CommentsModel.createCommentUser(parseInt(userid), parseInt(postid));

            // Call instance method
            const newComment = user.addComment(parseInt(postid), commentText, parseInt(commenter));

            return res.status(201).json({
                message: "Comment added successfully",
                data: newComment
            });
        } catch (error) {
            next(error);
        }
    }

    //Get all comments for a post
    static getComments(req, res, next) {
        try {
            const { userid, postid } = req.params;
            const user = CommentsModel.createCommentUser(parseInt(userid), parseInt(postid));
            const comments = user.getComments(parseInt(postid));

            return res.status(200).json({
                message: "Comments fetched successfully",
                data: comments
            });
        } catch (error) {
            next(error);
        }
    }
}
