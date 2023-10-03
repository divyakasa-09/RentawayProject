import Payment from './../models/payment-model.js';
import Listing from './../models/listing-model.js';

// Save a new payment to the database
export const save = async (guestId, id, amount) => {
    const payment = new Payment({
        guestId,
        hostId: id,
        amount,
    });

    return payment.save();
}

// Finds payments for a guest id
export const findPaymentsForGuest = async (id) => {
    const payments = Payment.find({ guestId: id }).exec();
    return payments
}

// Finds payments for a host id
export const findPaymentsForHost = async (id) => {
    const payments = Payment.find({ hostId: id }).exec();
    return payments
}

// Saves a payment for a booking
export const saveBookingPayment = async (newPayment) => {
    const payment = new Payment(newPayment);
    await Listing.findByIdAndUpdate(payment.listingId, { is_active: true, status: "Booked" });
    return payment.save();

}