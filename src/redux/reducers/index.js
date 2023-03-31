import {homepageReducer} from './homepage';
import {contactsReducer} from './contacts';
import {calendarReducer} from './calendar';
import {communicationReducer} from './communication';
import {authReducer} from './auth';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  homepageReducer,
  contactsReducer,
  calendarReducer,
  communicationReducer,
  authReducer,
});

export default rootReducer;
