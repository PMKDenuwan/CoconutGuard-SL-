const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model'); // Adjust path if needed

// 1️⃣ **Update your MongoDB URI here** (Use your actual database name)
const MONGO_URI = 'mongodb://localhost:27017/diseasedetect'; // Change this if using MongoDB Atlas

// 2️⃣ **Set the new password you want for the admin**
const NEW_ADMIN_PASSWORD = '123456'; // Change this to your desired password

// Function to reset the admin password
const resetAdminPassword = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log('✅ Connected to MongoDB');

        // Find the admin user
        const adminUser = await User.findOne({ isAdmin: true });

        if (!adminUser) {
            console.log('❌ No admin user found!');
            mongoose.disconnect();
            return;
        }

        // Hash the new password
        const hashedPassword = bcrypt.hashSync(NEW_ADMIN_PASSWORD, 10);

        // Update the admin password
        adminUser.password = hashedPassword;
        await adminUser.save();

        console.log('✅ Admin password reset successfully!');

        // Disconnect from database
        mongoose.disconnect();
    } catch (error) {
        console.error('❌ Error resetting password:', error);
        mongoose.disconnect();
    }
};

// Execute the function
resetAdminPassword();
