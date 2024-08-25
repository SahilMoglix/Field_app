import {SALES_ACTIONS} from '../constants/salesTab';

export const fetchSalesLogs = params => {
  return {
    type: SALES_ACTIONS.FETCH_SALES_LOGS,
    payload: {
      params,
    },
  };
};

export const fetchedSalesLogs = (params, data, total) => {
  return {
    type: SALES_ACTIONS.FETCHED_SALES_LOGS,
    payload: {
      params,
      data,
      total,
    },
  };
};

export const failedFetchSalesLogs = (params, error) => {
  return {
    type: SALES_ACTIONS.FAILED_FETCH_SALES_LOGS,
    error,
    payload: {
      params,
    },
  };
};

export const updateSalesLogs = (pageNo, data, total) => {
  return {
    type: SALES_ACTIONS.UPDATE_SALES_LOGS,
    payload: {
      data,
      pageNo,
      total,
    },
  };
};
