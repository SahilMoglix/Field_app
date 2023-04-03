// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
import {fetchedContacts, failedFetchContacts} from '../actions/contacts';
import {getContacts} from '../../services/contacts';
import {contacts} from '../../responses/calendar';
import {CONTACTS_ACTIONS} from '../constants/contacts';

function* fetchAllContacts() {
  try {
    const {data, error} = yield call(getContacts);
    // const data = contacts;
    // const error = null;
    if (error) {
      yield put(failedFetchContacts(error));
    } else {
      yield put(fetchedContacts(data.result));
    }
  } catch (error) {
    yield put(failedFetchContacts(error));
  }
}

export default fork(function* () {
  yield takeEvery(CONTACTS_ACTIONS.FETCH_CONTACTS, fetchAllContacts);
});
