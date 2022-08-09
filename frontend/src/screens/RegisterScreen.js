import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'


const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [emailErr, setEmailErr] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [nameError, setNameError] = useState('');
  const [confirmPWdErr, setConfirmPasswordErr] = useState('');
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    setMessage("");
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    }
      
    

    var letters = /^[A-Za-z]+$/;

    setNameError("");

    var correctName = true;
    var correctPass = true;
    var correctEmail = true;
    var correctConfirmPass = true;

    //name validation
    if(!name.match(letters))
     {
      correctName = false;
      setNameError('Invalid name');
     }
     //email validation

     var emailValidation =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

     setEmailErr("");

     if(!email.match(emailValidation)) {
      correctEmail = false;
      setEmailErr('Invalid email');
     }

     setPwdError("");
     var passValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,15}$/

     if (!password.match(passValidation)) {
      correctPass = false;
      setPwdError('Invalid password')
     }

     setConfirmPasswordErr("");

     if (!confirmPassword.match(passValidation)) {
       correctConfirmPass = false;
      setConfirmPasswordErr('Invalid confirm password')
     }

    if (name !== null && email !== null && password !== null && confirmPassword !== null 
      && correctName && correctEmail && correctPass && correctConfirmPass)  {

      console.log("Inside else block")
      dispatch(register(name, email, password))
    }
  
  }
  

  return (
    
    <div className="color-overlay d-flex justify-content-center align-items-center">
       <Form className="rounded p-4 p-sm-3">
    <FormContainer>

      <h1 style={{color: "white"}} >Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}

      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group   className="mb-3" controlId='name'>
          <Form.Label style={{color: "white"}}>Name</Form.Label>
          <Form.Control 
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          >

          </Form.Control>
          <div>
         {/* {emailErr && <p>Your email is invalid</p>}
         {pwdError && <p>Your password is invalid</p>} */}
         {nameError}

      </div>
          <div>
      </div>
          
        </Form.Group>

        <Form.Group   className="mb-3" controlId='email'>
        <Form.Label style={{color: "white"}}>Email Address</Form.Label>
          <Form.Control  
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            
          </Form.Control>
          <div>
          {emailErr}
         {/* {pwdError && <p>Your password is invalid</p>}
         {nameError && <p>Your name is invalid</p>} */}
      </div>
        </Form.Group>

        <Form.Group   className="mb-3" controlId='password'>
        <Form.Label style={{color: "white"}}>Password</Form.Label>
          <Form.Control 
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <div>
         {/* {emailErr && <p>Your email is invalid</p>} */}
         {pwdError}
         {/* {nameError && <p>Your name is invalid</p>} */}
      </div>
        </Form.Group>

        <Form.Group  className="mb-3" controlId='confirmPassword'>
          <Form.Label style={{color: "white"}}>Confirm Password</Form.Label>
          <Form.Control 
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
          <div>
          {confirmPWdErr}
          </div>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
         
        </Button>
        
        
      </Form>

      <Row className='py-3'>
        <Col>
        <Form.Label style={{color: "white"}}>Have an Account?{' '}</Form.Label>  
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>

          <Form.Label style={{color: "white"}}>Login{' '}</Form.Label>  
          </Link>
        </Col>
      </Row>
    </FormContainer>
    </Form>
    </div>
  )
}

export default RegisterScreen