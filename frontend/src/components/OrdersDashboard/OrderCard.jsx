import React from 'react';

const OrderCard = ({ order, onStatusUpdate, isExpanded, onToggleExpand, getStatusBadgeClass }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="order-card card">
      <div className="order-header" onClick={onToggleExpand}>
        <div className="order-info">
          <h4>#{order.orderNumber}</h4>
          <p className="text-sm text-muted">
            {order.customerName} • Table {order.tableNumber}
          </p>
        </div>

        <div className="order-meta">
          <span className={`badge ${getStatusBadgeClass(order.status)}`}>
            {order.status}
          </span>
          <span className="order-total">₹{order.totalAmount.toFixed(2)}</span>
          <button className="expand-btn">
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="order-details">
          <div className="order-items">
            <h5>Order Items</h5>
            <div className="items-list">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-info">
                    <span className="item-name">
                      {item.menuItem?.name || 'Unknown Item'}
                    </span>
                    <span className="item-category badge badge-primary text-xs">
                      {item.menuItem?.category || 'N/A'}
                    </span>
                  </div>
                  <div className="item-quantity">
                    <span className="text-muted">Qty: {item.quantity}</span>
                    <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-footer">
            <div className="order-timestamp">
              <span className="text-xs text-muted">
                📅 {formatDate(order.createdAt)}
              </span>
            </div>

            <div className="status-update">
              <label htmlFor={`status-${order._id}`} className="text-sm font-semibold">
                Update Status:
              </label>
              <select
                id={`status-${order._id}`}
                className="input"
                value={order.status}
                onChange={(e) => onStatusUpdate(order._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready">Ready</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
