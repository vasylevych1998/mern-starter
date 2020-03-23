import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Get all Comments
router.route('/posts/:postCuid/comments').get(CommentController.getComments);

// Add a new Comment
router.route('/posts/:postCuid/comments').post(CommentController.addComment);

// Edit a new Comment
router.route('/comments/:commentCuid').post(CommentController.editComment);

// Delete a comment by cuid
router.route('/comments/:commentCuid').delete(CommentController.deleteComment);

export default router;
