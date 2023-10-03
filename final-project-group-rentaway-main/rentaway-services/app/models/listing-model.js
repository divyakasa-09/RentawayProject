  import mongoose from "mongoose";

  // Creates the listing schema
  const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Date, required: true },
    houseRules: { type: String, required: true },
    image: { type: String, required: true },
      is_active: {
      type: Boolean,
      default: true,
    },
    
    status: {
      type: String,
      default: 'available',
    },
    address: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  });

  // Creates geospatial index for location
  listingSchema.index({ location: '2dsphere' });

  // Export the listing model
  const Listing = mongoose.model('Listing', listingSchema);
  export default Listing;
