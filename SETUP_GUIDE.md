# Inventory Management System - Setup Guide

## The Error and How to Fix It

The "Error loading products" message appears because:
1. **The backend server is not running**
2. **Node.js and npm are not installed**
3. **The MySQL database is not set up**

## Step-by-Step Setup Instructions

### Step 1: Install Node.js
1. Download Node.js from: https://nodejs.org/
2. Install the LTS (Long Term Support) version
3. Restart your computer after installation
4. Verify installation by opening Command Prompt/PowerShell and running:
   ```
   node --version
   npm --version
   ```

### Step 2: Install MySQL
1. Download MySQL from: https://dev.mysql.com/downloads/mysql/
2. Install MySQL Server
3. During installation, set a root password (remember this!)
4. Verify installation by running:
   ```
   mysql --version
   ```

### Step 3: Install Project Dependencies

Once Node.js is installed, open PowerShell in the project folder and run:

```bash
npm install
```

This will install:
- express (web server framework)
- mysql2 (MySQL database driver)
- body-parser (handle form data)
- cors (handle cross-origin requests)
- dotenv (environment variables)

### Step 4: Set Up the Database

1. Open MySQL Command Line or MySQL Workbench
2. Create the database:
   ```
   CREATE DATABASE inventory_db;
   ```
3. Exit MySQL and run this command in PowerShell:
   ```bash
   mysql -u root -p inventory_db < database/schema.sql
   ```
   (Enter your MySQL root password when prompted)

### Step 5: Configure Database Connection

Create a file named `.env` in the project root with:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=inventory_db
PORT=3000
```

### Step 6: Start the Server

Run this command in PowerShell:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

You should see: `Server is running on http://localhost:3000`

### Step 7: Access the Application

1. Open your browser
2. Go to: `http://localhost:3000`
3. The application should now work without errors!

## Quick Test (After Setup)

Once everything is installed:
1. Start the server: `npm start`
2. Open browser to `http://localhost:3000`
3. Click on "Products" in the navigation
4. You should see a table with sample products

## Troubleshooting

### Error: "Cannot connect to MySQL"
- Check if MySQL service is running
- Verify database credentials in `.env` file
- Make sure the database `inventory_db` exists

### Error: "Port 3000 already in use"
- Close other applications using port 3000
- Or change the port in `.env` file

### Error: "Module not found"
- Run `npm install` again
- Make sure you're in the project directory

## Sample Data

The database schema includes sample products:
- Laptop Pro 15"
- Wireless Mouse
- Office Chair
- Standing Desk
- Monitor 27"

These will appear once the database is set up and the server is running.

