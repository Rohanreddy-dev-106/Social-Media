const comments = [];

export default class CommentsModel {
    _userid;
    _posts;

    constructor(userid, posts = []) {
        this._userid = userid;
        this._posts = posts;
    }

    // static: only for creating new user/post structure
    static createCommentUser(userid, postid) {
        let user = comments.find((c) => c._userid === userid);
        if (!user) {
            user = new CommentsModel(userid, [
                { postid, comments: [] }
            ]);
            comments.push(user);
        } else {
            const postExists = user._posts.find((p) => p.postid === postid);
            if (!postExists) {
                user._posts.push({ postid, comments: [] });
            }
        }
        return user;
    }

    // instance adds comment for this user
    addComment(postid, commentText, commenter) {
        let post = this._posts.find((p) => p.postid === postid);
        if (!post) {
            post = { postid, comments: [] };
            this._posts.push(post);
        }

        const newComment = {
            commentid: post.comments.length + 1,
            commentText,
            commenter
        };
        post.comments.push(newComment);
        return newComment;
    }

    getComments(postid) {
        const post = this._posts.find((p) => p.postid === postid);
        return post ? post.comments : [];
    }
}

// Dummy data
comments.push(
    new CommentsModel(1, [
        {
            postid: 1,
            comments: [
                { commentid: 1, commentText: "Great post!", commenter: 2 },
                { commentid: 2, commentText: "Very informative.", commenter: 3 }
            ]
        },
        {
            postid: 2,
            comments: [
                { commentid: 1, commentText: "Nice picture!", commenter: 4 }
            ]
        }
    ])
);

// Example usage:
const user1 = CommentsModel.createCommentUser(1, 1);
user1.addComment(1, "Awesome!", 5);
user1.addComment(2, "Loved it!", 6);

console.log(JSON.stringify(comments, null, 2));
