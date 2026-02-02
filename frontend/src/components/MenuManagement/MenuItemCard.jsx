import React from 'react';

const MenuItemCard = ({ item, onToggleAvailability, onEdit, onDelete }) => {
  return (
    <div className="menu-item-card card">
      <div className="item-image-container">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="item-image" />
        ) : (
          <div className="item-image-placeholder">
            <span>🍽️</span>
          </div>
        )}
        <span className={`availability-badge badge ${item.isAvailable ? 'badge-success' : 'badge-error'}`}>
          {item.isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>

      <div className="item-content">
        <div className="item-header">
          <h4>{item.name}</h4>
          <span className="badge badge-primary">{item.category}</span>
        </div>

        <p className="item-description text-sm text-muted">
          {item.description || 'No description available'}
        </p>

        {item.ingredients && item.ingredients.length > 0 && (
          <div className="item-ingredients">
            <span className="text-xs text-muted">
              🥘 {item.ingredients.slice(0, 3).join(', ')}
              {item.ingredients.length > 3 && '...'}
            </span>
          </div>
        )}

        <div className="item-meta">
          <span className="item-price">₹{item.price.toFixed(2)}</span>
          {item.preparationTime && (
            <span className="text-xs text-muted">⏱️ {item.preparationTime}min</span>
          )}
        </div>

        <div className="item-actions">
          <button
            className={`btn btn-sm ${item.isAvailable ? 'btn-warning' : 'btn-success'}`}
            onClick={() => onToggleAvailability(item._id)}
          >
            {item.isAvailable ? '🚫 Disable' : '✓ Enable'}
          </button>
          <button className="btn btn-sm btn-secondary" onClick={() => onEdit(item)}>
            ✏️ Edit
          </button>
          <button className="btn btn-sm btn-error" onClick={() => onDelete(item._id)}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
