import {all} from 'redux-saga/effects';
import homepageSaga from './homepage';
import calendarSaga from './calendar';
import contactsSaga from './contacts';
import communicationSaga from './communication';

export default function* () {
  yield all([homepageSaga, calendarSaga, contactsSaga, communicationSaga]);
}
