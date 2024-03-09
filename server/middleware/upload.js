const multer = require('multer');

//set storage engine
const storage = multer.diskStorage({
	destination: function (req, res, cb) {
		cb(null, 'public/assets');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

module.exports = upload;
