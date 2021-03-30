import mongoose from 'mongoose';

const CompletedOrderSchema = new mongoose.Schema({
  buyerId: { type: String, required: true },
  buyerUsername: {type: String, required: true},
  buyerEmail: {type: String, required: true},
  shipping: {type: Object, required: true},
  products: {type: Array, required: true},
  subTotal: {type: Number, required: true},
  totalCost: { type: Number, required: true },
  dateCreated: { type: Date, default: Date.now() },
  status: {type: String},
  dateCompleted: {type: Date, default: Date.now() }
});

export default mongoose.models.CompletedOrder || mongoose.model('CompletedOrder', CompletedOrderSchema)