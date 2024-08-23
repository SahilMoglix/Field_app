import {homepageReducer} from './homepage';
import {contactsReducer} from './contacts';
import {calendarReducer} from './calendar';
import {communicationReducer} from './communication';
import {salesTabReducer} from './salesTab';
import {authReducer} from './auth';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  homepageReducer,
  contactsReducer,
  calendarReducer,
  communicationReducer,
  authReducer,
  salesTabReducer,
});

export default rootReducer;
