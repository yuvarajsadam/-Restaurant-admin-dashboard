# 🍽️ Restaurant Admin Dashboard - Eatoes (Indian Edition)

A professional full-stack restaurant management system built with **React**, **Node.js**, **Express**, and **MongoDB**. This edition is pre-configured with authentic Indian cuisine items and pricing in Indian Rupees (₹).

![Tech Stack](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Database Seeding](#database-seeding)
- [API Documentation](#api-documentation)
- [Key Technical Implementations](#key-technical-implementations)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Challenges & Solutions](#challenges--solutions)

## ✨ Features

### Menu Management
- ✅ **CRUD Operations** - Create, Read, Update, Delete menu items
- 🔍 **Advanced Search** - Search by name or ingredients with debouncing (300ms)
- 🎯 **Smart Filtering** - Filter by category, availability, and price range
- ⚡ **Optimistic UI Updates** - Instant availability toggle with rollback on error
- 📸 **Image Support** - Display menu item images for Indian delicacies
- 🏷️ **Categorization** - Appetizer, Main Course, Dessert, Beverage

### Orders Dashboard
- 📊 **Order Tracking** - View all orders with detailed information
- 🔄 **Status Management** - Update order status through stages:
  - ⏳ **Pending** - New orders awaiting confirmation
  - 👨‍🍳 **Preparing** - Currently in the kitchen
  - 🔔 **Ready** - Prepared and ready for pickup/service
  - ✅ **Delivered** - Successfully served
  - ❌ **Cancelled** - Orders that were voided
- 📄 **Pagination** - Efficient data loading with page navigation
- 🎨 **Status Badges** - Color-coded visual status indicators
- 📱 **Expandable Details** - View full order information including specific items

### Performance Optimizations
- ⏱️ **Debounced Search** - Reduces API calls by 300ms delay
- 🚀 **MongoDB Indexing** - Text indexes for fast search across names and ingredients
- 💾 **Optimistic Updates** - Immediate UI feedback for a smooth admin experience

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18+, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Styling** | Vanilla CSS (Premium Dark Theme) |
| **State Management** | React Hooks (useState, useEffect, Custom Hooks) |

## 📁 Project Structure

```
restaurant-dashboard/
├── backend/
│   ├── controllers/
│   │   ├── menuController.js      # Menu CRUD operations
│   │   └── orderController.js     # Order management & aggregation
│   ├── models/
│   │   ├── MenuItem.js            # Menu item schema
│   │   └── Order.js               # Order schema
│   ├── routes/
│   │   ├── menuRoutes.js          # Menu API routes
│   │   └── orderRoutes.js         # Order API routes
│   ├── .env                       # Environment variables
│   ├── server.js                  # Express server setup
│   └── seed.js                    # Database seeding script (Indian Menu)
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── MenuManagement/    # Menu items listing and forms
    │   │   └── OrdersDashboard/   # Order status tracking
    │   ├── hooks/
    │   │   ├── useDebounce.js     # Custom debounce hook
    │   │   └── useFetch.js        # Custom fetch hook
    │   └── services/
    │       └── api.js             # API service layer
```

## 📦 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas Account**

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd restaurant-dashboard
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

## 🔐 Environment Variables

### Backend (`.env`)
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/RestaurantDB
PORT=5000
NODE_ENV=development
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Running the Application

### 1. Start the Backend Server
```bash
cd backend
npm run dev
```

### 2. Seed the Database (Indian Menu)
```bash
cd backend
npm run seed
```
This will populate your database with 15 authentic Indian menu items and 10 sample orders at various stages.

### 3. Start the Frontend
```bash
cd frontend
npm run dev
```

## 🗄️ Database Seeding

The seed script (`backend/seed.js`) populates the database with:

**Menu Items (Indian Cuisine):**
- **Appetizers:** Paneer Tikka, Chicken 65, Veg Samosa, Gobi Manchurian
- **Main Courses:** Butter Chicken, Paneer Butter Masala, Dal Makhani, Chicken Biryani, Garlic Naan
- **Desserts:** Gulab Jamun, Rasmalai, Gajar Ka Halwa
- **Beverages:** Mango Lassi, Masala Chai, Fresh Lime Soda

**Sample Orders:**
- Orders distributed across **Pending**, **Preparing**, **Ready**, **Delivered**, and **Cancelled** statuses.
- Real-time pricing in **₹ (Rupees)**.

## 📡 API Documentation

### Menu Item Endpoints
- `GET /api/menu` - Get all menu items (filterable by category, price)
- `GET /api/menu/search?q=...` - Search items
- `POST /api/menu` - Add new item
- `PUT /api/menu/:id` - Update existing item
- `DELETE /api/menu/:id` - Remove item
- `PATCH /api/menu/:id/availability` - Toggle availability

### Order Endpoints
- `GET /api/orders` - Get all orders (paginated)
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order stage (Pending -> Preparing -> Ready -> Delivered)
- `GET /api/orders/top-selling` - Analytics for best performing dishes

## 🎨 Screenshots

### Menu Management (Indian Selection)
![Menu Management](screenshots/menu-management.png)

### Orders Dashboard (Different Stages)
![Orders Dashboard](screenshots/orders-dashboard.png)

## 🧩 Challenges & Solutions

### Challenge 1: Search Performance
**Problem:** Frequent API calls while typing in search box.  
**Solution:** Custom `useDebounce` hook implemented to delay search until 300ms after user stops typing.

### Challenge 2: Order Lifecycle Management
**Problem:** Managing state transitions across multiple stages (Pending to Delivered).  
**Solution:** Backend schema enforces enum validation, while Frontend provides intuitive dropdowns for status updates with instant feedback.

### Challenge 3: Responsive UI for Complex Tables
**Problem:** Displaying order details on mobile devices.  
**Solution:** Implemented expandable cards that stack vertically on small screens instead of horizontal tables.

## 👨‍💻 Author
Built for Eatoes Technical Assessment.
