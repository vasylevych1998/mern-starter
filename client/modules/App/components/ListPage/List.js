import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import ListItem from './ListItem/ListItem';
import { elementTypes } from '../../../../elementTypes';

function List(props) {
  let key;
  switch (props.listType) {
    case elementTypes.POST:
      key = 'cuid'
      break;
    case elementTypes.COMMENT:
      key = 'commentCuid'
      break;
    default:
  }

  return (
    <div className="listView">
      {
        props.data.map(listItem => (
          <ListItem
            listType={props.listType}
            post={listItem}
            key={listItem[key]}
            onDelete={() => props.handleDelete(listItem)}
          />
        ))
      }
    </div>
  );
}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string,
    commentCuid: PropTypes.string,
    postCuid: PropTypes.string,
  })).isRequired,
  handleDelete: PropTypes.func.isRequired,
  listType: PropTypes.string.isRequired,
};

export default List;
