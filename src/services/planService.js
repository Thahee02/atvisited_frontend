import API from './api';

export const planService = {
    // Create a new travel plan
    createPlan: (planData) => API.post('/plans', planData),

    // Get all travel plans
    getAllPlans: () => API.get('/plans'),

    // Get a specific plan by ID
    getPlanById: (id) => API.get(`/plans/${id}`),

    // Delete a plan
    deletePlan: (id) => API.delete(`/plans/${id}`)
};
