let follow = [];

export default class FollowModel {
    _userid;
    _followuser;

    constructor(userid, followuser = { followers: [], following: [] }) {
        this._userid = userid;
        this._followuser = followuser;
    }

    static createFollowuser(userid, followuser = { followers: [], following: [] }) {
        const exists = follow.find((f) => f._userid === userid);
        if (exists) {
            return "User already exists...";
        }

        const newUser = new FollowModel(userid, followuser);
        follow.push(newUser);
        return newUser;
    }

    static getAllFollowData() {
        return follow;
    }

    static getmyfollowData(userid){
        return follow.find((f)=>f._userid===userid);
    }

    static followme(userid, followuser_id) {
        const userIndex = follow.findIndex((f) => f._userid === userid);
        const targetIndex = follow.findIndex((f) => f._userid === followuser_id);

        if (userIndex === -1 || targetIndex === -1) {
            return "User not found.";
        }

        // Add to following list if not already there
        if (!follow[userIndex]._followuser.following.includes(followuser_id)) {//follow
            follow[userIndex]._followuser.following.push(followuser_id);
        } else {
            return "Already following this user.";
        }

        // Add to target followers list if not already there
        if (!follow[targetIndex]._followuser.followers.includes(userid)) {//folllowers
            follow[targetIndex]._followuser.followers.push(userid);
        }

        return "Followed successfully.";
    }

    static unfollowme(userid, followuser_id) {
        const userIndex = follow.findIndex((f) => f._userid === userid);
        const targetIndex = follow.findIndex((f) => f._userid === followuser_id);

        if (userIndex === -1 || targetIndex === -1) {
            return "User not found.";
        }

        // Remove from following list
        const followingList = follow[userIndex]._followuser.following;
        const fIndex = followingList.indexOf(followuser_id);
        if (fIndex !== -1) {
            followingList.splice(fIndex, 1);//remove it
        } else {
            return "You are not following this user.";
        }

        // Remove from target's followers list
        const followersList = follow[targetIndex]._followuser.followers;
        const flIndex = followersList.indexOf(userid);
        if (flIndex !== -1) {
            followersList.splice(flIndex, 1);
        }

        return "Unfollowed successfully.";
    }
}

// --- dummy data ---
follow.push(new FollowModel(1, { followers: [2], following: [2] }));
follow.push(new FollowModel(2, { followers: [1], following: [1] }));

