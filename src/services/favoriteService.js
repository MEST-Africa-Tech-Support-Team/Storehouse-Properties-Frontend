import { authService } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const favoriteService = {
  add: async (propertyId) => {
    const token = authService.getToken();
    if (!token) throw new Error('Unauthorized');
    
    const response = await fetch(`${API_BASE_URL}/favorites/${propertyId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add to favorites: ${response.status} ${errorText}`);
    }
    
    return true;
  },
// remove favorite
  remove: async (propertyId) => {
    const token = authService.getToken();
    if (!token) throw new Error('Unauthorized');
    
    const response = await fetch(`${API_BASE_URL}/favorites/${propertyId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to remove from favorites: ${response.status} ${errorText}`);
    }
    
    return true;
  },
// getFavorites method to fetch the user's favorite properties
  getFavorites: async () => {
    const token = authService.getToken();
    if (!token) throw new Error('Unauthorized');
    
    const response = await fetch(`${API_BASE_URL}/favorites/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to load favorites: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    return data.favorites || data.data || [];
  }
};