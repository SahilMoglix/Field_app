// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
import {getSalesContactsApi} from '../../services/salesTab';
import {SALES_ACTIONS} from '../constants/salesTab';
import {failedFetchSalesLogs, fetchedSalesLogs} from '../actions/salesTab';

function* fetchSalesCallLogs({payload: {params}}) {
  try {
    const {data, error} = yield call(getSalesContactsApi, params);
    if (error) {
      yield put(failedFetchSalesLogs(params, error));
    } else {
      yield put(fetchedSalesLogs(params, data?.result, data?.total));
    }
  } catch (error) {
    console.log('erorr', error);
    yield put(failedFetchSalesLogs(params, error));
  }
}

export default fork(function* () {
  yield takeEvery(SALES_ACTIONS.FETCH_SALES_LOGS, fetchSalesCallLogs);
});
