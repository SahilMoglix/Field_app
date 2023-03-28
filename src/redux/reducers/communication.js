import {STATE_STATUS} from '../constants/index';
import {COMMUNICATION_ACTIONS} from '../constants/communication';
import {AUTH_ACTIONS} from '../constants/auth';
import {List, Map} from 'immutable';

const initialState = new Map({
  status: STATE_STATUS.UNFETCHED,
  data: new List([]),
  error: null,
});

export const communicationReducer = (state = initialState, action) => {
  const {type, payload, error} = action;

  switch (type) {
    case COMMUNICATION_ACTIONS.FETCH_LOGS:
      return state
        .set('status', STATE_STATUS.FETCHING)
        .set('data', new List([]))
        .set('error', null);
    case COMMUNICATION_ACTIONS.FETCHED_LOGS:
      return state
        .set('status', STATE_STATUS.FETCHED)
        .set('data', new List(payload.data))
        .set('error', null);
    case COMMUNICATION_ACTIONS.FAILED_FETCH_LOGS:
      return state
        .set('status', STATE_STATUS.FAILED_FETCH)
        .set('data', new List([]))
        .set('error', error);
    case COMMUNICATION_ACTIONS.UPDATE_LOGS:
      return state
        .set('status', STATE_STATUS.UPDATED)
        .set('data', new List(payload.data))
        .set('error', null);
    case AUTH_ACTIONS.LOGOUT:
      d;
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
