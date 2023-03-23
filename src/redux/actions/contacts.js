import {CONTACTS_ACTIONS} from '../constants/contacts';

export const fetchContacts = () => {
  return {
    type: CONTACTS_ACTIONS.FETCH_CONTACTS,
  };
};

export const fetchedContacts = data => {
  return {
    type: CONTACTS_ACTIONS.FETCHED_CONTACTS,
    payload: {
      data,
    },
  };
};

export const failedFetchContacts = error => {
  return {
    type: CONTACTS_ACTIONS.FAILED_FETCH_CONTACTS,
    error,
  };
};
