import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userScema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, require:true},
    createdAt: { type: Date, default: Date.now}
});


//hashing
userScema.pre('save',async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userScema.method.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
};

export default mongoose.model('User', userScema);