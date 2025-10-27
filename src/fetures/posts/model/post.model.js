/* The PostModel class manages user posts, allowing for creating, updating, deleting, and retrieving
posts based on user IDs. */
import UserModel from "../../users/model/user.model.js";

let posts = [];

export default class PostModel {
    _userid;
    _posts;
    constructor(user_id, posts = []) {
        this._userid = user_id;
        this._posts = posts;
    }

    static CreatPost(user_id, post_data) {

        const exists = posts.find((p) => {
            if (p._userid === user_id) {
                return true;
            }
        });

        if (!exists) {
            const newpost = new PostModel(user_id, []);
            newpost._posts.push(post_data);
            posts.push(newpost);
            return newpost; 
        }
        else {
            const userindex = posts.findIndex((p) => {
                if (p._userid === user_id) {
                    return true;
                }
            });

            if (userindex > -1) {
                posts[userindex]._posts.push(post_data);
                return posts[userindex]; 
            }
        }
        return null;
    }


    static UpdatePost(user_id, postID, UpdateContent) {

        const postindex = posts.findIndex((p) => {
            if (p._userid === user_id) {
                return true;
            }
        });

        if (postindex > -1) {

            const postuserindex = posts[postindex]._posts.findIndex((pd) => {
                if (pd.postId === postID) {
                    return true;
                }
            });

            if (postuserindex > -1) {
                // update only the content field (keeps postId intact)
                posts[postindex]._posts[postuserindex].content = UpdateContent;
                return posts[postindex]._posts[postuserindex]; // return updated post
            }
        }
        return null; // not found
    }


    static DeletPost(user_id, postID) {

        const userindex = posts.findIndex((p) => {
            if (p._userid === user_id) {
                return true;
            }
        });
        if (userindex === -1) {
            return false;
        }
        const postindex = posts[userindex]._posts.findIndex((pd) => {
            if (pd.postId === postID) {
                return true;
            }
        });
        if (postindex === -1) {
            return false;
        }
        posts[userindex]._posts.splice(postindex, 1);
        return true;
    }

    static GetAllPosts() {
        return posts;
    }

  
    static Getmyposts(mypost) {
        return posts.find((p) => {
            if (p._userid === mypost) {
                return true;
            }
        });
    }
}

// sample data
const post1 = new PostModel(1, [
    { postId: 1, content: "Hi This is my first post" },
    { postId: 2, content: "Today I learned Node.js!" },
    { postId: 3, content: "I love coding!" },
]);
const post2 = new PostModel(2, [
    { postId: 1, content: "Hello! This is my first post" },
    { postId: 2, content: "I like learning backend development!" }
]);
posts.push(post1, post2);
