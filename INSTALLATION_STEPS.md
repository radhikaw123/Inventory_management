# 📥 Installation Steps - What You Need to Install

## Current Status
❌ Node.js is **NOT INSTALLED** - This is why the commands aren't working!

## Step-by-Step Installation Guide

### Step 1: Install Node.js ✅ REQUIRED

**This is the MOST IMPORTANT step!**

1. **Open your web browser**
2. **Go to:** https://nodejs.org/
3. **Download the LTS version** (Recommended, the green button)
   - It will download a file like: `node-v20.x.x-x64.msi`
4. **Run the installer**
   - Double-click the downloaded file
   - Click "Next" through all the prompts
   - ✅ Make sure "Add to PATH" is checked (should be checked by default)
   - Click "Install"
   - Wait for installation to complete
5. **Restart your computer** (Important!)
6. **Verify installation:**
   - Open PowerShell in `C:\Web_dev` folder
   - Run: `node --version`
   - You should see something like: `v20.x.x`
   - Run: `npm --version`
   - You should see something like: `10.x.x`

---

### Step 2: Install MySQL (Optional - Only if you want full database)

**Skip this step if you just want to test the frontend with mock data.**

1. **Download MySQL:** https://dev.mysql.com/downloads/mysql/
2. **Run the installer**
3. **During setup:**
   - Choose "Developer Default"
   - Set a root password (remember this!)
   - Click through the rest
4. **Start MySQL:**
   - MySQL should start automatically
   - Or search for "MySQL" in Windows and start the service

---

## After Installation - Run These Commands

Open PowerShell in `C:\Web_dev` and run these commands **one by one**:

```powershell
# 1. Navigate to project folder
cd C:\Web_dev

# 2. Install dependencies
npm install

# 3. Test without MySQL (uses mock data)
npm run test
```

Then open your browser and go to: **http://localhost:3000**

---

## Quick Test (Without MySQL)

If you just want to see if everything works:

```powershell
cd C:\Web_dev
npm install
npm run test
```

This will run the server with mock data (no MySQL needed).

Open browser: http://localhost:3000

---

## Full Setup (With MySQL)

If you installed MySQL and want the full version:

```powershell
cd C:\Web_dev
npm install
npm run setup
npm start
```

---

## Troubleshooting

### "node is not recognized"
- **Solution:** Node.js is not installed. Follow Step 1 above.

### "npm is not recognized"
- **Solution:** Node.js is not installed. Follow Step 1 above.

### Installation worked but commands still fail
- **Solution:** Restart your computer after installing Node.js

### "Port 3000 already in use"
- **Solution:** Close any other programs using port 3000
- Or edit `.env` file and change `PORT=3001`

---

## What Each Command Does

1. **`npm install`**
   - Downloads all required packages (express, mysql2, etc.)
   - Creates `node_modules` folder
   - Should only be run once

2. **`npm run test`**
   - Starts server with mock data
   - No MySQL required
   - Good for testing

3. **`npm run setup`**
   - Creates `.env` file (you'll be prompted)
   - Creates database
   - Inserts sample data
   - Requires MySQL

4. **`npm start`**
   - Starts production server
   - Requires MySQL setup
   - Uses real database

---

## Summary

### Minimum Required:
✅ **Install Node.js** from https://nodejs.org/

### Optional:
⭕ MySQL (only needed for database features)

---

## After Installing Node.js

Come back to this folder (`C:\Web_dev`) and run:

```powershell
npm install
npm run test
```

Then open: http://localhost:3000

---

## Need Help?

- Node.js issues: Check https://nodejs.org/en/download/
- MySQL issues: Check `SETUP_GUIDE.md`
- Project issues: Check `HOW_TO_FIX_ERROR.md`

**Start with installing Node.js - that's the first step!**

