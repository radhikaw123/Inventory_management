# 🔌 MySQL Setup Guide - Connect Database to Project

## Current Status
✅ Node.js installed and working
✅ Dependencies installed
✅ MySQL downloaded (you mentioned)
⏳ Need to configure MySQL connection

---

## Step 1: Start MySQL Service

**First, make sure MySQL is running:**

1. Press `Windows Key + R`
2. Type: `services.msc` and press Enter
3. Look for "MySQL80" or "MySQL" in the list
4. If it says "Stopped", right-click and click "Start"
5. Wait until Status shows "Running"

---

## Step 2: Find Your MySQL Password

You need to know your MySQL root password. This was set during MySQL installation.

**If you forgot it, you can:**

### Option A: Try Default
Common defaults:
- Empty password (just leave password blank)
- Password: `root`
- Password: `your_password`

### Option B: Reset MySQL Password
If you can't remember, you can reset it:
1. Open PowerShell as Administrator
2. Stop MySQL: `net stop MySQL80`
3. Start MySQL in safe mode:
   ```
   mysqld --console --skip-grant-tables --shared-memory
   ```
4. In another PowerShell window, run:
   ```
   mysql -u root
   ```
5. Then type:
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
   FLUSH PRIVILEGES;
   exit;
   ```
6. Restart MySQL service

---

## Step 3: Test MySQL Connection

Open PowerShell and test if MySQL works:

```powershell
mysql -u root -p
```

Enter your password when prompted. If you can connect, you're ready for the next step.

---

## Step 4: Connect Project to MySQL

I've created automated scripts to make this easy. Run this command:

```powershell
npm run setup
```

This will:
1. Ask you for MySQL credentials
2. Create a `.env` file
3. Create the database
4. Create all tables
5. Insert sample data

**Or run step-by-step:**

```powershell
# Step 1: Create .env file (interactive)
npm run setup:env

# Step 2: Setup database
npm run setup:db
```

---

## Step 5: Start the Server

After setup is complete:

```powershell
npm start
```

You should see:
```
✅ Connected to MySQL database successfully
Server is running on http://localhost:3000
```

Then open: http://localhost:3000

---

## Quick Setup Commands

Copy and run these commands **one by one** in PowerShell:

```powershell
# 1. Create .env file (you'll be prompted for password)
node setup-env.js

# Enter these when prompted:
# MySQL Host: localhost (or just press Enter)
# MySQL User: root (or just press Enter)  
# MySQL Password: [ENTER YOUR MYSQL ROOT PASSWORD]
# Database Name: inventory_db (or just press Enter)
# Server Port: 3000 (or just press Enter)

# 2. Create database and tables
node setup-database.js

# 3. Start the server
npm start
```

---

## Troubleshooting

### "MySQL service not running"
**Solution:**
- Open Services (Windows Key + R, type `services.msc`)
- Find "MySQL80" or "MySQL"
- Right-click → Start

### "Access denied for user 'root'"
**Solution:**
- Wrong password
- Use the password you set during MySQL installation
- Or reset it (see Step 2 above)

### "Cannot connect to MySQL"
**Solution:**
Check:
1. Is MySQL running? (Check Services)
2. Is your password correct?
3. Try connecting manually: `mysql -u root -p`

### "Command not found: mysql"
**Solution:**
- Add MySQL to PATH
- Or use full path: `C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe`

---

## Manual Database Setup (Alternative)

If you prefer to do it manually:

1. **Create database:**
   ```sql
   mysql -u root -p
   CREATE DATABASE inventory_db;
   exit;
   ```

2. **Import schema:**
   ```powershell
   mysql -u root -p inventory_db < database/schema.sql
   ```

3. **Create .env file:**
   Create a file named `.env` in `C:\Web_dev` with:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=inventory_db
   PORT=3000
   ```

4. **Start server:**
   ```powershell
   npm start
   ```

---

## Test Without MySQL First

If you want to test the frontend without MySQL setup:

```powershell
npm run test
```

This uses mock data and doesn't require MySQL.

---

## Summary

**Quick Start (3 commands):**
```powershell
node setup-env.js       # Create .env file
node setup-database.js  # Create database
npm start               # Start server
```

**What you need:**
- ✅ MySQL installed and running
- ✅ MySQL root password
- ✅ Node.js installed (already done!)

---

## Need Help?

1. Check if MySQL is running: `services.msc`
2. Test connection: `mysql -u root -p`
3. Check `.env` file exists in `C:\Web_dev`
4. Check logs in PowerShell for error messages

---

## Next Steps After Setup

Once connected:
1. Go to http://localhost:3000
2. Navigate to "Products" to see your inventory
3. Start managing your inventory!

Good luck! 🚀

