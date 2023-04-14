import {COMMUNICATION_ACTIONS} from '../constants/communication';

export const fetchLogs = pageNo => {
  return {
    type: COMMUNICATION_ACTIONS.FETCH_LOGS,
    payload: {
      pageNo,
    },
  };
};

export const fetchedLogs = (pageNo, data, total) => {
  return {
    type: COMMUNICATION_ACTIONS.FETCHED_LOGS,
    payload: {
      data,
      pageNo,
      total,
    },
  };
};

export const failedFetchLogs = (pageNo, error) => {
  return {
    type: COMMUNICATION_ACTIONS.FAILED_FETCH_LOGS,
    error,
    payload: {
      pageNo,
    },
  };
};

export const updateLogs = (pageNo, data) => {
  return {
    type: COMMUNICATION_ACTIONS.UPDATE_LOGS,
    payload: {
      data,
      pageNo,
    },
  };
};
