import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import '../css/loginForm.css'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
       <Form className="rounded p-4 p-sm-3">
    <FormContainer>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
     
        <Form.Group className="mb-3" controlId='email'>
          <Form.Label style={{color: "white"}}>Email Address</Form.Label>
          <Form.Control size="small" width={50}
            type='email'
            placeholder='Enter email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group  className="mb-3" controlId='password'>
          <Form.Label style={{color: "white"}}>Password</Form.Label>
          <Form.Control 
            type='password'
            placeholder='Enter password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          
        </Form.Group>

        <Button type='submit' variant='info'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3' >
        <Col>
          <span style={{color: "white"}}>New Customer?{' '}</span>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          <span style={{color: "white"}}> Register</span>
          </Link>
        </Col>
      </Row>
    </FormContainer>
    </Form>
    </div>
  )
}

export default LoginScreen
