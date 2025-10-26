const mysql = require('mysql2');

// Simple database configuration (without dotenv for easier setup)
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'your_password_here',  // CHANGE THIS to your MySQL root password
    database: 'inventory_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
        console.log('\n⚠️  Please check:');
        console.log('1. Is MySQL running?');
        console.log('2. Is the database "inventory_db" created?');
        console.log('3. Is the password correct?');
        console.log('\nTo fix this, edit this file and update the password.');
        return;
    }
    console.log('✅ Connected to MySQL database successfully');
    connection.release();
});

module.exports = pool.promise();

