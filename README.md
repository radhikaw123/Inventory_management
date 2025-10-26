# Inventory Management System

A modern web-based inventory management system built with HTML, CSS, JavaScript, Node.js, Express, and MySQL.

## Features

- 📦 Product Management
- 📊 Inventory Tracking
- 📋 Order Management
- 💰 Sales Management
- 📈 Analytics Dashboard
- 🔍 Search and Filter Products

## Technologies Used

- **Frontend**: HTML5, CSS3, Modern JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **APIs**: RESTful API

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up MySQL database:
   - Create a MySQL database
   - Update database credentials in `backend/config/database.js`
   - Run the SQL schema file to create tables:
     ```bash
     mysql -u root -p your_database < database/schema.sql
     ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
inventory-management-system/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── inventory.js
│   │   └── orders.js
│   └── server.js
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── app.js
│   │   ├── products.js
│   │   └── orders.js
│   ├── index.html
│   ├── products.html
│   └── orders.html
├── database/
│   └── schema.sql
├── package.json
└── README.md
```

## Features Overview

### Dashboard
- Overview of total products, low stock items, recent orders
- Quick statistics and charts

### Products Management
- Add, edit, delete products
- View product details
- Search and filter products

### Inventory Management
- Track stock levels
- Update inventory quantities
- Low stock alerts

### Order Management
- Create new orders
- View order history
- Track order status

## Default Credentials

No authentication is implemented in this basic version for demonstration purposes.

## License

MIT License

