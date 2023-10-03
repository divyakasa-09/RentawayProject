    import { save, remove, search, searchListingById, update, findListingForUser, findActiveListings, findListingByQuery, findListing, listingFilter } from './../services/listing-service.js';
    import {setSuccessfulResponse, setErrorResponse} from './../utils.js';

    // Saves a new listing to the database
    export const post = async (request, response) => {
        const { title, description, price, availability, houseRules, image, latitude, longitude, address } = request.body;
        const userId = request.user.id;
        try {
        const savedListing = await save(title, description, price, availability, houseRules, image, latitude, longitude, address, userId);

        // Return a 201 if the post request is successful
        setSuccessfulResponse(savedListing, response, 201);
        } catch (err) {
            // Return a 400 if the post is unsuccessful
            setErrorResponse(err, response, 400);
        }
    }

    // Returns all listings
    export const index = async (request, response) => {
        try {
            const params = request.body;
            const listings = await search(params);

            // Returns a 200 if the search is successful
            setSuccessfulResponse(listings, response, 200);
        } catch (err) {
            // Returns a 400 if the search is unsuccessful
            setErrorResponse(err, response, 400);
        }
    }

    // Gets a listing for a specific user id
    export const getListingForUser = async ( request, response) => {
        try {
            const listings = await findListingForUser(request.user.id);
            setSuccessfulResponse(listings, response, 200);
            if (!listings)
            {
                // If the listings cannot be found return a 404
                const errorMessage = `No listings found with user ${request.user.id}`;
                setErrorResponse(errorMessage, response, 404);
            }
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    // Gets listings that are set to active
    export const getActiveListings = async (request, response) => {
        try {
            const listings = await findActiveListings();
            setSuccessfulResponse(listings, response, 200);
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    // Searches listing based on a given query
    export const searchListings = async (request, response) => {
        const searchQuery = request.query.search || '';
    try {
        let listings;
        if (searchQuery !== '') {
        listings = await findListingByQuery(searchQuery);
        } else {
        listings = await findListing();
        }
        setSuccessfulResponse(listings, response, 200);
    } catch (err) {
        // If there is a different error return a 400
        setErrorResponse(err, response, 400);
    }
    }

    // Filter listings based on min and max price
    export const filterListings = async (request, response) => {
        const { minPrice, maxPrice } = request.query;
        const userId = request.user.id;
        try {
            let filter = {};
            if (minPrice && maxPrice) {
            filter.price = { $gte: minPrice, $lte: maxPrice };
            }
            const listings = await listingFilter(filter);
            setSuccessfulResponse(listings, response, 200);
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    // Returns a single listing
    export const get = async (request, response) => {
        try {
            const id = request.params.id;
            const listing = await searchListingById(id);

            if (!listing)
            {
                // If the listing cannot be found return a 404
                const errorMessage = `No listing found with id ${id}`;
                setErrorResponse(errorMessage, response, 404);
            }
            else {
                // If the listing is successfully updated, return a 200
                setSuccessfulResponse(listing, response, 200);
            }
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    // Replaces a listing with a new listing
    export const replace = async (request, response) => {
        try {
            const id = request.params.id;
            const newListing = request.body;
            const updatedListing = await update(id, newListing);

            if (!updatedListing)
            {
                // If the listing cannot be found return a 404
                const errorMessage = `No listing found with id ${id}`;
                setErrorResponse(errorMessage, response, 404);
            }
            else {
                // If the listing is successfully updated, return a 200
                setSuccessfulResponse(updatedListing, response, 200);
            }
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    // Deletes a listing
    export const discard = async (request, response) => {
        try {
            const id = request.params.id;
            const deletedListing = await remove(id);

            if (!deletedListing)
            {
                // If the listing cannot be found return a 404
                const errorMessage = `No listing found with id ${id}`;
                setErrorResponse(errorMessage, response, 404);
            }
            else {
                // If the listing is successfully deleted, return a no content 204
                setSuccessfulResponse(null, response, 204);
            }
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }