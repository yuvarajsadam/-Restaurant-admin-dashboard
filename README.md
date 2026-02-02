 
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
