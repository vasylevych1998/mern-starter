// Import Actions
import { TOGGLE_ADD_POST, TOGGLE_ADD_COMMENT } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  showAddComment: false,
  isEdit: false,
  editData: {},
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        ...state,
        showAddPost: !state.showAddPost,
      };

    case TOGGLE_ADD_COMMENT:
      return {
        ...state,
        isEdit: action.payload.isEdit,
        editData: action.payload.editData,
        showAddComment: action.payload.isEdit || !state.showAddComment,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;
export const getShowAddComment = state => state.app.showAddComment;
export const getIsEdit = state => state.app.isEdit;
export const getEditData = state => state.app.editData;

// Export Reducer
export default AppReducer;
