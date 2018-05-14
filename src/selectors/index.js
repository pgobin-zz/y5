import { createSelector } from 'reselect';

const getUsers = state => state.entities.users;

/**
 * Selector to filter users to get the 5 youngest users
 * that have valid telephone numbers.
 * 
 * @return Array
 */
export const getYoungestUsersWithValidPhoneNumber = createSelector(
  getUsers,
  users => users && users
    // Validate format of telephone numer
    .filter(x => {
      if (!x.age || !x.number || !x.name) return false;
      return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(x.number);
    })
    // Sort by age
    .sort((a, b) => a.age - b.age)
    // Take 5
    .slice(0, 5)
    // Sort by name
    .sort((a, b) => a.name > b.name)
);
