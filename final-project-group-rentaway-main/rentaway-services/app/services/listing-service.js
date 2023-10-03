import Listing from './../models/listing-model.js';

// Save a new listing to the database
export const save = async (title, description, price, availability, houseRules, image, latitude, longitude, address, userId ) => {
    const listing = new Listing({title, description, price, availability, houseRules, image, latitude, longitude, address, userId});
    return listing.save();
}

// Replace a listing with a new listing
export const update = async (id, updatedListing) => {
    const listing = Listing
        .findByIdAndUpdate(id, updatedListing, {new: true})
        .exec();
    return listing;
}

// Delete a listing
export const remove = async (id) => {
    const listing = Listing.findByIdAndDelete(id).exec();
    return listing;
}

// Find a listing given parameters
export const search = async (params) => {
    const listings = Listing.find(params).exec();
    return listings;
}

// Find a listing given an ID
export const searchListingById = async (params) => {
    const listings = Listing.findById(params).exec();
    return listings;
}

// Find a listing for a given user id
export const findListingForUser = async (id) => {
    const listings = Listing.find({userId: id}).exec();
    return listings;
}

// Find all active listings
export const findActiveListings = async (id) => {
    const listings = Listing.find({is_active: true}).exec();
    return listings;
}

// Find listings that match a given query
export const findListingByQuery = async (searchQuery) => {
    const listings = await Listing.find({ address: { $regex: searchQuery, $options: 'i' } }).exec();
    return listings;
}

// Find a listing
export const findListing = async () => {
    const listings = await Listing.find().exec();
    return listings;
}

// Filter a listing 
export const listingFilter = async (filter) => {
    const listings = await Listing.find(filter).populate('userId').exec();
    return listings;
}