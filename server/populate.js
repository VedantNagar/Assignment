const connectDB = require('./db/connect');
require('dotenv').config();
const { users, posts } = require('./data');
const User = require('./models/User');
const Post = require('./models/Post');

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log('Connected to the DataBase Sucessfully');

		console.log('Deleting All products...');
		await User.deleteMany();
		await Post.deleteMany();
		console.log('All products Deleted');

		console.log('Adding data to Database...');
		await User.insertMany(users);
		await Post.insertMany(posts);
		console.log('Products added to Database Sucessfully');

		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
start();
