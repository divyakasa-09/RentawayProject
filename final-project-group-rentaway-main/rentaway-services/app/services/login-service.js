import User from './../models/user-model.js';

// Find a user by email
export const login = async (email) => {
    return await User.findOne({ email });
}