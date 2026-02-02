import React, { useState, useEffect } from 'react';
import { menuAPI } from '../../services/api';
import { useDebounce } from '../../hooks/useDebounce';
import Loading from '../Loading/Loading';
import Toast from '../Toast/Toast';
import MenuItemCard from './MenuItemCard';
import MenuItemForm from './MenuItemForm';
import './MenuManagement.css';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fetch menu items
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (categoryFilter) filters.category = categoryFilter;
      if (availabilityFilter !== '') filters.isAvailable = availabilityFilter;

      const response = await menuAPI.getAll(filters);
      setMenuItems(response.data);
    } catch (error) {
      showToast('Error fetching menu items', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Search menu items
  const searchMenuItems = async (query) => {
    if (!query.trim()) {
      fetchMenuItems();
      return;
    }

    try {
      setSearchLoading(true);
      const response = await menuAPI.search(query);
      setMenuItems(response.data);
    } catch (error) {
      showToast('Error searching menu items', 'error');
    } finally {
      setSearchLoading(false);
    }
  };

  // Effect for debounced search
  useEffect(() => {
    if (debouncedSearch) {
      searchMenuItems(debouncedSearch);
    } else {
      fetchMenuItems();
    }
  }, [debouncedSearch]);

  // Effect for filters
  useEffect(() => {
    if (!searchQuery) {
      fetchMenuItems();
    }
  }, [categoryFilter, availabilityFilter]);

  // Toggle availability with optimistic update
  const handleToggleAvailability = async (id) => {
    // Find the item
    const item = menuItems.find(i => i._id === id);
    if (!item) return;

    // Optimistic update
    const previousItems = [...menuItems];
    setMenuItems(menuItems.map(i => 
      i._id === id ? { ...i, isAvailable: !i.isAvailable } : i
    ));

    try {
      await menuAPI.toggleAvailability(id);
      showToast('Availability updated successfully', 'success');
    } catch (error) {
      // Rollback on error
      setMenuItems(previousItems);
      showToast('Failed to update availability', 'error');
    }
  };

  // Delete menu item
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await menuAPI.delete(id);
      setMenuItems(menuItems.filter(item => item._id !== id));
      showToast('Menu item deleted successfully', 'success');
    } catch (error) {
      showToast('Error deleting menu item', 'error');
    }
  };

  // Handle form submit
  const handleFormSubmit = async (data) => {
    try {
      if (editingItem) {
        await menuAPI.update(editingItem._id, data);
        showToast('Menu item updated successfully', 'success');
      } else {
        await menuAPI.create(data);
        showToast('Menu item created successfully', 'success');
      }
      setShowForm(false);
      setEditingItem(null);
      fetchMenuItems();
    } catch (error) {
      showToast(error.message || 'Error saving menu item', 'error');
    }
  };

  // Show toast
  const showToast = (message, type) => {
    setToast({ message, type });
  };

  return (
    <div className="menu-management">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h2>Menu Management</h2>
            <p className="text-muted">Manage your restaurant menu items</p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setEditingItem(null);
              setShowForm(true);
            }}
          >
            ➕ Add Menu Item
          </button>
        </div>

        {/* Filters */}
        <div className="filters-section card">
          <div className="search-box">
            <input
              type="text"
              className="input"
              placeholder="🔍 Search by name or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchLoading && <div className="spinner spinner-sm search-spinner"></div>}
          </div>

          <div className="filter-controls">
            <select
              className="input"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
            </select>

            <select
              className="input"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="">All Items</option>
              <option value="true">Available Only</option>
              <option value="false">Unavailable Only</option>
            </select>
          </div>
        </div>

        {/* Menu Items Grid */}
        {loading ? (
          <Loading message="Loading menu items..." />
        ) : menuItems.length === 0 ? (
          <div className="empty-state card">
            <span className="empty-icon">🍽️</span>
            <h3>No menu items found</h3>
            <p>Try adjusting your filters or add a new menu item</p>
          </div>
        ) : (
          <div className="menu-grid grid grid-cols-4">
            {menuItems.map(item => (
              <MenuItemCard
                key={item._id}
                item={item}
                onToggleAvailability={handleToggleAvailability}
                onEdit={() => {
                  setEditingItem(item);
                  setShowForm(true);
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
              <button className="btn-close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <MenuItemForm
              initialData={editingItem}
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default MenuManagement;
