import API from './api';

export const placeService = {
    // Get all places
    getAllPlaces: () => API.get('/places'),

    // Get place by ID
    getPlaceById: (id) => API.get(`/places/${id}`),

    // Get places by category
    getPlacesByCategory: (categoryId) => API.get(`/places/category/${categoryId}`),

    // Get nearby places
    getNearbyPlaces: (radius = 25) => API.get(`/places/nearby?radius=${radius}`),

    // Search places
    searchPlaces: (keyword) => API.get(`/places/search?keyword=${keyword}`),

    // Create place (for admin)
    createPlace: (placeData) => API.post('/places', placeData),

    // Update place (for admin)
    updatePlace: (id, placeData) => API.put(`/places/${id}`, placeData),

    // Delete place (for admin)
    deletePlace: (id) => API.delete(`/places/${id}`)
};
