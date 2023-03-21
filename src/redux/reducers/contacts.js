import {STATE_STATUS} from '../constants/index';
import {CONTACTS_ACTIONS} from '../constants/contacts';
import {AUTH_ACTIONS} from '../constants/auth';

const initialState = {
  status: STATE_STATUS.UNFETCHED,
  data: [],
};

export const contactsReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case CONTACTS_ACTIONS.FETCH_CONTACTS:
      return {
        ...state,
        status: STATE_STATUS.FETCHING,
      };
    case CONTACTS_ACTIONS.FETCHED_CONTACTS:
      return {
        ...state,
        status: STATE_STATUS.FETCHED,
        data: payload.data,
      };
    case CONTACTS_ACTIONS.FAILED_FETCH_CONTACTS:
      return {
        ...state,
        status: STATE_STATUS.FAILED_FETCH,
        error: error,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
