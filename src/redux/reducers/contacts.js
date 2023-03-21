import {STATE_STATUS} from '../constants/index';
import {CONTACTS_ACTIONS} from '../constants/contacts';
import {AUTH_ACTIONS} from '../constants/auth';
import {List, Map} from 'immutable';

const initialState = new Map({
  status: STATE_STATUS.UNFETCHED,
  data: new List([]),
  error: null,
});

export const contactsReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case CONTACTS_ACTIONS.FETCH_CONTACTS:
      return state
        .set('status', STATE_STATUS.FETCHING)
        .set('data', new List([]))
        .set('error', null);
    case CONTACTS_ACTIONS.FETCHED_CONTACTS:
      return state
        .set('status', STATE_STATUS.FETCHED)
        .set('data', new List(payload.data))
        .set('error', null);
    case CONTACTS_ACTIONS.FAILED_FETCH_CONTACTS:
      return state
        .set('status', STATE_STATUS.FAILED_FETCH)
        .set('data', new List([]))
        .set('error', error);
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
