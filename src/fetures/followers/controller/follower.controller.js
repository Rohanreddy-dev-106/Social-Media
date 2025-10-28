import FollowModel from "../model/follow.model.js";

export default class FollowController {

    // Create a new follow data record for a user
    static createnewfollowdata(req, res, next) {
        try {
            const { userid } = req.body;

            if (!userid) {
                return res.status(400).json({ message: "User ID is required." });
            }

            const result = FollowModel.createFollowuser(parseInt(userid));
            
            if (typeof result === "string") {
                return res.status(400).json({ message: result });
            }

            return res.status(201).json({
                message: "Follow data created successfully.",
                data: result
            });
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }

    //  Follow another user
    static follow(req, res, next) {
        try {
            const { userid, followuser_id } = req.body;

            if (!userid || !followuser_id) {
                return res.status(400).json({ message: "Both userid and followuser_id are required." });
            }

            const result = FollowModel.followme(parseInt(userid), parseInt(followuser_id));

            if (result === "User not found." || result === "Already following this user.") {
                return res.status(400).json({ message: result });
            }

            return res.status(200).json({
                message: result,
                myFollowData: FollowModel.getmyfollowData(parseInt(userid))
            });

        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }

    //Unfollow a user
    static unfollow(req, res, next) {
        try {
            const { userid, followuser_id } = req.body;

            if (!userid || !followuser_id) {
                return res.status(400).json({ message: "Both userid and followuser_id are required." });
            }

            const result = FollowModel.unfollowme(parseInt(userid), parseInt(followuser_id));

            if (result === "User not found." || result === "You are not following this user.") {
                return res.status(400).json({ message: result });
            }

            return res.status(200).json({
                message: result,
                myFollowData: FollowModel.getmyfollowData(parseInt(userid))
            });

        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
}
