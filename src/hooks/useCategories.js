import { useState, useEffect, useCallback } from 'react';
import { categoryService } from '../services/categoryService';
import { toast } from 'react-toastify';

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const response = await categoryService.getAllCategories();
            setCategories(response.data);
            setError(null);
        } catch (err) {
            const errorMsg = 'Failed to fetch categories.';
            setError(errorMsg);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { categories, loading, error, refreshCategories: fetchCategories };
};
