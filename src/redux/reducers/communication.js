import {STATE_STATUS} from '../constants/index';
import {COMMUNICATION_ACTIONS} from '../constants/communication';
import {AUTH_ACTIONS} from '../constants/auth';
import {List, Map} from 'immutable';

const initialState = new Map({
  status: STATE_STATUS.UNFETCHED,
  pageNo: 0,
  data: new List([]),
  total: 0,
  error: null,
});

export const communicationReducer = (state = initialState, action) => {
  const {type, payload, error} = action;

  switch (type) {
    case COMMUNICATION_ACTIONS.FETCH_LOGS:
      if (payload.pageNo == 0) {
        return state
          .set('status', STATE_STATUS.FETCHING)
          .set('data', new List([]))
          .set('pageNo', payload.pageNo)
          .set('error', null);
      } else {
        return state
          .set('status', STATE_STATUS.FETCHING)
          .set('pageNo', payload.pageNo)
          .set('error', null);
      }
    case COMMUNICATION_ACTIONS.FETCHED_LOGS:
      if (payload.pageNo == 0) {
        return state
          .set('status', STATE_STATUS.FETCHED)
          .set('data', new List(payload.data))
          .set('total', payload.total)
          .set('error', null);
      } else {
        return state
          .set('status', STATE_STATUS.FETCHED)
          .set('total', payload.total)
          .mergeIn(['data'], new List(payload.data))
          .set('error', null);
      }
    case COMMUNICATION_ACTIONS.FAILED_FETCH_LOGS:
      return (
        state
          .set('status', STATE_STATUS.FAILED_FETCH)
          // .set('data', new List([]))
          .set('error', error)
      );
    case COMMUNICATION_ACTIONS.UPDATE_LOGS:
      return state
        .set('status', STATE_STATUS.UPDATED)
        .set(
          'data',
          new List(
            payload.data.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1)),
          ),
        )
        .set('error', null);
    case AUTH_ACTIONS.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
