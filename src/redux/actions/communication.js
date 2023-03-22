import {COMMUNICATION_ACTIONS} from '../constants/communication';

export const fetchLogs = () => {
  return {
    type: COMMUNICATION_ACTIONS.FETCH_LOGS,
  };
};

export const fetchedLogs = data => {
  return {
    type: COMMUNICATION_ACTIONS.FETCHED_LOGS,
    payload: {
      data,
    },
  };
};

export const failedFetchLogs = error => {
  return {
    type: COMMUNICATION_ACTIONS.FAILED_FETCH_LOGS,
    error,
  };
};
