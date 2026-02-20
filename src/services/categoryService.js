import API from './api';

export const categoryService = {
    getAllCategories: () => API.get('/categories'),
    getCategoryById: (id) => API.get(`/categories/${id}`)
};
