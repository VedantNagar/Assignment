const router = require('express').Router();
const {
	getFeedPosts,
	getUserPosts,
	likePost,
	createPost,
} = require('../controllers/post');
const upload = require('../middleware/upload');

//READ
router.route('/').get(getFeedPosts).post(upload.single('picture'), createPost);
router.route('/:userId/posts').get(getUserPosts);

//UPDATE
router.route('/:id/like').patch(likePost);

module.exports = router;
