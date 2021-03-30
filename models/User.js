import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now() },
  activeOrders: {type: Array},
  completedOrders: {type: Array},
  role: {type: String, default: 'customer'}
});

export default mongoose.models.User || mongoose.model('User', UserSchema)