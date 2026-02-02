import React, { useState } from 'react';

const MenuItemForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    category: 'Appetizer',
    price: '',
    ingredients: '',
    isAvailable: true,
    preparationTime: '',
    imageUrl: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.preparationTime && formData.preparationTime < 0) {
      newErrors.preparationTime = 'Preparation time cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      preparationTime: formData.preparationTime ? parseInt(formData.preparationTime) : undefined,
      ingredients: formData.ingredients ? formData.ingredients.split(',').map(i => i.trim()).filter(Boolean) : []
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="menu-item-form">
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          className="input"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter item name"
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="input"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter item description"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            className="input"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($) *</label>
          <input
            type="number"
            id="price"
            name="price"
            className="input"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            placeholder="0.00"
          />
          {errors.price && <span className="error-text">{errors.price}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="ingredients">Ingredients (comma-separated)</label>
        <input
          type="text"
          id="ingredients"
          name="ingredients"
          className="input"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="e.g., Tomatoes, Cheese, Basil"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="preparationTime">Preparation Time (minutes)</label>
          <input
            type="number"
            id="preparationTime"
            name="preparationTime"
            className="input"
            value={formData.preparationTime}
            onChange={handleChange}
            min="0"
            placeholder="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="input"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
          />
          <span>Available for ordering</span>
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update Item' : 'Create Item'}
        </button>
      </div>
    </form>
  );
};

export default MenuItemForm;
