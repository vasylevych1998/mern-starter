import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateWidget, { fieldTypes } from '../../App/components/CreateWidget/CreateWidget';
import { elementTypes } from '../../../elementTypes';

export class CommentCreateWidget extends Component {
  getFields = () => ([
    {
      type: fieldTypes.INPUT,
      name: 'authorName',
      key: 'name',
    },
    {
      type: fieldTypes.INPUT,
      name: 'commentTitle',
      key: 'title',
    },
    {
      type: fieldTypes.TEXTAREA,
      name: 'commentContent',
      key: 'content',
    },
  ]);

  render() {
    return (
      <CreateWidget
        isEdit={this.props.isEdit}
        editData={this.props.editData}
        widgetType={elementTypes.COMMENT}
        showForm={this.props.showAddComment}
        onSubmit={this.props.isEdit ? this.props.editComment : this.props.addComment}
        fields={this.getFields()}
      />
    );
  }
}

CommentCreateWidget.propTypes = {
  isEdit: PropTypes.bool,
  editData: PropTypes.object,
  addComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  showAddComment: PropTypes.bool.isRequired,
};

export default CommentCreateWidget;
