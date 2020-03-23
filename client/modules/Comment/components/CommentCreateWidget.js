import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateWidget, { fieldTypes } from '../../App/components/CreateWidget/CreateWidget';
import { elementTypes } from "../../../elementTypes";

export class CommentCreateWidget extends Component {
  getFields = () => ([
    {
      type: fieldTypes.INPUT,
      name: 'authorName',
      ref: 'name',
    },
    {
      type: fieldTypes.INPUT,
      name: 'commentTitle',
      ref: 'title',
    },
    {
      type: fieldTypes.TEXTAREA,
      name: 'commentContent',
      ref: 'content',
    },
  ]);

  render() {
    return (
      <CreateWidget
        widgetType={elementTypes.COMMENT}
        showForm={this.props.showAddComment}
        onSubmit={this.props.addComment}
        fields={this.getFields()}
      />
    );
  }
}

CommentCreateWidget.propTypes = {
  addComment: PropTypes.func.isRequired,
  showAddComment: PropTypes.bool.isRequired,
};

export default CommentCreateWidget;
