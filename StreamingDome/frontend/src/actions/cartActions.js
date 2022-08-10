import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ITEMS_MY_REQ,
  CART_ITEMS_REQ_FAIL,
  CART_ITEMS_REQ_SUCCESS,
  CART_ITEMS_RESET
} from '../constants/cartConstants'

import { logout } from './userActions'


export const addToCart = (id, qty, purchase) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      original_title: data.original_title,
      poster_path: data.poster_path,
      price: purchase === "Buy" ? data.price : data.rent_price,
      purchase: purchase,
      expiry_date: purchase === "Rent" ? new Date((new Date()).getTime() + (10 * 86400000)).toLocaleString() : "N/A",
      availableToRent: data.availableToRent,
      qty,
    },
  })

  // const {
  //   userLogin: { userInfo },
  // } = getState()
  //
  //
  // if(userInfo) {
  //
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${userInfo.token}`,
  //     },
  //   }
  //   const { data } = await axios.put(`/api/users/mycart/items`, getState().cart, config)
  //   dispatch({type: CART_ITEMS_REQ_SUCCESS,
  //     payload: data})
  // }
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const listMyCartItems = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_ITEMS_MY_REQ,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/mycart/items`, config)
    console.log(data)

    dispatch({
      type: CART_ITEMS_REQ_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CART_ITEMS_REQ_FAIL,
      payload: message,
    })
  }
}
