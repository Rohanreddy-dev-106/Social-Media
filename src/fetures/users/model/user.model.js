let users = [];

export default class UserModel {
    _id;
    _Email;
    _Name;
    _password;
    
    constructor(id, email, name, password) {
        this._id = id;
        this._Email = email;
        this._Name = name;
        this._password = password;
    }

    static Signup({ email, password, name }) {
        const new_user = new UserModel(users.length + 1, email, name, password);
        users.push(new_user);
        return new_user;
    }

    static Signin(email, password) {
        return users.find((user) => user._Email === email && user._password === password);
    }

    static GetAll() {
        return users;
    }
}

const user1 = new UserModel(1, 'rohan@example.com', 'Rohan Reddy', 'pass123');
const user2 = new UserModel(2, 'neela@example.com', 'Neela Kumari', 'neela456');
const user3 = new UserModel(3, 'john@example.com', 'John Doe', 'john789');

users.push(user1, user2, user3);
