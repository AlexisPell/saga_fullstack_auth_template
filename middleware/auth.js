const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponce = require('./../utils/errorResponse')
const User = require('./../models/User')

exports.protect = asyncHandler(async (req, res, next) => {
	let token = req.header('authorization')

	if (!token) {
		return next(new ErrorResponce('Not authorized for this route...', 401))
	}

	// Verify token
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		req.user = await User.findById(decoded.id)

		next()
	} catch (err) {
		return next(new ErrorResponce('Not authorized for this route...', 401))
	}
})
