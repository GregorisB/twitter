const express = require("express");
const router = express.Router();
const postController = require("../controllers/post_controller");
const { isloggedIn } = require("../middleware/isLoggedIn");
const catchAsync = require("../utils/catchAsync");
const { postSchema } = require("../middleware/schemaValidation")
const ExpressError = require("../utils/ExpressError");

// check for form errors before take action
const validatePost = (req, res, next) => {
    const { error } = postSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

router.get("/", isloggedIn, postController.renderIndex);

router.get("/load-posts", isloggedIn, catchAsync(postController.loadPosts));

router.route("/edit-post/:postId([0-9a-f]{24})")
    .get(isloggedIn, postController.editPost)
    .patch(isloggedIn, postController.editPostLogic)

router.get("/repost/:postId", isloggedIn, catchAsync(postController.repost));

router.post("/new-post", isloggedIn, validatePost, catchAsync(postController.createPost));

router.post("/like-post/:postId", isloggedIn, catchAsync(postController.likePost));

router.post("/comment-post/:postId", isloggedIn, catchAsync(postController.commentPost));

router.delete("/delete-post/:postId", isloggedIn, catchAsync(postController.deletePost))

module.exports = router;
