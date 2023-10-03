import History from './../models/history-model.js';

// Save a new history to the database
export const save = async (title, price, propertyId, userId) => {
    const history = new History({title, price, propertyId, userId});
    return history.save();
}

// Find the booking history with a matching id
export const findHistory = async (id) => {
    const history = await History.find({ userId: id}).exec();
    return history;
}