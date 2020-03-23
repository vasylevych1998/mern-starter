import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './ListItem.css';
import { elementTypes } from '../../../../../elementTypes';

function ListItem(props) {
  let deleteMessageId;
  let editMessageId;
  switch (props.listType) {
    case elementTypes.COMMENT:
      deleteMessageId = 'deleteComment';
      editMessageId = 'editComment';
      break;
    case elementTypes.POST:
      deleteMessageId = 'deletePost';
      break;
    default:
  }

  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/posts/${props.post.slug}-${props.post.cuid}`} >
          {props.post.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
      <p className={styles['post-desc']}>{props.post.content}</p>
      <p className={styles['post-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id={deleteMessageId} /></a></p>
      {editMessageId && <p className={styles['post-action']}><a href="#" onClick={props.onEdit}><FormattedMessage id={editMessageId} /></a></p>}
      <hr className={styles.divider} />
    </div>
  );
}

ListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string,
    commentCuid: PropTypes.string,
    postCuid: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  listType: PropTypes.string.isRequired,
};

export default ListItem;
