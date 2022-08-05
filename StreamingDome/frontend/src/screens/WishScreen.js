import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToWish, removeFromWish } from '../actions/wishActions'

const WishScreen = ({ match, location, history }) => {
	const productId = match.params.id
	const [purchase] = useState("Buy")

	const qty = location.search ? Number(location.search.split('&')[0].split('=')[1]) : 1
	const option = location.search ? location.search.split('&')[1].split('=')[1] : "Buy"

	const dispatch = useDispatch()

	const wish = useSelector((state) => state.wish)
	const { wishItems } = wish

	useEffect(() => {
		if (productId) {
			dispatch(addToWish(productId, qty, option))
		}
	}, [dispatch, productId, qty, option])

	const removeFromWishHandler = (id) => {
		dispatch(removeFromWish(id))
	}

	const addToCartHandler = () => {
		removeFromWishHandler(match.params.id)
		history.push(`/cart/${match.params.id}?qty=1&option=${purchase}`)
	}

	return (
		
}

export default WishScreen
