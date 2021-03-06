

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Admin = require('../models/admin');

const router = express.Router();

/* =================================================================================== */
// CREATE NEW ADMIN
router.post('/', (req, res, next) => {

	// Check that all required fields are present
	const requiredFields = ['username', 'email', 'companyName', 'password', 'phoneNumber'];
	const missingField = requiredFields.find(field => !(field in req.body));

	if (missingField) {
		const err = new Error(`Missing ${missingField} in request body`);
		err.status = 422;
		return next(err);
	}

	// Check that all string fields are strings
	const stringFields = ['username', 'email', 'companyName', 'password', 'phoneNumber'];
	const nonStringField = stringFields.find(field => {
		field in req.body && typeof req.body[field] !== 'string';
	});

	if (nonStringField) {
		const err = new Error(`Field: '${nonStringField}' must be typeof String`);
		err.status = 422;
		return next(err);
	}

	// Check that fields are trimmed as needed
	const trimmedFields = ['username', 'email', 'companyName', 'password', 'phoneNumber'];
	const nonTrimmedField = trimmedFields.find(field => {
		req.body[field].trim() !== req.body[field];
	});

	if (nonTrimmedField) {
		const err = new Error(`Field: '${nonTrimmedField}' cannot start or end with a whitespace!`);
		err.status = 422;
		return next(err);
	}

	const sizedFields = {
		username: { min: 1 },
		email: { min: 6 },
		companyName: { min: 1 },
		password: { min: 8, max: 72 },
	};

	const tooSmall = Object.keys(sizedFields).find(field => {
		if(req.body[field])
			return 'min' in sizedFields[field] && req.body[field].trim().length < sizedFields[field].min;
	});

	const tooLarge = Object.keys(sizedFields).find(field => {
		if(req.body[field])
			return 'max' in sizedFields[field] && req.body[field].trim().length > sizedFields[field].max;
	});

	if (tooSmall) {
		const min = sizedFields[tooSmall].min;
		const err = new Error(`Field: '${tooSmall}' must be at least ${min} characters long`);
		err.status = 422;
		return next(err);
	}

	if (tooLarge) {
		const max = sizedFields[tooLarge].max;
		const err = new Error(`Field: '${tooLarge}' must be at most ${max} characters long `);
		err.status = 422;
		return next(err);
	}

	// Create the new admin user
	let { username, email, companyName, password, phoneNumber } = req.body;


	return Admin.hashPassword(password)
		.then(digest => {
			const newAdmin = {
				username,
				email,
				companyName,
				phoneNumber,
				password: digest
			};
			return Admin.create(newAdmin);
		})
		.then(result => {
			return res.status(201)
				.location(`/api/admin/${result.id}`)
				.json(result);
		})
		.catch(err => {
			if (err.code === 11000) {
				err = new Error('The email already exists');
				err.status = 400;
			}
			next(err);
		});
});

/* =================================================================================== */
// GET ALL ADMINS - commented out in production
// router.get('/', (req, res, next) => {
// 	Admin.find()
// 		.then(admin => {
// 			res.json(admin);
// 		})
// 		.catch(err => {
// 			console.error(err);
// 			next(err);
// 		});
// });

/* =================================================================================== */
// DELETE A USER BY ID - commented out in production
// Needs to delete all things associated with it (employees, frames)
// router.delete('/:adminId', (req, res, next) => {
// 	const { adminId } = req.params;

// 	Admin.findOneAndRemove({ _id: adminId })
// 		.then(() => {
// 			return res.status(204).json({
// 				message: 'Deleted Admin user'
// 			});
// 		})
// 		.catch(err => {
// 			console.error(err);
// 			next(err);
// 		});
// });


/* =================================================================================== */
// PROTECTED
router.use('/:adminId', passport.authenticate('jwt', { session: false, failWithError: true }));

// GET ADMIN BY ID
router.get('/:adminId', (req, res, next) => {
	const { adminId } = req.params;

	// Valid input check
	if(!mongoose.Types.ObjectId.isValid(adminId)) {
		const err = new Error('The `id` is not valid');
		err.status = 400;
		return next(err);
	}

	Admin.findById({ _id: adminId })
		.then(admin => {
			if (admin) {
				res.json(admin);
			} else {
				next();
			}
		})
		.catch(err => {
			console.error(err);
			next(err);
		});
});

/* =================================================================================== */
// PUT ADMIN BY ID
router.put('/:adminId', (req, res, next) => {

	const { adminId } = req.params;

	/* Valid input check START */
	if (!mongoose.Types.ObjectId.isValid(adminId)) {
		const err = new Error('The `id` is not valid');
		err.status = 400;
		return next(err);
	}
	const stringFields = ['username', 'email', 'companyName', 'phoneNumber', 'password'];
	const nonStringField = stringFields.find(field => {
		return field in req.body && typeof req.body[field] !== 'string';
	});

	if (nonStringField) {
		const err = new Error(`Field: '${nonStringField}' must be typeof String`);
		err.status = 422;
		return next(err);
	}
	const trimmedFields = ['username', 'email', 'companyName', 'phoneNumber', 'password'];
	const nonTrimmedField = trimmedFields.find(field => {
		if(req.body[field]){
			return field in req.body && req.body[field].trim() !== req.body[field];
		}
	});

	if (nonTrimmedField) {
		const err = new Error(`Field: '${nonTrimmedField}' cannot start or end with a whitespace!`);
		err.status = 422;
		return next(err);
	}

	const sizedFields = {
		username: { min: 1 },
		email: { min: 6 },
		companyName: { min: 1 },
		password: { min: 8, max: 72 },
	};

	const tooSmall = Object.keys(sizedFields).find(field => {
		if(req.body[field]) {
			return 'min' in sizedFields[field] && req.body[field].trim().length < sizedFields[field].min;
		}
	});

	const tooLarge = Object.keys(sizedFields).find(field => {
		if(req.body[field])
			return 'max' in sizedFields[field] && req.body[field].trim().length > sizedFields[field].max;
	});

	if (tooSmall) {
		const min = sizedFields[tooSmall].min;
		const err = new Error(`Field: '${tooSmall}' must be at least ${min} characters long`);
		err.status = 422;
		return next(err);
	}

	if (tooLarge) {
		const max = sizedFields[tooLarge].max;
		const err = new Error(`Field: '${tooLarge}' must be at most ${max} characters long `);
		err.status = 422;
		return next(err);
	}
	/* Valid input check END */


	let{password} = req.body;

	return Admin.hashPassword(password)
		.then(digest => {
			const admin = {
				...req.body,
				password: digest
			};
			return Admin.findByIdAndUpdate(adminId, admin, { new:true });
		})
		.then(admin => {
			if (admin) {
				res.json(admin);
			} else {
				next();
			}
		})
		.catch(err => {
			if (err.code === 11000) {
				err = new Error('Email already exists');
				err.status = 400;
			}
			next(err);
		});
});

module.exports = router;

