import {all} from 'redux-saga/effects';
import homepageSaga from './homepage';
import calendarSaga from './calendar';
import contactsSaga from './contacts';

export default function* () {
  yield all([homepageSaga, calendarSaga, contactsSaga]);
}
