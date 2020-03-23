import Comment from '../models/comment';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all comments
 * @param req
 * @param res
 * @returns void
 */
export function getComments(req, res) {
  Comment.find({ postCuid: req.params.postCuid }).sort('-dateAdded').exec((err, comments) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comments });
  });
}

/**
 * Save a comment
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
  if (!req.body.comment.name || !req.body.comment.title || !req.body.comment.content) {
    res.status(403).end();
  }

  const newComment = new Comment(req.body.comment);

  // Let's sanitize inputs
  newComment.title = sanitizeHtml(newComment.title);
  newComment.name = sanitizeHtml(newComment.name);
  newComment.content = sanitizeHtml(newComment.content);

  newComment.slug = slug(newComment.title.toLowerCase(), { lowercase: true });
  newComment.postCuid = req.params.postCuid;
  newComment.commentCuid = cuid();

  newComment.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comment: saved });
  });
}

/**
 * Edit a comment
 * @param req
 * @param res
 * @returns void
 */
export function editComment(req, res) {
  if (!req.body.comment.name || !req.body.comment.title || !req.body.comment.content) {
    res.status(403).end();
  }
  Comment.findOneAndUpdate({ _id: req.body.comment._id }, { ...req.body.comment }, { new: true }, (err, saved) => {
    res.json({ comment: saved });
  });
}

/**
 * Delete a comment
 * @param req
 * @param res
 * @returns void
 */
export function deleteComment(req, res) {
  Comment.findOne({ commentCuid: req.params.commentCuid }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }

    comment.remove(() => {
      res.status(200).end();
    });
  });
}
