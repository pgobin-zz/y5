import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { ListGroup, Panel } from 'react-bootstrap';

/**
 * Component to render multiple user items in a list.
 *
 * @extends React.Component
 */
export default class UserList extends Component {
  render() {
    const {
      users,
      isNextPage,
      title,
      renderUserItem,
      onLoadMoreClick,
      showLoadMore
    } = this.props;

    const isEmpty = users.length === 0;
    if (isEmpty) return null;

    return (
      <div>
        <Panel>
          <Panel.Heading>{title}</Panel.Heading>
          {showLoadMore &&
            <Panel.Body>
              <div>
                <p>
                  If you are loading a lot of users, you will need to 
                  click <strong>Load More</strong> to load additional batches manually.
                </p>
                <p>{users.length} of {!isNextPage ? users.length : '?'} users loaded</p>
                <Button onClick={onLoadMoreClick} disabled={!isNextPage}
                        bsStyle='primary'>Load More</Button>
              </div>
            </Panel.Body>
          }
          <ListGroup>{users.map(renderUserItem)}</ListGroup>
        </Panel>
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array,
  renderUserItem: PropTypes.func,
  onLoadMoreClick: PropTypes.func,
  showLoadMore: PropTypes.bool,
  isNextPage: PropTypes.bool,
  title: PropTypes.string
};
