import {homepageReducer} from './homepage';
import {contactsReducer} from './contacts';
import {calendarReducer} from './calendar';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  homepageReducer,
  contactsReducer,
  calendarReducer,
});

export default rootReducer;
