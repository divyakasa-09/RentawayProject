  import mongoose from "mongoose";

  // Creates the host schema
  const hostSchema = new mongoose.Schema({
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phoneNumber : { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
    });

  // Export the host model
  const Host = mongoose.model('Host', hostSchema);
  export default Host;