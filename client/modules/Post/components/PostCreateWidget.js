import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateWidget, { fieldTypes } from '../../App/components/CreateWidget/CreateWidget';
import { elementTypes } from '../../../elementTypes';

export class PostCreateWidget extends Component {
  getFields = () => ([
    {
      type: fieldTypes.INPUT,
      name: 'authorName',
      ref: 'name',
    },
    {
      type: fieldTypes.INPUT,
      name: 'postTitle',
      ref: 'title',
    },
    {
      type: fieldTypes.TEXTAREA,
      name: 'postContent',
      ref: 'content',
    },
  ]);

  render() {
    return (
      <CreateWidget
        widgetType={elementTypes.POST}
        showForm={this.props.showAddPost}
        onSubmit={this.props.addPost}
        fields={this.getFields()}
      />
    );
  }
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
};

export default PostCreateWidget;
