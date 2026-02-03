import { authService } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const propertyService = {
  getProperties: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.city) params.append('city', filters.city);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.childrenAllowed !== undefined) params.append('childrenAllowed', filters.childrenAllowed);
    if (filters.petsAllowed !== undefined) params.append('petsAllowed', filters.petsAllowed);
    if (filters.propertyType) params.append('propertyType', filters.propertyType);
    if (filters.title) params.append('title', filters.title);
    if (filters.featured) params.append('featured', filters.featured);

    const url = `${API_BASE_URL}/properties${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch properties (${response.status})`);
    }

    const data = await response.json();
    
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.properties)) return data.properties;
    if (data && Array.isArray(data.data)) return data.data;

    console.warn('Unexpected properties response format:', data);
    return [];
  },

  getPropertyById: async (id) => {
    if (!id) throw new Error('Property ID is required');
    
    const url = `${API_BASE_URL}/properties/${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      let errorMessage = `Failed to fetch property (${response.status})`;
      try {
        const text = await response.text();
        if (text) {
          try {
            const json = JSON.parse(text);
            errorMessage = json.message || json.error || text;
          } catch {
            errorMessage = text;
          }
        }
      } catch {}

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  },

  getSimilarProperties: async (id) => {
    if (!id) throw new Error('Property ID is required for similar properties');

    const url = `${API_BASE_URL}/properties/similar/${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      let message = `Failed to fetch similar properties (${response.status})`;
      try {
        const json = await response.json();
        message = json.message || json.error || message;
      } catch {}
      throw new Error(message);
    }

    const data = await response.json();

    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.properties)) return data.properties;
    if (data && Array.isArray(data.data)) return data.data;
    if (data && Array.isArray(data.similar)) return data.similar;
    if (data && Array.isArray(data.similarProperties)) return data.similarProperties;

    console.warn('Unexpected similar properties response format:', data);
    return [];
  }
};
