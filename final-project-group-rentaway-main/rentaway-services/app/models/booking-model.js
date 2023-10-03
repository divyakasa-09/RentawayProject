  import mongoose from "mongoose";

  // Creates the booking schema
  const bookingSchema = new mongoose.Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId, required: true },
    property_name: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    Number_of_persons : { type: String, required: true },
  });

  // Export the booking model
  const Booking = mongoose.model('Booking', bookingSchema);
  export default Booking;
