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
  },

  // --- Admin actions: create (draft), publish and update ---
  createProperty: async (payload = {}, { asDraft = true } = {}) => {
    const token = authService.getToken();
    if (!token) throw new Error('Authentication required');

    const form = new FormData();
    Object.entries(payload).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      // arrays (e.g. images) should be appended individually
      if (Array.isArray(v)) {
        v.forEach(item => form.append(k, item));
        return;
      }
      form.append(k, v);
    });

    if (asDraft) form.append('status', 'draft');

    const res = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    const text = await res.text().catch(() => '');
    let json = {};
    try { json = text ? JSON.parse(text) : {}; } catch (_) { json = {}; }

    if (!res.ok) {
      const msg = json.message || json.error || `Create property failed (${res.status})`;
      throw new Error(msg);
    }

    return json;
  },

  publishProperty: async (id) => {
    if (!id) throw new Error('Property ID is required to publish');
    const token = authService.getToken();
    if (!token) throw new Error('Authentication required');

    const res = await fetch(`${API_BASE_URL}/properties/publish/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || data.error || `Publish failed (${res.status})`);
    }

    return data;
  },

  // Unlist a property (admin)
  unlistProperty: async (id) => {
    if (!id) throw new Error('Property ID is required to unlist');
    const token = authService.getToken();
    if (!token) throw new Error('Authentication required');

    const res = await fetch(`${API_BASE_URL}/properties/unlist/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || data.error || `Unlist failed (${res.status})`);
    return data;
  },

  updateProperty: async (id, updates = {}) => {
    if (!id) throw new Error('Property ID is required to update');
    const token = authService.getToken();
    if (!token) throw new Error('Authentication required');

    // support JSON updates or multipart when files are present
    const hasFiles = Object.values(updates).some(v => Array.isArray(v) || v instanceof File);

    if (hasFiles) {
      const form = new FormData();
      Object.entries(updates).forEach(([k, v]) => {
        if (v === undefined || v === null) return;
        if (Array.isArray(v)) return v.forEach(item => form.append(k, item));
        form.append(k, v);
      });

      const res = await fetch(`${API_BASE_URL}/properties/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const text = await res.text().catch(() => '');
      let json = {};
      try { json = text ? JSON.parse(text) : {}; } catch (_) { json = {}; }
      if (!res.ok) throw new Error(json.message || json.error || `Update failed (${res.status})`);
      return json;
    }

    const res = await fetch(`${API_BASE_URL}/properties/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || data.error || `Update failed (${res.status})`);
    return data;
  }
};
