import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'
import axios from 'axios';

dotenv.config()

connectDB()

const roundToTwo = (num) => {
  return +(Math.round(num + "e+2")  + "e-2");
}

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const apiProducts = await (await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`)).data.results;

    const sampleProducts = apiProducts.map((product) => {
      product.price = roundToTwo(product.popularity/100)
      product.rent_price = roundToTwo(product.price/2 * Math.random())
      product.availableToRent = true
      product.poster_path = process.env.TMDB_IMAGE_PREFIX + 'w500' + product.poster_path
      product.backdrop_path = process.env.TMDB_IMAGE_PREFIX + 'original' + product.backdrop_path
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
