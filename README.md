# INFO6150_Final_Project
# Streaming Dome

> 
## Features

- Full featured Movie Streaming App
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
TMDB_API_KEY= Movie API Key
TMDB_MOVIE_PREFIX = Prefix for movie path
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend in frontend folder
npm start

# Run backend only in StreamingDome folder
npm start
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

Heroku steps
TBA

### Populate Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data 
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins
TBA
```
