import {CONTACTS_ACTIONS} from '../constants/contacts';

export const fetchHomepage = () => {
  return {
    type: CONTACTS_ACTIONS.FETCH_CONTACTS,
  };
};

export const fetchedHomepage = data => {
  return {
    type: CONTACTS_ACTIONS.FETCHED_CONTACTS,
    payload: {
      data,
    },
  };
};

export const failedFetchHomepage = error => {
  return {
    type: CONTACTS_ACTIONS.FAILED_FETCH_CONTACTS,
    error,
  };
};
