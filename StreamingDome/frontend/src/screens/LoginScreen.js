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

        <Form.Group controlId='email'>
          <Form.Label style={{color: "black"}}><h1>Sign In</h1></Form.Label>
          <br></br>
          <Form.Label style={{color: "black"}}>Email Id</Form.Label>
          <Form.Control size="lg"
            style={{color: "black",backgroundColor:"rgb(232, 240, 254)",borderRadius:"5px",border:"none",outline:"transparent", textIndent:"18px",padding:"10px",height:"50px",width:"110%",marginBottom:"30px"}}
            type='email'
            placeholder='Enter email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group  className="mb-3" controlId='password'>
          <Form.Label style={{color: "black"}}>Password</Form.Label>

          <Form.Control size="lg"
          style={{color: "black",backgroundColor:"rgb(232, 240, 254)",borderRadius:"5px",border:"none",outline:"transparent", textIndent:"18px",padding:"10px",height:"50px",width:"110%",marginBottom:"30px"}}

            type='password'
            placeholder='Enter password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          
        </Form.Group>

        <Button type='submit' variant='info' style={{backgroundColor:"black",borderRadius:"8px"}}>
          Sign In
        </Button>
      </Form>

      <Row className='py-3' >
        <Col>
          <span style={{color: "black"}}>New Customer?{' '}</span>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          <span style={{color: "black"}}><u> Sign Up</u></span>
          </Link>
        </Col>
      </Row>
    </FormContainer>
    </Form>
    </div>
  )
}

export default LoginScreen
