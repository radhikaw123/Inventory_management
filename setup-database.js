#!/usr/bin/env node

/**
 * Setup script to create MySQL database and tables
 */

const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Try to load .env
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    require('dotenv').config();
} else {
    console.error('❌ .env file not found!');
    console.error('💡 Please run: node setup-env.js first');
    process.exit(1);
}

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    waitForConnections: true,
    connectionLimit: 5
};

const dbName = process.env.DB_NAME || 'inventory_db';

// First, connect without specifying database to create it
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password
});

console.log('\n🔧 Setting up MySQL database...\n');

connection.connect((err) => {
    if (err) {
        console.error('❌ Error connecting to MySQL:', err.message);
        console.error('\n💡 Please check:');
        console.error('   1. Is MySQL installed and running?');
        console.error('   2. Are your credentials correct in the .env file?');
        console.error('   3. Try running: mysql -u root -p to test connection\n');
        process.exit(1);
    }
    
    console.log('✅ Connected to MySQL server');
    
    // Create database
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err) => {
        if (err) {
            console.error('❌ Error creating database:', err.message);
            connection.end();
            process.exit(1);
        }
        
        console.log(`✅ Database "${dbName}" created or already exists`);
        
        // Close connection and reconnect with database
        connection.end(() => {
            const dbConnection = mysql.createConnection({
                host: dbConfig.host,
                user: dbConfig.user,
                password: dbConfig.password,
                database: dbName
            });
            
            dbConnection.connect((err) => {
                if (err) {
                    console.error('❌ Error connecting to database:', err.message);
                    process.exit(1);
                }
                
                console.log(`✅ Connected to database "${dbName}"`);
                
                // Read and execute schema file
                const schemaPath = path.join(__dirname, 'database', 'schema.sql');
                if (!fs.existsSync(schemaPath)) {
                    console.error(`❌ Schema file not found: ${schemaPath}`);
                    dbConnection.end();
                    process.exit(1);
                }
                
                const schema = fs.readFileSync(schemaPath, 'utf8');
                
                // Split by semicolons and execute each statement
                const statements = schema
                    .split(';')
                    .map(s => s.trim())
                    .filter(s => s.length > 0 && !s.startsWith('CREATE DATABASE') && !s.startsWith('USE'));
                
                let completed = 0;
                const total = statements.length;
                
                console.log(`\n📋 Creating tables and inserting sample data...\n`);
                
                statements.forEach((statement, index) => {
                    dbConnection.query(statement + ';', (err, results) => {
                        if (err) {
                            console.error(`❌ Error executing statement ${index + 1}:`, err.message);
                        } else {
                            completed++;
                            if (statement.trim().startsWith('CREATE TABLE')) {
                                const tableName = statement.match(/CREATE TABLE.*?(\w+)/i)?.[1] || 'unknown';
                                console.log(`✅ Created table: ${tableName}`);
                            }
                            if (statement.trim().startsWith('INSERT INTO')) {
                                console.log(`✅ Inserted sample data`);
                            }
                        }
                        
                        if (completed === total) {
                            console.log('\n🎉 Database setup completed successfully!\n');
                            console.log('📊 Sample data has been inserted:');
                            console.log('   - 5 products');
                            console.log('   - 5 inventory entries');
                            console.log('   - 2 suppliers\n');
                            console.log('🚀 You can now start the server with: npm start\n');
                            dbConnection.end();
                        }
                    });
                });
            });
        });
    });
});

