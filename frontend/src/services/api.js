const API_URL = "https://restaurant-admin-dashboard-g28s.onrender.com/api";

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Menu Item APIs
export const menuAPI = {
  // Get all menu items with filters
  getAll: (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.isAvailable !== undefined) queryParams.append('isAvailable', filters.isAvailable);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    
    const queryString = queryParams.toString();
    return apiCall(`/menu${queryString ? `?${queryString}` : ''}`);
  },

  // Search menu items
  search: (query) => {
    return apiCall(`/menu/search?q=${encodeURIComponent(query)}`);
  },

  // Get single menu item
  getById: (id) => {
    return apiCall(`/menu/${id}`);
  },

  // Create menu item
  create: (data) => {
    return apiCall('/menu', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update menu item
  update: (id, data) => {
    return apiCall(`/menu/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete menu item
  delete: (id) => {
    return apiCall(`/menu/${id}`, {
      method: 'DELETE',
    });
  },

  // Toggle availability
  toggleAvailability: (id) => {
    return apiCall(`/menu/${id}/availability`, {
      method: 'PATCH',
    });
  },
};

// Order APIs
export const orderAPI = {
  // Get all orders with pagination and filters
  getAll: (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    
    const queryString = queryParams.toString();
    return apiCall(`/orders${queryString ? `?${queryString}` : ''}`);
  },

  // Get single order
  getById: (id) => {
    return apiCall(`/orders/${id}`);
  },

  // Create order
  create: (data) => {
    return apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update order status
  updateStatus: (id, status) => {
    return apiCall(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // Get top selling items
  getTopSelling: () => {
    return apiCall('/orders/top-selling');
  },
};

export default { menuAPI, orderAPI };
