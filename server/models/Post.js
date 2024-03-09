const mongoose = require('mongoose');

//create schema
const postSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: [true, 'Must Provide userId'],
		},
		firstName: {
			type: String,
			required: [true, 'Must Provide First Name'],
			trim: true,
			minlength: [2, 'First Name must have 2 characters'],
			maxlength: [50, 'First Name can not exceed 50 characters'],
		},
		lastName: {
			type: String,
			required: [true, 'Must Provide Last Name'],
			trim: true,
			minlength: [2, 'Last Name must have 2 characters'],
			maxlength: [50, 'Last Name can not exceed 50 characters'],
		},
		picturePath: String,
		description: String,
		location: String,
		userPicturePath: String,
		likes: {
			type: Map,
			of: Boolean,
		},
		comments: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

module.exports = new mongoose.model('Post', postSchema);
