import { useState, useEffect, useCallback } from 'react';
import { placeService } from '../services/placeService';
import { toast } from 'react-toastify';

export const usePlaces = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPlaces = useCallback(async () => {
        setLoading(true);
        try {
            const response = await placeService.getAllPlaces();
            setPlaces(response.data);
            setError(null);
        } catch (err) {
            const errorMsg = 'Failed to fetch places. Please try again later.';
            setError(errorMsg);
            toast.error(errorMsg);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const searchPlaces = useCallback(async (keyword) => {
        setLoading(true);
        try {
            const response = await placeService.searchPlaces(keyword);
            setPlaces(response.data);
            setError(null);
        } catch (err) {
            const errorMsg = `No results found for "${keyword}"`;
            setError(errorMsg);
            toast.warning(errorMsg);
        } finally {
            setLoading(false);
        }
    }, []);

    const filterByCategory = useCallback(async (categoryId) => {
        if (!categoryId) {
            return fetchPlaces();
        }
        setLoading(true);
        try {
            const response = await placeService.getPlacesByCategory(categoryId);
            setPlaces(response.data);
            setError(null);
        } catch (err) {
            const errorMsg = 'Failed to filter by category.';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, [fetchPlaces]);

    useEffect(() => {
        fetchPlaces();
    }, [fetchPlaces]);

    return {
        places,
        loading,
        error,
        refreshPlaces: fetchPlaces,
        searchPlaces,
        filterByCategory
    };
};
