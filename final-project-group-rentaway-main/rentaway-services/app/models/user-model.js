  import mongoose from "mongoose";

  // Creates the user schema
  const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    phoneNumber : { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  });

  // Exports the user model
  const User = mongoose.model('User', userSchema);
  export default User;
