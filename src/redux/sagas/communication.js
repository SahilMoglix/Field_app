// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
import {getContacts} from '../../services/communication';
import {logs} from '../../responses/calendar';
import {COMMUNICATION_ACTIONS} from '../constants/communication';
import {failedFetchLogs, fetchedLogs} from '../actions/communication';

function* fetchCallLogs() {
  try {
    // console.log('aarha hai!!');
    const {data, error} = yield call(getContacts);
    // console.log(data, 'data in saga!!', error);
    // const data = logs;
    // const error = null;
    console.log(data, 'cewceewcewcwe', error);
    if (error) {
      yield put(failedFetchLogs(error));
    } else {
      yield put(fetchedLogs(data?.result));
    }
  } catch (error) {
    console.log(error);
    yield put(failedFetchLogs(error));
  }
}

export default fork(function* () {
  yield takeEvery(COMMUNICATION_ACTIONS.FETCH_LOGS, fetchCallLogs);
});
