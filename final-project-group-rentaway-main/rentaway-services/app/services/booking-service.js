import Booking from './../models/booking-model.js';

// Save a new booking to the database
export const save = async (newBooking) => {
    const booking = new Booking(newBooking);
    return booking.save();
}

// Replace a booking with a new booking
export const update = async (id, updatedBooking) => {
    const booking = Booking
        .findByIdAndUpdate(id, updatedBooking, {new: true})
        .exec();
    return booking;
}

// Finds bookings with a matching guest id
export const findGuestBookings = async (id) => {
    const bookings = await Booking.find({ guestId: id}).exec();
    return bookings;
}

// Finds bookings with a matching host id
export const findHostBookings = async (id) => {
    const bookings = await Booking.find({ hostId: id}).exec();
    return bookings;
}