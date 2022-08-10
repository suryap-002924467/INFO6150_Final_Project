import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, listMyCartItems, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('&')[0].split('=')[1]) : 1
  const option = location.search ? location.search.split('&')[1].split('=')[1] : "Buy"

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if(userInfo) {
      console.log('Fetching cart items')
      dispatch(listMyCartItems())
    }
    if (productId) {
      dispatch(addToCart(productId, qty, option))
    }
  }, [dispatch, userInfo, productId, qty, option])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=payment')
  }

  const continueShopping = () => {
    history.push('/')
  }

  return (
      <Row>
        <Col md={9}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
              <Message>
                Your cart is empty <Link to='/'>Go Back</Link>
              </Message>
          ) : (
              <ListGroup variant='flush'>
                {cartItems.map((item) => (
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
                          <Form.Control
                              as='select'
                              custom
                              value={item.purchase}
                              onChange={(e) =>
                                  dispatch(
                                      addToCart(item.product, 1, e.target.value)
                                  )
                              }
                          >
                            <option key="Buy" value="Buy">
                              Buy
                            </option>
                            <option key="Rent" value="Rent">
                              Rent
                            </option>

                          </Form.Control>
                        </Col>
                        <Col md={1}>
                          <Button
                              type='button'
                              variant='light'
                              onClick={() => removeFromCartHandler(item.product)}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </Col>

                      </Row>
                      <br />
                      {item.purchase === "Rent" ?<Row>
                        <Col md={4}><h6>You have 30 days till the rental expires and once started 48 hrs to finish watching</h6></Col>
                        <Col md={4}><h6>{item.expiry_date}</h6></Col>
                      </Row> : <></>}
                    </ListGroup.Item>
                ))}
              </ListGroup>
          )}
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  items
                </h2>
                $
                {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0}
                    onClick={continueShopping}
                >
                  Continue Shopping
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
  )
}

export default CartScreen
