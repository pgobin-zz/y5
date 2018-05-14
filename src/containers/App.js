import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserList from '../components/UserList';
import UserItem from '../components/UserItem';
import { loadUsers } from '../actions';
import { getYoungestUsersWithValidPhoneNumber } from '../selectors';
import { Alert, Col, Grid, Jumbotron, PageHeader, ProgressBar, Row } from 'react-bootstrap';

/**
 * Container component that houses main app.
 *
 * @extends React.Component
 */
export class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  /**
   * Lifecycle hook that is invoked immediately after component
   * is mounted. Use to load in data from graph.
   *
   * @return undefined
   */
  componentDidMount() {
    this.props.loadUsers();
  }

  /**
   * Render user item.
   *
   * @param user
   * @return JSX template
   */
  renderUserItem(user) {
    if (!user.id) return null;
    return (
      <UserItem key={user.id} user={user} />
    );
  }

  /**
   * Call to load additional data into component.
   * Property 'nextToken' must exist or method will abort.
   *
   * @return undefined
   */
  handleLoadMore() {
    const { nextToken, loadUsers } = this.props;
    if (!nextToken) return;
    loadUsers(nextToken);
  }

  /**
   * Render global error message.
   *
   * @return JSX template
   */
  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) return null;

    return (
      <div>
        <PageHeader>Error</PageHeader>
        <Alert bsStyle="danger">
          <strong>Encountered error: </strong>
          {errorMessage}
        </Alert>
      </div>
    );
  }

  /**
   * Render hero.
   *
   * @return JSX template
   */
  renderHero() {
    return (
      <Jumbotron>
        <Grid>
          <h1>Y5</h1>
          <p>Display the youngest 5 users with valid phone numbers sorted alphabetically by name</p>
        </Grid>
      </Jumbotron>
    );
  }

  render() {
    const { errorMessage, users = [], top5 = [], nextToken } = this.props;
    const isEmpty = users.length === 0;

    if (isEmpty && !errorMessage) {
      return <Grid><ProgressBar active now={100} /></Grid>;
    }

    if (users.length < 20) {
      this.handleLoadMore();
    }

    return (
      <div className="App">
        {this.renderHero()}
        <Grid>
          {this.renderErrorMessage()}
          <Row>
            <Col md={6} mdPush={6}>
              <UserList
                onLoadMoreClick={this.handleLoadMore}
                renderUserItem={this.renderUserItem}
                title='5 Youngest Users w/ Valid Phone Number'
                users={top5} />
            </Col>
            <Col md={6} mdPull={6}>
              <UserList
                onLoadMoreClick={this.handleLoadMore}
                renderUserItem={this.renderUserItem}
                showLoadMore={true}
                title='All Users'
                isNextPage={!!nextToken}
                users={users} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  loadUsers: PropTypes.func,
  nextToken: PropTypes.string,
  errorMessage: PropTypes.string,
  users: PropTypes.array,
  top5: PropTypes.array
};

/**
 * Specify which slice of the state to provide to the component
 *
 * @param state Redux state tree
 * @return Object containing state available to component.
 */
const mapStateToProps = state => {
  const {
    entities: { users, nextToken }
  } = state;

  return {
    errorMessage: state.errorMessage,
    top5: getYoungestUsersWithValidPhoneNumber(state),
    users: users,
    nextToken: nextToken
  };
};

// Sync to the store, listening for change in state.
export default connect(mapStateToProps, { loadUsers })(App);
