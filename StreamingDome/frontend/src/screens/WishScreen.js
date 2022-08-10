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
		history.push(`/cart/${match.params.id}?qty=1&option=${purchase}`)
	}

	return (
		<Row>
			<Col md={9}>
				<h1>Wish List</h1>
				{wishItems.length === 0 ? (
					<Message>
						Your wish list is empty <Link to='/'>Go Back</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{wishItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.poster_path} alt={item.original_title} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.original_title}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={3}>
										<Button
											// onClick={addToCartHandler}
											onClick={() => {removeFromWishHandler(item.product); addToCartHandler()}}
											className='btn-block'
											type='button'
											disabled={item.product.availableToRent === false}
										>
											Add To Cart
										</Button>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromWishHandler(item.product)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
		</Row>
	)
}

export default WishScreen
