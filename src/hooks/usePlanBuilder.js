import { useState, useCallback, useMemo } from 'react';
import { planService } from '../services/planService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const usePlanBuilder = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [touristName, setTouristName] = useState('');
    const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [loading, setLoading] = useState(false);

    const calculateTimes = useCallback((items) => {
        let currentTime = items[0]?.estimatedArrivalTime || '09:00';
        
        return items.map((item, index) => {
            if (index === 0) return item;
            
            // Calculate next arrival time based on previous item's duration
            const prevItem = items[index - 1];
            const [hours, minutes] = (prevItem.estimatedArrivalTime || '09:00').split(':').map(Number);
            const date = new Date();
            date.setHours(hours, minutes + (prevItem.estimatedDurationMinutes || 0));
            
            const nextTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            return { ...item, estimatedArrivalTime: nextTime };
        });
    }, []);

    const addPlace = useCallback((place) => {
        setSelectedPlaces(prev => {
            if (prev.find(p => p.id === place.id)) {
                toast.info(`${place.name} is already in your plan.`);
                return prev;
            }
            
            const newItem = {
                ...place,
                visitOrder: prev.length + 1,
                estimatedArrivalTime: prev.length === 0 ? '09:00' : '', // Will be calculated
                estimatedDurationMinutes: 60,
                notes: ''
            };
            
            const newPlaces = [...prev, newItem];
            toast.success(`Added ${place.name} to plan.`);
            return calculateTimes(newPlaces);
        });
    }, [calculateTimes]);

    const removePlace = useCallback((placeId) => {
        setSelectedPlaces(prev => {
            const filtered = prev.filter(p => p.id !== placeId);
            return calculateTimes(filtered);
        });
    }, [calculateTimes]);

    const updatePlaceDetails = useCallback((placeId, updates) => {
        setSelectedPlaces(prev => {
            const updated = prev.map(p => p.id === placeId ? { ...p, ...updates } : p);
            return calculateTimes(updated);
        });
    }, [calculateTimes]);

    const optimizeRoute = useCallback(() => {
        setSelectedPlaces(prev => {
            if (prev.length <= 1) return prev;
            // Simple proximity sort starting from home (distanceFromHome)
            const sorted = [...prev].sort((a, b) => (a.distanceFromHome || 0) - (b.distanceFromHome || 0));
            return calculateTimes(sorted);
        });
        toast.success("Route optimized by proximity to home.");
    }, [calculateTimes]);

    const resetPlan = useCallback(() => {
        setSelectedPlaces([]);
        setTitle('');
        setTouristName('');
        toast.info("Plan reset.");
    }, []);

    const totalCost = useMemo(() => {
        return selectedPlaces.reduce((sum, p) => sum + (p.estimatedCost || 0), 0);
    }, [selectedPlaces]);

    const totalDistance = useMemo(() => {
        return selectedPlaces.reduce((sum, p) => sum + (p.distanceFromHome || 0), 0);
    }, [selectedPlaces]);

    const savePlan = async () => {
        if (!title || !touristName || selectedPlaces.length === 0) {
            toast.error("Please fill in all details and add at least one place.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                title,
                touristName,
                visitDate,
                places: selectedPlaces.map((p, index) => ({
                    placeId: p.id,
                    visitOrder: index + 1,
                    estimatedArrivalTime: p.estimatedArrivalTime,
                    estimatedDurationMinutes: p.estimatedDurationMinutes,
                    notes: p.notes
                }))
            };
            await planService.createPlan(payload);
            toast.success("Travel plan saved successfully!");
            navigate('/plans');
        } catch (err) {
            toast.error("Failed to save travel plan.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleReorder = useCallback((newOrder) => {
        setSelectedPlaces(calculateTimes(newOrder));
    }, [calculateTimes]);

    return {
        title, setTitle,
        touristName, setTouristName,
        visitDate, setVisitDate,
        selectedPlaces,
        addPlace,
        removePlace,
        setSelectedPlaces,
        handleReorder,
        updatePlaceDetails,
        optimizeRoute,
        resetPlan,
        totalCost,
        totalDistance,
        savePlan,
        loading
    };
};
