## Streaming Dome

![streaming-dome](./streaming-dome.png?raw=true "Streaming-Dome")


> Overview 

The craze and the popularity of watching movies is not something new to us, from the time it started up to this present time. 

To watch a movie, you basically have two options, one, to watch it online and two, to watch it in theatres.

With technology that has advanced from the time movies ran in theaters we have come a long way to have the same form of entertainment reach us at the comfort and convenience of our home or anywhere we wish.

>Problem statement

- Not everybody in today's world has the time to go to theaters to watch a movie

- People like to have easy accessibility to be able to watch a movie from anywhere anytime as many number of times they wish

- Theaters can get expensive for a one-time watch

> About 

We have developed an e-commerce platform called Steaming Dome that helps you get easy access to the latest movies by either purchasing it or renting it

We realize that not everyone has the time to go to a theater to watch a movie

It can also get expensive to just have the movie watched once on the big screen

Streaming Dome helps you have a lifetime access of the movie once it is bought, and a rented version for those who want to have the movie at a lesser price.

> Technical stack

We are using MERN stack
- MongoDB: as our data store, hosted in atlas
- Express: node library for rest end point creation
- React: Frontend framework for consuming rest endpoints
- Node: Backend server environment
- Libraries:
  - axios: for performing rest endpoint calls
  - react-bootstrap: frontend UI library for styling
  - mongoose: used as a middleware to connect to mongoDB
  - bcrypt: used for authentication
  - JWT: for safe transfer of JSON data
  - Redux: used for session management
- End to end data consistency was ensured using validation for each field
- Role based authentication
- Completely responsive
- Used the movieDB API to retrieve details and posters about movies
- PayPal payment API: used for payment gateway
- A Model-View-Controller architecture is followed throughout the project
- The entire application is deployed at Heroku - https://streaming-dome.herokuapp.com/

> How to Use the Project


We have developed the website called streaming app
- It is a movie buy/rental page
- There are 2 roles involved- Admin and User
- The admin is allowed to do CRUD options on movies, and users
- User would need to first register to the website
- The user can sign in and browse through all the movies
- There is a search bar provided to help search movies directly from the home page
- When clicked on a movie, it opens a new page showing the image of the movie, a short description of the movie, a reviews section, price, and status of the movie (coming soon, available, etc.)
- This page has a reviews section where a user can view reviews given by different users and add a review of their own by adding a rating along with a comment for the respective movie. The user is not allowed to give more than one rating for the same movie.
- From this page, the user can add the movie to their wish list or/and their cart
- Movies from the wish list have the option to be moved to the cart or deleted
- Movies can be either rented or bought by toggling the drop down, with each having their respective prices
- In the cart there are 2 options, either to make a payment by clicking on the "proceed to checkout" button, or continue shopping by clicking on the "continue shopping" button which would take the user to the home page
- Make a payment option can be used to make payments using PayPal, Credit/Debit card, or the Pay later option
- The user has a profile page where he/she can make changes to their profile (name, password etc.)
- Clicking on the logo "streaming dome" on the top nav bar takes you to the home page.

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```
- Change the `"react-scripts --openssl-legacy-provider start"` to `"react-scripts start"` in `frontend/package.json`

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
123456

john@example.com (Customer)
123456

jane@example.com (Customer)
123456
```

> Application is available at - https://streaming-dome.herokuapp.com/

