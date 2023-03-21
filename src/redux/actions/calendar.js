import {CALENDAR_ACTIONS} from '../constants/calendar';

export const fetchCalendar = (startDate, endDate) => {
  return {
    type: CALENDAR_ACTIONS.FETCH_CALENDAR,
    payload: {
      startDate,
      endDate,
    },
  };
};

export const fetchedCalendar = data => {
  return {
    type: CALENDAR_ACTIONS.FETCHED_CALENDAR,
    payload: {
      data,
    },
  };
};

export const failedFetchCalendar = error => {
  return {
    type: CALENDAR_ACTIONS.FAILED_FETCH_CALENDAR,
    error,
  };
};

export const fetchCustomCalendar = params => {
  return {
    type: CALENDAR_ACTIONS.FETCH_CALENDAR_CUSTOM,
    payload: {
      params,
    },
  };
};

export const fetchedCustomCalendar = data => {
  return {
    type: CALENDAR_ACTIONS.FETCHED_CALENDAR_CUSTOM,
    payload: {
      data,
    },
  };
};

export const failedFetchCustomCalendar = error => {
  return {
    type: CALENDAR_ACTIONS.FAILED_FETCH_CALENDAR_CUSTOM,
    error,
  };
};

export const fetchMonthCalendar = params => {
  return {
    type: CALENDAR_ACTIONS.FETCH_CALENDAR_MONTH,
    payload: {
      params,
    },
  };
};

export const fetchedMonthCalendar = data => {
  return {
    type: CALENDAR_ACTIONS.FETCHED_CALENDAR_MONTH,
    payload: {
      data,
    },
  };
};

export const failedFetchMonthCalendar = error => {
  return {
    type: CALENDAR_ACTIONS.FAILED_FETCH_CALENDAR_MONTH,
    error,
  };
};
