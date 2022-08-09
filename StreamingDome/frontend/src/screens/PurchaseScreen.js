import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Accordion } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { listOrders } from '../actions/orderActions'

const PurchaseScreen = ({ location, history }) => {

    const dispatch = useDispatch()

    const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo)
      dispatch(listMyOrders())
      
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const getRentals = () => {
    return orders.filter(x => x.orderItems.every(y => y.purchase.includes("Rent")));
  }

  const getPurchases = () => {
    return orders.filter(x => x.orderItems.every(y => y.purchase.includes("Buy")));
  }

    return (
        <Row>
            <Col md={12}>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : ( 
                    <>
                    <h2>Rentals</h2><br />
                    
                        <Row>
                            {!loadingOrders && getRentals().map((order) => (
                                <Col key={order._id} sm={12} md={12} lg={12} xl={12}>  
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={3}>
                                                        <Image
                                                            src={item.poster_path}
                                                            alt={item.original_title}
                                                            fluid
                                                            rounded
                                                        />
                                                    </Col>
                                                    <Col md={3}>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.original_title}
                                                        </Link>
                                                    </Col>
                                                    <Col md={3}><h4>Expires on:</h4></Col>
                                                    <Col md={3}><h4>{item.expiry_date}</h4></Col>
                                                </Row>
                                                
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                            ))}
                        </Row>
                        <hr />
                        <h2>Purchases</h2>
                        <Row>
                            {!loadingOrders && getPurchases().map((order) => (
                                <Col key={order._id} sm={12} md={12} lg={12} xl={12}>
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={3}>
                                                        <Image
                                                            src={item.poster_path}
                                                            alt={item.original_title}
                                                            fluid
                                                            rounded
                                                        />
                                                    </Col>
                                                    <Col md={3}>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.original_title}
                                                        </Link>
                                                    </Col>
                                                    <Col md={3}><h4>Ordered on:</h4></Col>
                                                    <Col md={3}><h4>{new Date(order.createdAt).toLocaleString()}</h4></Col>
                                                </Row>
                                                
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                            ))}
                        </Row></>
                )}
            </Col>
        </Row>
        
    )
}

export default PurchaseScreen
