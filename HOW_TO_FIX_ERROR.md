# 🔧 How to Fix "Error loading products" 

## The Problem
The error appears because:
1. **JavaScript is trying to connect to `http://localhost:3000/api/products`**
2. **Nothing is running on port 3000**
3. **This gives an error: "Failed to fetch" or network error**

## The Solution - 3 Easy Steps

### Step 1: Install Node.js
1. Go to: https://nodejs.org/
2. Click "Download LTS Version" (the green button)
3. Run the installer
4. Follow the installation wizard
5. Restart your computer

### Step 2: Install Dependencies
Open PowerShell in this folder (`F:\Web_dev`) and run:
```bash
npm install
```

Wait for it to finish (you'll see "added X packages").

### Step 3: Start the Server
Run this command:
```bash
npm run test
```

You should see:
```
✅ Server is running on http://localhost:3000
📦 Using mock data (no database required)

🌐 Open your browser and go to: http://localhost:3000
```

### Step 4: Test It
1. Open your browser
2. Go to: `http://localhost:3000`
3. Click on "Products" in the navigation bar
4. You should now see 5 sample products in a table!

## What Each Command Does

- `npm install` - Downloads all required packages (Express, MySQL driver, etc.)
- `npm run test` - Starts a test server with mock data (no database needed!)
- `npm start` - Starts the full server with MySQL (requires database setup)

## Expected Result

Instead of "Error loading products", you should see:

| Name | SKU | Category | Price | Stock | Actions |
|------|-----|----------|-------|-------|---------|
| Laptop Pro 15" | LP-001 | Electronics | $1299.99 | 25 | Edit Delete |
| Wireless Mouse | WM-001 | Electronics | $29.99 | 150 | Edit Delete |
| Office Chair | OC-001 | Furniture | $249.99 | 30 | Edit Delete |
| Standing Desk | SD-001 | Furniture | $599.99 | 12 | Edit Delete |
| Monitor 27" | MN-001 | Electronics | $399.99 | 45 | Edit Delete |

## If You Still See Error

1. Check if the server is actually running:
   - Look at the PowerShell window
   - You should see "Server is running on http://localhost:3000"
   
2. Check the browser console:
   - Press F12 in your browser
   - Go to the "Console" tab
   - You might see: "Failed to fetch" or "CORS error"
   
3. Make sure you're going to the right URL:
   - Must be exactly: `http://localhost:3000`
   - NOT: `file:///F:/Web_dev/frontend/products.html`

## Need Full MySQL Setup Later?

See `SETUP_GUIDE.md` for instructions on setting up the full version with MySQL.

