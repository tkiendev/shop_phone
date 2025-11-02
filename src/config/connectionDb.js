require('dotenv').config();
const mysql = require('mysql2/promise');

let connection = null;

const initConnection = async () => {
    if (connection) return connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || '',
            database: process.env.MYSQL_DATABASE || '',
        });

        console.log('✅ Kết nối MySQL thành công');
        return connection;
    } catch (error) {
        console.error('❌ Kết nối MySQL thất bại:', error.message);
        return null;
    }
};

module.exports = initConnection;
