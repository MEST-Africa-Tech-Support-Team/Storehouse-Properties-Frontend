import { authService } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const favoriteService = {
  add: async (propertyId) => {
    const token = authService.getToken();
    if (!token) throw new Error('Unauthorized');
    
    console.log('Adding to favorites:', {
      endpoint: `${API_BASE_URL}/favorites`,
      propertyId,
      hasToken: !!token
    });
    
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ propertyId })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Add to favorites failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Failed to add to favorites: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Add to favorites success:', data);
    return true;
  },

  remove: async (propertyId) => {
    const token = authService.getToken();
    if (!token) throw new Error('Unauthorized');
    
    console.log('Removing from favorites:', {
      endpoint: `${API_BASE_URL}/favorites/${propertyId}`,
      propertyId,
      hasToken: !!token
    });
    
    const response = await fetch(`${API_BASE_URL}/favorites/${propertyId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Remove from favorites failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Failed to remove from favorites: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Remove from favorites success:', data);
    return true;
  }
};