// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
import {getContacts} from '../../services/communication';
import {logs} from '../../responses/calendar';
import {COMMUNICATION_ACTIONS} from '../constants/communication';
import {failedFetchLogs, fetchedLogs} from '../actions/communication';

function* fetchCallLogs() {
  try {
    const {data, error} = yield call(getContacts);
    // const data = logs;
    // const error = null;
    if (error) {
      yield put(failedFetchLogs(error));
    } else {
      yield put(fetchedLogs(data?.result));
    }
  } catch (error) {
    yield put(failedFetchLogs(error));
  }
}

export default fork(function* () {
  yield takeEvery(COMMUNICATION_ACTIONS.FETCH_LOGS, fetchCallLogs);
});
