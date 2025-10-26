# 🔧 Backend Setup Guide - Quick Start

## Overview
This guide will help you set up the MySQL database and backend server for the Inventory Management System.

## Prerequisites
- ✅ Node.js installed (v14 or higher)
- ✅ MySQL installed and running

## Quick Setup (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Database
Create your `.env` file by running:
```bash
npm run setup:env
```

This will prompt you for:
- MySQL Host (default: localhost)
- MySQL User (default: root)
- MySQL Password (**required**)
- Database Name (default: inventory_db)
- Server Port (default: 3000)

### Step 3: Create Database & Tables
Set up the database with sample data:
```bash
npm run setup:db
```

This will:
- ✅ Create the `inventory_db` database
- ✅ Create all necessary tables (products, inventory, orders, etc.)
- ✅ Insert sample data for testing

### Step 4: Start the Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

You should see:
```
✅ Connected to MySQL database successfully
Server is running on http://localhost:3000
```

---

## Alternative: Manual Setup

If you prefer to set up manually:

### 1. Create `.env` file
Create a `.env` file in the project root with:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=inventory_db
PORT=3000
```

### 2. Create Database
Run this command to create the database and tables:
```bash
mysql -u root -p inventory_db < database/schema.sql
```

---

## Troubleshooting

### Issue: "Cannot connect to MySQL"
**Solution:**
1. Make sure MySQL is running: `mysql -u root -p`
2. Check your credentials in the `.env` file
3. Verify the database exists: `SHOW DATABASES;`

### Issue: "Database already exists"
**Solution:**
```sql
DROP DATABASE IF EXISTS inventory_db;
CREATE DATABASE inventory_db;
```

### Issue: "Port 3000 already in use"
**Solution:**
Change the `PORT` value in your `.env` file to a different port (e.g., 3001)

---

## Database Schema

The system includes these tables:
- **products** - Product information
- **inventory** - Stock levels and locations
- **suppliers** - Supplier information
- **orders** - Order details
- **order_items** - Individual items in orders
- **stock_movements** - Inventory change history

---

## Testing Without Database

If you just want to test the frontend without setting up MySQL, you can use the mock server:

```bash
npm run test
```

This runs `server-simple.js` which uses mock data and doesn't require MySQL.

---

## Production Considerations

For production deployments:

1. **Use strong passwords** in your `.env` file
2. **Never commit** your `.env` file to version control
3. **Use environment variables** provided by your hosting platform
4. **Enable MySQL SSL** connections
5. **Set up database backups** regularly
6. **Monitor connection pool** usage

---

## Next Steps

After setup is complete:
1. Start the server: `npm start`
2. Open browser: `http://localhost:3000`
3. Navigate to "Products" to see your inventory

---

## Need Help?

Check these files:
- `HOW_TO_FIX_ERROR.md` - Common error solutions
- `SETUP_GUIDE.md` - Detailed setup instructions
- `README.md` - General project information

