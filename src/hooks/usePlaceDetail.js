import { useState, useEffect, useCallback } from 'react';
import { placeService } from '../services/placeService';

export const usePlaceDetail = (id) => {
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPlace = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await placeService.getPlaceById(id);
            setPlace(response.data);
            setError(null);
        } catch (err) {
            const errorMsg = 'Failed to load place details.';
            setError(errorMsg);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchPlace();
    }, [fetchPlace]);

    return { place, loading, error, refresh: fetchPlace };
};
