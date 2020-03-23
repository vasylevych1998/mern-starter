import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../../App/components/ListPage/ListItem/ListItem.css';

// Import Components
import CommentCreateWidget from '../../../Comment/components/CommentCreateWidget';
import List from '../../../App/components/ListPage/List';

// Import Actions
import { fetchPost } from '../../PostActions';
import { toggleAddComment } from '../../../App/AppActions';
import {
  addCommentRequest,
  deleteCommentRequest,
  editCommentRequest,
  fetchComments,
} from '../../../Comment/CommentActions';

// Import Selectors
import { getPost } from '../../PostReducer';
import { getEditData, getIsEdit, getShowAddComment } from '../../../App/AppReducer';
import { getComments } from '../../../Comment/CommentReducer';
import { elementTypes } from '../../../../elementTypes';

class PostDetailPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.post.cuid));
  }

  handleDeleteComment = comment => {
    if (confirm('Do you want to delete this comment')) { // eslint-disable-line
      this.props.dispatch(deleteCommentRequest(comment.commentCuid));
    }
  };

  handleOpenEditComment = (editData) => {
    this.props.dispatch(toggleAddComment(true, editData));
  };

  handleEditComment = (updatedEditData) => {
    this.props.dispatch(editCommentRequest({
      _id: this.props.editData._id,
      commentCuid: this.props.editData.commentCuid,
      name: this.props.editData.name,
      slug: this.props.editData.slug,
      content: this.props.editData.content,
      title: this.props.editData.title,
      ...updatedEditData,
    }));
  };

  handleAddComment = (comment) => {
    this.props.dispatch(toggleAddComment());
    this.props.dispatch(addCommentRequest(this.props.post.cuid, comment));
  };

  render() {
    return (
      <div>
        <Helmet title={this.props.post.title} />
        <CommentCreateWidget
          isEdit={this.props.isEdit}
          editData={this.props.editData}
          editComment={this.handleEditComment}
          addComment={this.handleAddComment}
          showAddComment={this.props.showAddComment}
        />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{this.props.post.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
          <p className={styles['post-desc']}>{this.props.post.content}</p>
        </div>
        <h3 className={styles['comments-title']}>Comments</h3>
        <List
          listType={elementTypes.COMMENT}
          handleDelete={this.handleDeleteComment}
          handleEdit={this.handleOpenEditComment}
          data={this.props.comments}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    comments: getComments(state),
    isEdit: getIsEdit(state),
    editData: getEditData(state),
    post: getPost(state, props.params.cuid),
    showAddComment: getShowAddComment(state),
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.array.isRequired,
  isEdit: PropTypes.bool,
  editData: PropTypes.object,
  showAddComment: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
