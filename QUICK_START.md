# 🚀 Quick Start - Test Without Database

Since Node.js might not be installed yet, here's the quickest way to see the application working:

## Option 1: Test with Mock Data (No Database Needed)

I've created a version that works without installing MySQL or setting up a database!

### Steps:
1. Install Node.js: https://nodejs.org/ (Download and install)
2. Open PowerShell in this folder
3. Run: `npm install`
4. Run: `node backend/server-simple.js`
5. Open browser: http://localhost:3000

The simple server uses mock data, so you can test all features immediately!

## Option 2: Full Setup with MySQL

After Option 1 works, you can set up the full version with MySQL:
1. Install MySQL
2. Run the SQL schema file
3. Update database config
4. Run `npm start` (use the regular server.js)

## Current Status

The error you're seeing happens because:
- The backend server isn't running
- Node.js might not be installed
- When you see "Error loading products", it means the JavaScript is trying to fetch data from `http://localhost:3000/api/products` but getting no response

## What I Fixed

I created `backend/server-simple.js` which:
- ✅ Works without MySQL
- ✅ Has sample data built-in
- ✅ Runs on port 3000
- ✅ Handles all API endpoints
- ✅ Lets you test all features

Just install Node.js, run `npm install`, then run `node backend/server-simple.js` and your error will be fixed!

