import React, { useState, useEffect } from 'react';
import { orderAPI } from '../../services/api';
import Loading from '../Loading/Loading';
import Toast from '../Toast/Toast';
import OrderCard from './OrderCard';
import './OrdersDashboard.css';

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [toast, setToast] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const ITEMS_PER_PAGE = 10;

  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const filters = {
        page: currentPage,
        limit: ITEMS_PER_PAGE
      };
      if (statusFilter) filters.status = statusFilter;

      const response = await orderAPI.getAll(filters);
      setOrders(response.data);
      setTotalPages(response.pages || 1);
    } catch (error) {
      showToast('Error fetching orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter]);

  // Update order status
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      showToast('Order status updated successfully', 'success');
    } catch (error) {
      showToast('Error updating order status', 'error');
    }
  };

  // Show toast
  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      'Pending': 'badge-warning',
      'Preparing': 'badge-info',
      'Ready': 'badge-primary',
      'Delivered': 'badge-success',
      'Cancelled': 'badge-error'
    };
    return statusMap[status] || 'badge-info';
  };

  return (
    <div className="orders-dashboard">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h2>Orders Dashboard</h2>
            <p className="text-muted">Track and manage customer orders</p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section card">
          <div className="status-filters">
            <button
              className={`status-filter-btn ${statusFilter === '' ? 'active' : ''}`}
              onClick={() => {
                setStatusFilter('');
                setCurrentPage(1);
              }}
            >
              All Orders
            </button>
            {['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'].map(status => (
              <button
                key={status}
                className={`status-filter-btn ${statusFilter === status ? 'active' : ''}`}
                onClick={() => {
                  setStatusFilter(status);
                  setCurrentPage(1);
                }}
              >
                <span className={`badge ${getStatusBadgeClass(status)}`}>{status}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <Loading message="Loading orders..." />
        ) : orders.length === 0 ? (
          <div className="empty-state card">
            <span className="empty-icon">📋</span>
            <h3>No orders found</h3>
            <p>Orders will appear here once customers place them</p>
          </div>
        ) : (
          <>
            <div className="orders-list">
              {orders.map(order => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onStatusUpdate={handleStatusUpdate}
                  isExpanded={expandedOrder === order._id}
                  onToggleExpand={() => setExpandedOrder(
                    expandedOrder === order._id ? null : order._id
                  )}
                  getStatusBadgeClass={getStatusBadgeClass}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

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

export default OrdersDashboard;
