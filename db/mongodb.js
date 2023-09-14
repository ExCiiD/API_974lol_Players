import mongoose from 'mongoose'

export const connectDB = async () => {
    const adminPassword = encodeURIComponent(process.env.ADMIN_PASSWORD)
    const url = 'mongodb+srv://admin:' + adminPassword + process.env.HOST + '/' + process.env.DB_NAME;
    console.log(url);
    try {
        await mongoose.connect(url, {});
    } catch (error) {
        console.log(error)
    }
} 

