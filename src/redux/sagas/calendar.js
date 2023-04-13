// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
import {CALENDAR_ACTIONS} from '../constants/calendar';
import {
  fetchedCalendar,
  failedFetchCalendar,
  failedFetchCustomCalendar,
  fetchedCustomCalendar,
  failedFetchMonthCalendar,
  fetchedMonthCalendar,
} from '../actions/calendar';
import {
  getMeetings,
  getCustomMeetings,
  getMonthMeetings,
} from '../../services/calendar';
import {meetings, monthData} from '../../responses/calendar';

function* fetchMeetings({payload: {startDate, endDate, pullFromAzure}}) {
  try {
    const {data, error} = yield call(
      getMeetings,
      startDate,
      endDate,
      pullFromAzure,
    );
    // const data = meetings;
    // const error = null;
    if (error) {
      yield put(failedFetchCalendar(error));
    } else {
      yield put(fetchedCalendar(data.result));
    }
  } catch (error) {
    yield put(failedFetchCalendar(error));
  }
}

function* fetchCustomMeetings({payload: {params}}) {
  try {
    const {data, error} = yield call(getCustomMeetings, params);
    // const data = meetings;
    // const error = null;
    if (error) {
      yield put(failedFetchCustomCalendar(error));
    } else {
      yield put(fetchedCustomCalendar(data.result));
    }
  } catch (error) {
    yield put(failedFetchCustomCalendar(error));
  }
}

function* fetchMonthMeetings({payload: {params}}) {
  try {
    const {data, error} = yield call(getMonthMeetings, params);
    // const data = monthData;
    // const error = null;
    if (error) {
      yield put(failedFetchMonthCalendar(error));
    } else {
      yield put(fetchedMonthCalendar(data.result));
    }
  } catch (error) {
    yield put(failedFetchMonthCalendar(error));
  }
}

export default fork(function* () {
  yield takeEvery(CALENDAR_ACTIONS.FETCH_CALENDAR, fetchMeetings);
  yield takeEvery(CALENDAR_ACTIONS.FETCH_CALENDAR_CUSTOM, fetchCustomMeetings);
  yield takeEvery(CALENDAR_ACTIONS.FETCH_CALENDAR_MONTH, fetchMonthMeetings);
});
