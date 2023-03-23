import {homepageReducer} from './homepage';
import {contactsReducer} from './contacts';
import {calendarReducer} from './calendar';
import {communicationReducer} from './communication';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  homepageReducer,
  contactsReducer,
  calendarReducer,
  communicationReducer,
});

export default rootReducer;
