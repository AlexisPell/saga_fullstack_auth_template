const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/error')
const mongoDB = require('./config/db')

const app = express()

dotenv.config({ path: './config/config.env' })
mongoDB()

// Route files
const auth = require('./routes/auth')

// Init middleware
app.use(
	express.json(),
	mongoSanitize(),
	helmet(),
	xss(),
	rateLimit({
		windowMs: 10 * 60 * 1000, //10 minutes
		max: 100,
	}),
	hpp(),
	cors(),
	cookieParser()
)

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// Mounte routes
app.use('/api/auth', auth)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running on port ${PORT}`.blue.bold))

process.on('unhandleRejection', (err, promise) => {
	console.log(`Error: ${err.message}`)
})
