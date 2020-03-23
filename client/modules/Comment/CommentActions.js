import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// Export Actions
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment,
  };
}

export function addCommentRequest(postCuid, comment) {
  return (dispatch) => {
    return callApi(`posts/${postCuid}/comments`, 'post', {
      comment,
    }).then(res => dispatch(addComment(res.comment)));
  };
}

export function editCommentRequest(comment) {
  return (dispatch) => {
    return callApi(`comments/${comment.commentCuid}`, 'post', {
      comment,
    }).then(res => dispatch(editComment(res.comment)));
  };
}

export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  };
}

export function fetchComments(postCuid) {
  return (dispatch) => {
    return callApi(`posts/${postCuid}/comments`).then(res => {
      dispatch(addComments(res.comments));
    });
  };
}

export function fetchComment(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addComment(res.post)));
  };
}

export function deleteComment(commentCuid) {
  return {
    type: DELETE_COMMENT,
    commentCuid,
  };
}

export function deleteCommentRequest(commentCuid) {
  return (dispatch) => {
    return callApi(`comments/${commentCuid}`, 'delete').then(() => dispatch(deleteComment(commentCuid)));
  };
}
