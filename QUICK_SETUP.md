# 🚀 Quick Setup Guide

## What Was Fixed

✅ **Backend Issues Resolved:**
- Added robust database connection handling with retry logic
- Improved error handling and validation
- Created automated setup scripts
- Added health check endpoint
- Enhanced data validation for products and orders

✅ **MySQL Integration:**
- Proper connection pooling with retry mechanism
- Graceful error handling when database is not available
- Automated database setup script
- Environment-based configuration

---

## 🎯 Quick Start (3 Commands)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
npm run setup
```

This will:
- Create `.env` file (you'll be prompted for MySQL credentials)
- Create database and tables
- Insert sample data

### 3. Start Server
```bash
npm start
```

That's it! Visit http://localhost:3000

---

## 📋 Manual Setup Steps

If you prefer manual setup:

### Step 1: Create .env File
Run this interactive script:
```bash
npm run setup:env
```

Or create `.env` manually:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=inventory_db
PORT=3000
```

### Step 2: Setup Database
```bash
npm run setup:db
```

Or manually:
```bash
mysql -u root -p inventory_db < database/schema.sql
```

### Step 3: Start Server
```bash
npm start
```

---

## 🧪 Test Without Database

To test the frontend without MySQL setup:
```bash
npm run test
```

This uses mock data and doesn't require MySQL.

---

## 🔍 What's New

### Enhanced Database Configuration (`backend/config/database.js`)
- ✅ Automatic retry on connection failure (3 attempts)
- ✅ Graceful handling when .env file is missing
- ✅ Connection pooling with keep-alive
- ✅ Helpful error messages with troubleshooting tips

### Improved API Routes
- ✅ **Products API** - Better validation, duplicate SKU detection
- ✅ **Orders API** - Stock availability checking, proper validation
- ✅ **Health Check** - New endpoint: `/api/health`

### New Setup Scripts
- ✅ `setup-env.js` - Interactive .env file creation
- ✅ `setup-database.js` - Automated database setup with sample data

---

## 🔧 Available Commands

```bash
# Install dependencies
npm install

# Setup environment and database (interactive)
npm run setup

# Setup .env file only
npm run setup:env

# Setup database only
npm run setup:db

# Start production server
npm start

# Start development server (with auto-reload)
npm run dev

# Start test server (mock data, no MySQL)
npm run test
```

---

## 📊 Database Schema

The system includes these tables:
- **products** - Product catalog
- **inventory** - Stock levels
- **suppliers** - Supplier information
- **orders** - Order management
- **order_items** - Order line items
- **stock_movements** - Inventory change tracking

---

## 🐛 Troubleshooting

### "Cannot connect to MySQL"
**Solution:**
1. Check MySQL is running: `mysql -u root -p`
2. Verify `.env` file exists and has correct credentials
3. Run: `npm run setup:db`

### ".env file not found"
**Solution:**
```bash
npm run setup:env
```

### "Database already exists"
**Solution:**
Delete and recreate:
```sql
DROP DATABASE inventory_db;
```
Then run: `npm run setup:db`

### Port Already in Use
**Solution:**
Change `PORT` in `.env` file to a different port (e.g., 3001)

---

## 🌐 API Endpoints

### Health Check
```
GET /api/health
```

### Products
```
GET    /api/products        # List all products
GET    /api/products/:id     # Get single product
POST   /api/products        # Create product
PUT    /api/products/:id    # Update product
DELETE /api/products/:id    # Delete product
```

### Orders
```
GET    /api/orders          # List all orders
GET    /api/orders/:id      # Get single order
POST   /api/orders          # Create order
PUT    /api/orders/:id/status # Update order status
```

### Dashboard
```
GET    /api/dashboard       # Get dashboard statistics
```

---

## 💡 Key Improvements

### 1. Smart Error Handling
The database now retries failed connections automatically and provides helpful error messages.

### 2. Data Validation
- Products: Validates SKU uniqueness, positive prices/costs
- Orders: Checks stock availability before creating orders
- Status Updates: Validates order status values

### 3. Setup Automation
One command (`npm run setup`) handles everything for you.

### 4. Better UX
- Clear error messages
- Progress indicators
- Helpful troubleshooting tips

---

## ✅ Next Steps

1. Run `npm install`
2. Run `npm run setup`
3. Run `npm start`
4. Open http://localhost:3000
5. Start managing your inventory!

---

## 📝 Sample Data

The setup script automatically inserts:
- 5 sample products (Laptop, Mouse, Chair, Desk, Monitor)
- 5 inventory entries with stock levels
- 2 suppliers

You can start using the system immediately!

---

## 📚 Documentation

- `BACKEND_SETUP.md` - Detailed backend setup guide
- `SETUP_GUIDE.md` - General setup instructions
- `HOW_TO_FIX_ERROR.md` - Troubleshooting guide
- `README.md` - Project overview

