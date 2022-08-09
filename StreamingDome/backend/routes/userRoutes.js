import express from 'express'
const router = express.Router()
import { getMyOrders } from '../controllers/orderController.js'
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'

import { addItemsToCart, getMyOrderItems } from '../controllers/cartController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
    .route('/purchases')
    .get(protect, getMyOrders)

router.route('/mycart/items').put(protect, addItemsToCart).get(protect, getMyOrderItems)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
