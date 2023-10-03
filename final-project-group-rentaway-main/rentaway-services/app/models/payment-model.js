  import mongoose from "mongoose";

  // Creates the payment schema
  const paymentSchema = mongoose.Schema({
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    bookingId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentMethodData: {
      type: Object,
      required: true,
    },
  });

  // Exports the payment model
  const Payment = mongoose.model('Payment', paymentSchema);
  export default Payment;
