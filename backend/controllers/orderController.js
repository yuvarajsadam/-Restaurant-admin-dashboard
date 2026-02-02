const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

// Get all orders with pagination and filtering
exports.getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const filter = {};
    if (status) {
      filter.status = status;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('items.menuItem', 'name price category');
    
    const total = await Order.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

// Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.menuItem');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
};

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { items, customerName, tableNumber } = req.body;
    
    // Validate items exist and calculate total
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      
      if (!menuItem) {
        return res.status(404).json({
          success: false,
          message: `Menu item with ID ${item.menuItem} not found`
        });
      }
      
      if (!menuItem.isAvailable) {
        return res.status(400).json({
          success: false,
          message: `${menuItem.name} is currently unavailable`
        });
      }
      
      const itemTotal = menuItem.price * item.quantity;
      totalAmount += itemTotal;
      
      orderItems.push({
        menuItem: menuItem._id,
        quantity: item.quantity,
        price: menuItem.price
      });
    }
    
    const order = await Order.create({
      items: orderItems,
      totalAmount,
      customerName,
      tableNumber,
      statusHistory: [{ status: 'Pending', timestamp: new Date() }]
    });
    
    // Populate the created order
    await order.populate('items.menuItem', 'name price category');
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        $push: { statusHistory: { status, timestamp: new Date() } }
      },
      { new: true, runValidators: true }
    ).populate('items.menuItem', 'name price category');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    });
  }
};

// Get top selling items (MongoDB Aggregation)
exports.getTopSellingItems = async (req, res) => {
  try {
    const topItems = await Order.aggregate([
      // Only include delivered orders
      { $match: { status: 'Delivered' } },
      
      // Unwind the items array
      { $unwind: '$items' },
      
      // Group by menu item and sum quantities
      {
        $group: {
          _id: '$items.menuItem',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
        }
      },
      
      // Lookup menu item details
      {
        $lookup: {
          from: 'menuitems',
          localField: '_id',
          foreignField: '_id',
          as: 'menuItem'
        }
      },
      
      // Unwind the menuItem array
      { $unwind: '$menuItem' },
      
      // Project the desired fields
      {
        $project: {
          _id: 1,
          name: '$menuItem.name',
          category: '$menuItem.category',
          price: '$menuItem.price',
          totalQuantity: 1,
          totalRevenue: 1
        }
      },
      
      // Sort by total quantity descending
      { $sort: { totalQuantity: -1 } },
      
      // Limit to top 5
      { $limit: 5 }
    ]);
    
    res.status(200).json({
      success: true,
      count: topItems.length,
      data: topItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching top selling items',
      error: error.message
    });
  }
};
