import PostModel from "../model/post.model.js";

export default class PostController {

    // Create Post
    static creatpost(req, res, next) {
        try {
            const { userid, postdata } = req.body;

        
            const jsonData = (typeof postdata === "string") ? JSON.parse(postdata) : postdata;

            const result = PostModel.CreatPost(parseInt(userid), jsonData);

            return res.status(201).json({
                message: "Post created successfully",
                data: result
            });
        } catch (err) {
            return res.status(400).json({
                message: "Invalid post data format",
                error: err.message
            });
        }
    }

    //  Get All Posts
    static getAllpost(req, res, next) {
        const data = PostModel.GetAllPosts();
        return res.status(200).json({
            message: "All posts fetched",
            data: data
        });
    }

    // Get My Posts
    static getMyPosts(req, res, next) {
        const { userid } = req.params;
        const data = PostModel.Getmyposts(parseInt(userid));

        if (!data) {
            return res.status(404).json({ message: "No posts found for this user" });
        }

        return res.status(200).json({
            message: "Your posts",
            data: data
        });
    }

    //  Update Post
    static updatepost(req, res, next) {
        const { userid, postid, content } = req.body;
        const result = PostModel.UpdatePost(parseInt(userid), parseInt(postid), content);

        if (!result) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({
            message: "Post updated successfully",
            data: result
        });
    }

    //Delete Post
    static deletepost(req, res, next) {
        const { userid, postid } = req.body;
        const result = PostModel.DeletPost(parseInt(userid), parseInt(postid));

        if (!result) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({
            message: "Post deleted successfully"
        });
    }
}
