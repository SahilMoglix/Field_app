import {COMMUNICATION_ACTIONS} from '../constants/communication';

export const fetchLogs = params => {
  return {
    type: COMMUNICATION_ACTIONS.FETCH_LOGS,
    payload: {
      params,
    },
  };
};

export const fetchedLogs = (params, data, total) => {
  return {
    type: COMMUNICATION_ACTIONS.FETCHED_LOGS,
    payload: {
      data,
      params,
      total,
    },
  };
};

export const failedFetchLogs = (params, error) => {
  return {
    type: COMMUNICATION_ACTIONS.FAILED_FETCH_LOGS,
    error,
    payload: {
      params,
    },
  };
};

export const updateLogs = (pageNo, data, total) => {
  return {
    type: COMMUNICATION_ACTIONS.UPDATE_LOGS,
    payload: {
      data,
      pageNo,
      total,
    },
  };
};
