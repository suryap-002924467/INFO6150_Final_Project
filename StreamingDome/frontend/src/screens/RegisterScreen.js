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

      <h1 style={{color: "black"}} >Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}

      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
           style={{color: "black",backgroundColor:"rgb(232, 240, 254)",borderRadius:"5px",border:"none",outline:"transparent", textIndent:"18px",padding:"10px",height:"50px",width:"110%",marginBottom:"30px"}}
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


        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
           style={{color: "black",backgroundColor:"rgb(232, 240, 254)",borderRadius:"5px",border:"none",outline:"transparent", textIndent:"18px",padding:"10px",height:"50px",width:"110%",marginBottom:"30px"}}
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

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
           style={{color: "black",backgroundColor:"rgb(232, 240, 254)",borderRadius:"5px",border:"none",outline:"transparent", textIndent:"18px",padding:"10px",height:"50px",width:"110%",marginBottom:"30px"}}
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

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
           style={{color: "black",backgroundColor:"rgb(232, 240, 254)",borderRadius:"5px",border:"none",outline:"transparent", textIndent:"18px",padding:"10px",height:"50px",width:"110%",marginBottom:"30px"}}

            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
          <div>
          {confirmPWdErr}
          </div>
        </Form.Group>

        <Button type='submit' variant='primary' style={{backgroundColor:"black",borderRadius:"8px"}}>
          Register
         
        </Button>
        
        
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}><u>
            Login
            </u>

          </Link>
        </Col>
      </Row>
    </FormContainer>
    </Form>
    </div>
  )
}

export default RegisterScreen