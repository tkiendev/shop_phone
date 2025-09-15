const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Kết nối MongoDB thành công');

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err.message);
        });
    } catch (err) {
        console.error('Lỗi khi kết nối MongoDB:', err.message);
    }
}

module.exports = connectDB;
