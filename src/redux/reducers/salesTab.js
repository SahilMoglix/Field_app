import {STATE_STATUS} from '../constants/index';
import {SALES_ACTIONS} from '../constants/salesTab';
import {AUTH_ACTIONS} from '../constants/auth';
import {List, Map} from 'immutable';

const initialState = new Map({
  status: STATE_STATUS.UNFETCHED,
  params: {
    userList: [],
    regionList: [],
    branchList: [],
    startDate: '',
    endDate: '',
  },
  data: new List([]),
  total: 0,
  error: null,
});

export const salesTabReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case SALES_ACTIONS.FETCH_SALES_LOGS:
      if (payload.params.pageNo == 0) {
        return state
          .set('status', STATE_STATUS.FETCHING)
          .set('data', new List([]))
          .set('params', payload.params)
          .set('error', null);
      } else {
        return state
          .set('status', STATE_STATUS.FETCHING)
          .set('params', payload.params)
          .set('error', null);
      }
    case SALES_ACTIONS.FETCHED_SALES_LOGS:
      if (payload.params.pageNo == 0) {
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
    case SALES_ACTIONS.FAILED_FETCH_SALES_LOGS:
      return state.set('status', STATE_STATUS.FAILED_FETCH).set('error', error);

    case SALES_ACTIONS.UPDATE_SALES_LOGS:
      return state
        .set('status', STATE_STATUS.UPDATED)
        .set('pageNo', payload.pageNo)
        .set('data', new List(payload.data))
        .set('total', payload.total)
        .set('error', null);
    case AUTH_ACTIONS.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
