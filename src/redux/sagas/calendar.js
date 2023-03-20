// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
import {CALENDAR_ACTIONS} from '../constants/calendar';
import {
  fetchedCalendar,
  failedFetchCalendar,
  failedFetchCustomCalendar,
  fetchedCustomCalendar,
} from '../actions/calendar';
import {getMeetings, getCustomMeetings} from '../../services/calendar';
import {meetings} from '../../responses/calendar';

function* fetchMeetings({payload: {startDate, endDate}}) {
  try {
    // const {data, error} = yield call(getMeetings, startDate, endDate);
    const data = meetings;
    const error = null;
    console.log(data);
    if (error) {
      yield put(failedFetchCalendar(error));
    } else {
      yield put(fetchedCalendar(data.data));
    }
  } catch (error) {
    yield put(failedFetchCalendar(error));
  }
}

function* fetchCustomMeetings({payload: {params}}) {
  try {
    // const {data, error} = yield call(getCustomMeetings, params);
    const data = meetings;
    const error = null;
    console.log(data);
    if (error) {
      yield put(failedFetchCustomCalendar(error));
    } else {
      yield put(
        fetchedCustomCalendar([...data.data, ...data.data, ...data.data]),
      );
    }
  } catch (error) {
    yield put(failedFetchCustomCalendar(error));
  }
}

export default fork(function* () {
  yield takeEvery(CALENDAR_ACTIONS.FETCH_CALENDAR, fetchMeetings);
  yield takeEvery(CALENDAR_ACTIONS.FETCH_CALENDAR_CUSTOM, fetchCustomMeetings);
});
