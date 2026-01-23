// src/services/favoriteService.js
import { authService } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const favoriteService = {
  add: async (propertyId) => {
    const token = authService.getToken();
    if (!token) throw new Error('Unauthorized');
    
    const response = await fetch(`${API_BASE_URL}/favorites/${propertyId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to add to favorites');
    return true;
  },

  remove: async (propertyId) => {
    const token = authService.getToken();
    if (!token) throw new Error('Unauthorized');
    
    const response = await fetch(`${API_BASE_URL}/favorites/${propertyId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to remove from favorites');
    return true;
  }
};