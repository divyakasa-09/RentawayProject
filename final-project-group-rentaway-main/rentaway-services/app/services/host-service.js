import Host from './../models/host-model.js';

// Check for a host by email
export const hostLogin = async (email) => {
    return await Host.findOne({ email });
}

// Find a host by email
export const findHost = async (email) => {
    const existingHost = await Host.findOne({ email });
    return existingHost;
}

// Save a new host to the database
export const save = async (newHost) => {
    const host = new Host(newHost);
    return host.save();
}

// Replace a host with a new host
export const update = async (id, updatedHost) => {
    const host = Host
        .findByIdAndUpdate(id, updatedHost, {new: true})
        .exec();
    return host;
}

// Delete a host
export const remove = async (id) => {
    const host = Host.findByIdAndDelete(id).exec();
    return host;
}

// Find a host given parameters
export const search = async (params) => {
    const hosts = Host.find(params).exec();
    return hosts;
}

// Find a host given an ID
export const searchId = async (params) => {
    const hosts = Host.findById(params).exec();
    return hosts;
}