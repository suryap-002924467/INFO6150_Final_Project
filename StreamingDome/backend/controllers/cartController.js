import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'

// @desc    Get logged in user cart items
// @route   GET /api/orders/mycart/items
// @access  Private
const getMyOrderItems = asyncHandler(async (req, res) => {
  const cart = await Cart.find({ user: req.user._id })
  res.json(cart.cartItems)
})

// @desc    Add items to cart
// @route   PUT /api/orders/mycart/items
// @access  private
const addItemsToCart = asyncHandler(async (req, res) => {
  const {
    cartItems
  } = req.body

  console.log(req.user)
  console.log(cartItems)
  if (cartItems && cartItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const cart = await Cart.findOne({ user: req.user})
    console.log(cart)
    if(cart) {
      cart.cartItems = cartItems
      const updatedcart = await cart.save()
      res.status(201).send(updatedcart)
    }
  }
})


export {
  getMyOrderItems,
  addItemsToCart
}
