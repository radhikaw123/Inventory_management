const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Try to load .env file
try {
    const envPath = path.join(__dirname, '../../.env');
    if (fs.existsSync(envPath)) {
        require('dotenv').config();
    } else {
        console.warn('⚠️  .env file not found. Using default values.');
        console.warn('💡 To create .env file, run: node setup-env.js');
    }
} catch (error) {
    console.warn('⚠️  Could not load .env file. Using default values.');
}

// Database connection configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'inventory_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Promise wrapper for the pool
const promisePool = pool.promise();

// Test the connection on startup with retry logic
let connectionAttempts = 0;
const maxAttempts = 3;

function testConnection() {
    pool.getConnection((err, connection) => {
        if (err) {
            connectionAttempts++;
            console.error(`❌ Database connection error (${connectionAttempts}/${maxAttempts}):`, err.message);
            
            if (connectionAttempts < maxAttempts) {
                console.log(`🔄 Retrying connection in 3 seconds...`);
                setTimeout(testConnection, 3000);
            } else {
                console.error('\n⚠️  Failed to connect to MySQL database after multiple attempts.');
                console.error('📋 Please check the following:');
                console.error('   1. Is MySQL running? (Check with: mysql -u root -p)');
                console.error('   2. Is the database "inventory_db" created?');
                console.error('   3. Are your credentials correct in the .env file?');
                console.error('   4. Run: node setup-env.js to create a .env file');
                console.error('\n💡 To set up the database, run: node setup-database.js\n');
            }
            return;
        }
        
        console.log('✅ Connected to MySQL database successfully');
        connection.release();
    });
}

// Start connection test
testConnection();

// Export the promise pool
module.exports = promisePool;

