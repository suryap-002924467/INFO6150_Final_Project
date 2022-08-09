import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    original_title: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
    backdrop_path : {
      type: String,
      required: false
    },
    original_language: {
      type: String,
      required: true,
    },
    genre_ids: {
      type: Array,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    vote_average: {
      type: Number,
      required: true,
      default: 0,
    },
    vote_count: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: false,
      default: 0,
    },
    rent_price: {
      type: Number,
      required: false,
      default: 0,
    },
    availableToRent: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
