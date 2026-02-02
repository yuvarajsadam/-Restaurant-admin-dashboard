 
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

 

 
