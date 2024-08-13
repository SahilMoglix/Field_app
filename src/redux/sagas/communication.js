// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
import {getContacts} from '../../services/communication';
import {logs} from '../../responses/calendar';
import {COMMUNICATION_ACTIONS} from '../constants/communication';
import {failedFetchLogs, fetchedLogs} from '../actions/communication';

function* fetchCallLogs({payload: {params}}) {
  try {
    const {data, error} = yield call(getContacts, params);
    if (error) {
      yield put(failedFetchLogs(params, error));
    } else {
      yield put(fetchedLogs(params, data?.result, data?.total));
    }
  } catch (error) {
    yield put(failedFetchLogs(params, error));
  }
}

export default fork(function* () {
  yield takeEvery(COMMUNICATION_ACTIONS.FETCH_LOGS, fetchCallLogs);
});
