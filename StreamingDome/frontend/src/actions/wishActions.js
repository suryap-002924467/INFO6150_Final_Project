import axios from 'axios'
import {
	WISH_ADD_ITEM,
	WISH_REMOVE_ITEM,
} from '../constants/wishConstants'

export const addToWish = (id, qty, option) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`)

	dispatch({
		type: WISH_ADD_ITEM,
		payload: {
			product: data._id,
			original_title: data.original_title,
			poster_path: data.poster_path,
			price: option === "Buy" ? data.price : data.rent_price,
			availableToRent: data.availableToRent,
			qty,
		},
	})

	localStorage.setItem('wishItems', JSON.stringify(getState().wish.wishItems))
}

export const removeFromWish = (id) => (dispatch, getState) => {
	dispatch({
		type: WISH_REMOVE_ITEM,
		payload: id,
	})

	localStorage.setItem('wishItems', JSON.stringify(getState().wish.wishItems))
}