import jwt from 'jsonwebtoken'

// Token expires in 1d and can be customized for shorter duration
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

export default generateToken
