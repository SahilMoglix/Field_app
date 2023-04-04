import {STATE_STATUS} from '../constants/index';
import {AUTH_ACTIONS} from '../constants/auth';

const initialState = {
  status: STATE_STATUS.UNFETCHED,
  data: {},
};

export const authReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case AUTH_ACTIONS.FETCH_AUTH:
      return {
        ...state,
        status: STATE_STATUS.FETCHING,
      };
    case AUTH_ACTIONS.FETCHED_AUTH:
      return {
        ...state,
        status: STATE_STATUS.FETCHED,
        data: {
          ...payload.data,
        },
      };
    case AUTH_ACTIONS.FAILED_FETCH_AUTH:
      return {
        ...state,
        status: STATE_STATUS.FAILED_FETCH,
        error: error,
      };

    case AUTH_ACTIONS.SET_AUTH:
      return {
        ...state,
        status: STATE_STATUS.FETCHED,
        data: {
          ...payload.data,
        },
      };
    case AUTH_ACTIONS.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
