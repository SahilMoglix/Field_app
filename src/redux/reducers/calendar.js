import {STATE_STATUS} from '../constants/index';
import {CALENDAR_ACTIONS} from '../constants/calendar';
import {AUTH_ACTIONS} from '../constants/auth';
import {List, Map} from 'immutable';

const initialState = new Map({
  month: new Map({
    status: STATE_STATUS.UNFETCHED,
    data: new List([]),
    error: null,
  }),
  day: new Map({
    status: STATE_STATUS.UNFETCHED,
    data: new List([]),
    error: null,
  }),
  custom: new Map({
    status: STATE_STATUS.UNFETCHED,
    data: new List([]),
    params: new Map({}),
    error: null,
  }),
});

export const calendarReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case CALENDAR_ACTIONS.FETCH_CALENDAR:
      return state
        .setIn(['day', 'status'], STATE_STATUS.FETCHING)
        .setIn(['day', 'data'], new List([]))
        .setIn(['day', 'error'], null);
    case CALENDAR_ACTIONS.FETCHED_CALENDAR:
      return state
        .setIn(['day', 'status'], STATE_STATUS.FETCHED)
        .setIn(['day', 'data'], new List(payload.data || []))
        .setIn(['day', 'error'], null);
    case CALENDAR_ACTIONS.FAILED_FETCH_CALENDAR:
      return state
        .setIn(['day', 'status'], STATE_STATUS.FAILED_FETCH)
        .setIn(['day', 'data'], new List([]))
        .setIn(['day', 'error'], error);

    case CALENDAR_ACTIONS.FETCH_CALENDAR_CUSTOM:
      return state
        .setIn(['custom', 'status'], STATE_STATUS.FETCHING)
        .setIn(['custom', 'data'], new List([]))
        .setIn(['custom', 'error'], null)
        .setIn(['custom', 'params'], payload.params);
    case CALENDAR_ACTIONS.FETCHED_CALENDAR_CUSTOM:
      return state
        .setIn(['custom', 'status'], STATE_STATUS.FETCHED)
        .setIn(['custom', 'data'], new List(payload.data || []))
        .setIn(['custom', 'error'], null);
    case CALENDAR_ACTIONS.FAILED_FETCH_CALENDAR_CUSTOM:
      return state
        .setIn(['custom', 'status'], STATE_STATUS.FAILED_FETCH)
        .setIn(['custom', 'data'], new List([]))
        .setIn(['custom', 'error'], error);

    case CALENDAR_ACTIONS.FETCH_CALENDAR_MONTH:
      return state
        .setIn(['month', 'status'], STATE_STATUS.FETCHING)
        .setIn(['month', 'data'], List([]))
        .setIn(['month', 'error'], null);
    case CALENDAR_ACTIONS.FETCHED_CALENDAR_MONTH:
      return state
        .setIn(['month', 'status'], STATE_STATUS.FETCHED)
        .setIn(['month', 'data'], new List(payload.data || []))
        .setIn(['month', 'error'], null);
    case CALENDAR_ACTIONS.FAILED_FETCH_CALENDAR_MONTH:
      return state
        .setIn(['month', 'status'], STATE_STATUS.FAILED_FETCH)
        .setIn(['month', 'data'], List([]))
        .setIn(['month', 'error'], error);

    case AUTH_ACTIONS.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
