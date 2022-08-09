import mongoose from 'mongoose'

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    cartItems: [
      {
        original_title: { type: String, required: true },
        qty: { type: Number, required: true },
        poster_path: { type: String, required: true },
        price: { type: Number, required: true },
        purchase: {type: String, required: false, default: "Buy"},
        expiry_date: { type: String, required: false},
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      }
    ]
  },
  {
    timestamps: true,
  }
)

const Cart = mongoose.model('Cart', cartSchema)

export default Cart
