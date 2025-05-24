import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
  stock: number;
  vendor: mongoose.Types.ObjectId;
  ratings: {
    user: mongoose.Types.ObjectId;
    rating: number;
    review: string;
  }[];
  averageRating: number;
  totalReviews: number;
  specifications: Record<string, string>;
  isActive: boolean;
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: 0,
  },
  images: [{
    type: String,
    required: [true, 'Please provide at least one product image'],
  }],
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
  },
  brand: {
    type: String,
    required: [true, 'Please provide a brand name'],
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: 0,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  specifications: {
    type: Map,
    of: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Calculate average rating before saving
productSchema.pre('save', function(next) {
  if (this.ratings.length > 0) {
    this.averageRating = this.ratings.reduce((acc, item) => acc + item.rating, 0) / this.ratings.length;
    this.totalReviews = this.ratings.length;
  }
  next();
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema); 