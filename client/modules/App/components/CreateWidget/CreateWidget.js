import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './CreateWidget.css';
import { elementTypes } from '../../../../elementTypes';

export const fieldTypes = {
  INPUT: 'INPUT',
  TEXTAREA: 'TEXTAREA',
};

export class CreateWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getEditValue = (key) => (this.props.isEdit ? this.props.editData[key] : '')

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const submitData = this.state;
    this.props.onSubmit(submitData);
    const updatedState = {};
    Object.keys(this.state).forEach(refKey => {
      updatedState[refKey] = '';
    });
    this.setState({ ...updatedState });
  };

  renderFields = () => (
    this.props.fields.map(({ type, name, key }) => {
      const fieldProps = {
        value: this.state[key] || (this.state[key] === '' ? this.state[key] : this.getEditValue(key)),
        placeholder: this.props.intl.messages[name],
        className: styles['form-field'],
        name: key,
        key: `${key}-${name}`,
        onChange: this.handleChange,
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
  isEdit: PropTypes.bool,
  editData: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(CreateWidget);
