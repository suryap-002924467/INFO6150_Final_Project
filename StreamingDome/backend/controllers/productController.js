import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import axios from 'axios'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import fs from 'fs'
import request from 'request'


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
      original_title: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // const product = await Product.findById("62f2d5930c4142500479d0d6")
  // let obj = product.toObject()
  // delete obj._id
  //
  const docClone = new Product();
  console.log(req.user)
  docClone.user = req.user._id

  // product._id = new mongoose.Types.ObjectId();
  const newProduct = await docClone.save()
  res.status(201).json(newProduct)
})


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    status,
  } = req.body

  const product = await Product.findById(req.params.id)

  var newImg = image.split('w500')
  if (product) {
    // product.name = name
    // product.price = price
    // product.description = description    
    // product.brand = brand
    // product.category = category
    // product.countInStock = countInStock
    product.original_title = name
    product.overview = description
    product.price = price
    product.availableToRent = countInStock
    product.original_language = brand
    product.rent_price = category
    if (status == 'Available') product.availableToRent = true
    else if (status == 'NotAvailable') product.availableToRent = false
    product.poster_path = nweImg ? process.env.TMDB_IMAGE_PREFIX + 'w500' + newImg[1]
    console.log(product.poster_path)
    console.log(status)
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  console.log(process.env.TMDB_API_KEY);
  // const apiProducts = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`);
  const apiProducts = await Product.find({}).sort({ rating: -1 }).limit(10)
  //console.log(apiProducts.data.results);

  // const topProducts = apiProducts.data.results.map((product) => {
  //   product.poster_path = process.env.TMDB_IMAGE_PREFIX + 'w500' + product.poster_path
  //   product.backdrop_path = process.env.TMDB_IMAGE_PREFIX + 'original' + product.backdrop_path
  //   return { ...product}
  // })
  res.json(apiProducts)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
