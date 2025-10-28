import LikeModel from "../model/like.model.js";

export default class LikeController {

 
    static LikePost(req, res, next) {
        try {
            const { userid, postid } = req.body;
            const liked_post = { postId: parseInt(postid) };

            const result = LikeModel.creatLike(parseInt(userid), liked_post);

            return res.status(201).json({
                message: "Post liked successfully",
                data: result
            });

        } catch (error) {
            return res.status(400).json({
                message: "Invalid data format",
                error: error.message
            });
        }
    }

 
    static DislikePost(req, res, next) {
        try {
            const { userid, postid } = req.params;
            const result = LikeModel.removeLike(parseInt(userid), parseInt(postid));

            if (!result) {
                return res.status(404).json({
                    message: "Like not found or already removed"
                });
            }

            return res.status(200).json({
                message: "Post unliked successfully",
                data: result
            });
        } catch (error) {
            return res.status(400).json({
                message: "Invalid request",
                error: error.message
            });
        }
    }


    static GetMyLikes(req, res, next) {
        try {
            const { userid } = req.params;
            const result = LikeModel.GetMyLikes(parseInt(userid));

            if (!result) {
                return res.status(404).json({
                    message: "No likes found for this user"
                });
            }

            return res.status(200).json({
                message: "User likes fetched successfully",
                data: result
            });
        } catch (error) {
            return res.status(400).json({
                message: "Error fetching user likes",
                error: error.message
            });
        }
    }

    static GetAll(req, res, next) {
        try {
            const result = LikeModel.GetAllLikes();
            return res.status(200).json({
                message: "All likes fetched successfully",
                data: result
            });
        } catch (error) {
            return res.status(400).json({
                message: "Error fetching likes",
                error: error.message
            });
        }
    }
}
