  import mongoose from "mongoose";

  // Creates the history schema
  const historySchema = new mongoose.Schema({
      title: { type: String, required: true },
      price: { type: Number, required: true },
      propertyId : { type: String, required: true },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    
    });

  // Exports the history model
  const History = mongoose.model('History', historySchema);
  export default History;