const express = require('express');
const postController = require('../controllers/postController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { validate, postSchema } = require('../middlewares/validate');

const router = express.Router();

router.get('/search', postController.search);
router.get('/', postController.getAll);
router.get('/my-posts', auth, postController.getMyPosts);
router.get('/:id', postController.getById);

router.post('/', auth, upload.single('image'), validate(postSchema), postController.create);
router.put('/:id', auth, upload.single('image'), validate(postSchema), postController.update);
router.delete('/:id', auth, postController.remove);

module.exports = router;
