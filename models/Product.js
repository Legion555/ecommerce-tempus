import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: {type: String, required: true},
  category: {type: String, required: true},
  imgUrl: {type: String}
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)