let likes = [];

export default class LikeModel {
    _userid;
    _posts;

    constructor(userid, posts = []) {
        this._userid = userid;
        this._posts = posts;
    }
    // instance method for  each object
    Getlike(liked_post) {
        const exists = this._posts.find(p => p.postId === liked_post.postId);
        if (!exists) {
            this._posts.push(liked_post);
        }
        return this._posts;
    }

    static creatLike(userid, liked_post) {
     
        const userLike = likes.find(l => l._userid === userid);

        if (!userLike) {
           
            const newLike = new LikeModel(userid, []);
            newLike.Getlike(liked_post);
            likes.push(newLike);
            return newLike;
        } else {
            
            userLike.Getlike(liked_post);// find the object then call getlike()using this keyword
            return userLike;
        }
    }

   
    static GetAllLikes() {
        return likes;
    }

   
    static GetMyLikes(userid) {
        return likes.find(l => l._userid === userid);
    }

    
    static removeLike(userid, postId) {
        const userIndex = likes.findIndex(l => l._userid === userid);
        if (userIndex === -1) return false;

        const postIndex = likes[userIndex]._posts.findIndex(p => p.postId === postId);
        if (postIndex === -1) return false;

        likes[userIndex]._posts.splice(postIndex, 1);
        return true;
    }
}


const like1 = new LikeModel(1, [
    { postId: 1 },
    { postId: 2 }
]);
const like2 = new LikeModel(2, [
    { postId: 1 }
]);

likes.push(like1, like2);