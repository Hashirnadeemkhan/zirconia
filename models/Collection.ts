import mongoose from 'mongoose';

export interface ICollection extends mongoose.Document {
  title: string;
  slug: string;
  image: string;
  description: string;
  isActive: boolean;
  order: number;
}

const collectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a collection title'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Please provide a collection slug'],
    unique: true,
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Please provide a collection image'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a collection description'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

export default mongoose.models.Collection || mongoose.model<ICollection>('Collection', collectionSchema); 