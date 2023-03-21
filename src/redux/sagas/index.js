import {all} from 'redux-saga/effects';
import homepageSaga from './homepage';
import calendarSaga from './calendar';

export default function* () {
  yield all([homepageSaga, calendarSaga]);
}
