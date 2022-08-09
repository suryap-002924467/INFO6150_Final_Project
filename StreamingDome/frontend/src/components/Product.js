import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.poster_path} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.original_title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <strong>Stars: {product.vote_average}</strong> <br />
          <strong>Voted by: {product.vote_count}</strong>
        </Card.Text>

      </Card.Body>
    </Card>
  )
}

export default Product
