import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateCreated: {type: Date, default: Date.now()},
  imgUrl: {type: String}
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema)