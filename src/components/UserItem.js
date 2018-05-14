import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';

/**
 * Component to render a single user item. Displays a user's name,
 * age, and phone number.
 *
 * @extends React.Component
 */
export default class UserItem extends Component {
  render() {
    const { user } = this.props;
    return (
      <ListGroupItem header={user.name || 'Unknown'}>
        {user.id && <span><strong>ID: </strong>{user.id} </span>}
        {user.age && <span><strong>Age: </strong>{user.age} </span>}
        {user.number && <span><strong>Phone number: </strong>{user.number} </span>}
      </ListGroupItem>
    );
  }
}

UserItem.propTypes = {
  user: PropTypes.object
};
