import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './CreateWidget.css';
import { elementTypes } from "../../../../elementTypes";

export const fieldTypes = {
  INPUT: 'INPUT',
  TEXTAREA: 'TEXTAREA',
};

export class CreateWidget extends Component {
  handleSubmit = () => {
    if (Object.values(this.refs).every(value => value)) {
      const submitData = {};
      Object.entries(this.refs).forEach(([refKey, refValue]) => {
        submitData[refKey] = refValue.value;
      });
      this.props.onSubmit(submitData);
      Object.keys(this.refs).forEach(refKey => {
        this.refs[refKey].value = '';
      });
    }
  };

  renderFields = () => (
    this.props.fields.map(({ type, name, ref }) => {
      const fieldProps = {
        placeholder: this.props.intl.messages[name],
        className: styles['form-field'],
        ref,
        key: `${ref}-${name}`,
      };

      switch (type) {
        case fieldTypes.INPUT:
          return <input {...fieldProps} />;
        case fieldTypes.TEXTAREA:
          return <textarea {...fieldProps} />;
        default:
          return null;
      }
    })
  );

  render() {
    const { showForm, widgetType } = this.props;
    const cls = `${styles.form} ${(showForm ? styles.appear : '')}`;

    let fieldsTitle;
    switch (widgetType) {
      case elementTypes.COMMENT:
        fieldsTitle = 'createNewComment';
        break;
      case elementTypes.POST:
        fieldsTitle = 'createNewPost';
        break;
      default:
    }

    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id={fieldsTitle} /></h2>
          {this.renderFields()}
          <a className={styles['post-submit-button']} href="#" onClick={this.handleSubmit}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

CreateWidget.propTypes = {
  widgetType: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  showForm: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CreateWidget);
