import User from './../models/user-model.js';

// Find a user by email
export const findUser = async (email) => {
    const existingUser = await User.findOne({ email });
    return existingUser;
}

// Save a new user to the database
export const save = async (newUser) => {
    const user = new User(newUser);
    return user.save();
}

// Replace a user with a new user
export const update = async (id, updatedUser) => {
    const user = User
        .findByIdAndUpdate(id, updatedUser, {new: true})
        .exec();
    return user;
}

// Delete a user
export const remove = async (id) => {
    const user = User.findByIdAndDelete(id).exec();
    return user;
}

// Find a user given parameters
export const search = async (params) => {
    const users = User.find(params).exec();
    return users;
}

// Find a user given an ID
export const searchId = async (params) => {
    const users = User.findById(params).exec();
    return users;
}