import { ADD_COMMENT, ADD_COMMENTS, DELETE_COMMENT, EDIT_COMMENT } from './CommentActions';

// Initial State
const initialState = { data: [] };

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        data: [action.comment, ...state.data],
      };

    case ADD_COMMENTS:
      return {
        data: action.comments,
      };

    // eslint-disable-next-line
    case EDIT_COMMENT:
      const newData = state.data.filter(comment => comment.commentCuid !== action.comment.commentCuid);
      newData.push(action.comment);

      return {
        data: newData,
      };
    case DELETE_COMMENT:
      return {
        data: state.data.filter(comment => comment.commentCuid !== action.commentCuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getComments = state => state.comments.data;

// Export Reducer
export default CommentReducer;
