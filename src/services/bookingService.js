import { authService } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const bookingService = {
  getAllBookings: async (params = {}) => {
    const token = authService.getToken();
    if (!token) throw new Error('Authentication required');

    const search = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/bookings${search ? `?${search}` : ''}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const text = await res.text().catch(() => '');
    let json = {};
    try { json = text ? JSON.parse(text) : {}; } catch (_) { json = {}; }

    if (!res.ok) {
      throw new Error(json.message || json.error || `Failed to fetch bookings (${res.status})`);
    }

    if (Array.isArray(json)) return json;
    if (Array.isArray(json.bookings)) return json.bookings;
    if (Array.isArray(json.data)) return json.data;
    return json;
  },

  getBookingById: async (id) => {
    if (!id) throw new Error('Booking id is required');
    const token = authService.getToken();
    if (!token) throw new Error('Authentication required');

    const res = await fetch(`${API_BASE_URL}/bookings/admin/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const text = await res.text().catch(() => '');
    let json = {};
    try { json = text ? JSON.parse(text) : {}; } catch (_) { json = {}; }

    if (!res.ok) throw new Error(json.message || json.error || `Failed to fetch booking (${res.status})`);

    // return permissive shapes: { booking }, { data }, or the object itself
    return json.booking || json.data || json;
  },

  createBooking: async (propertyId, payload = {}) => {
    if (!propertyId) throw new Error('Property id is required');

    const token = authService.getToken();
   
    const hasFiles = Array.isArray(payload.idDocuments) && payload.idDocuments.length > 0;

    let res;
    if (hasFiles) {
      const form = new FormData();
      Object.entries(payload).forEach(([k, v]) => {
        if (v === undefined || v === null) return;
        if (k === 'idDocuments') return v.forEach(file => form.append('idDocuments', file));
        form.append(k, v);
      });

      res = await fetch(`${API_BASE_URL}/bookings/${encodeURIComponent(propertyId)}`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: form,
      });
    } else {
      res = await fetch(`${API_BASE_URL}/bookings/${encodeURIComponent(propertyId)}`, {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { Authorization: `Bearer ${token}` } : {}),
        body: JSON.stringify(payload),
      });
    }

    const text = await res.text().catch(() => '');
    let json = {};
    try { json = text ? JSON.parse(text) : {}; } catch (_) { json = {}; }

    if (!res.ok) {
      throw new Error(json.message || json.error || `Booking failed (${res.status})`);
    }

    return json;
  },

  approveBooking: async (id) => {
    if (!id) throw new Error('Booking id is required');
    const token = authService.getToken();
    
    const res = await fetch(`${API_BASE_URL}/bookings/${encodeURIComponent(id)}/approve`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: "confirmed" }), 
    });

    const data = res.status === 204 ? { message: 'Approved' } : await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || `Approve failed (${res.status})`);
    return data;
  },

  rejectBooking: async (id) => {
    if (!id) throw new Error('Booking id is required');
    const token = authService.getToken();

    const res = await fetch(`${API_BASE_URL}/bookings/admin/${encodeURIComponent(id)}/reject`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: "rejected" }),
    });

    const data = res.status === 204 ? { message: 'Rejected' } : await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || `Reject failed: ${data.message || 'Invalid state'}`);
    return data;
  },

  expireBooking: async (id) => {
    if (!id) throw new Error('Booking id is required');
    const token = authService.getToken();

    const res = await fetch(`${API_BASE_URL}/bookings/${encodeURIComponent(id)}/expire`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: "expired" }),
    });

    const data = res.status === 204 ? { message: 'Expired' } : await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || `Expire failed (${res.status})`);
    return data;
  }
};

export default bookingService;