const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path'); // ✅ ADD THIS

// Route imports
const uploadRoutes = require('./routes/uploadRoutes');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const doctorDashboardRoutes = require('./routes/doctorDashboardRoutes');

const app = express();
const port = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log("MongoDB connection error:", err));

// ================= API ROUTES =================
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/doctor-dashboard', doctorDashboardRoutes);
app.use('/api/upload', uploadRoutes);

// ================= FRONTEND SERVE =================

// Serve React build files
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

// Handle all other routes (React Router)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

// ================= SERVER START =================
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});