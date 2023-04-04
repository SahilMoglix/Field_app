import {List, Map} from 'immutable';
import {STATE_STATUS} from '../constants/index';
import {HOMEPAGE_ACTIONS} from '../constants/homepage';
import {AUTH_ACTIONS} from '../constants/auth';

const initialState = new Map({
  designations: new List([]),
  companyPlant: new Map({}),
  company: new List([]),
  plant: new List([]),
  departments: new List([]),
  logoutFunc: () => {},
});

export const homepageReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case HOMEPAGE_ACTIONS.FETCHED_DESIGNATIONS:
      return state.set('designations', new List(payload.data));
    case HOMEPAGE_ACTIONS.FETCHED_DEPARTMENTS:
      return state.set('departments', new List(payload.data));
    case HOMEPAGE_ACTIONS.FETCHED_PLANT_COMPANIES:
      let companies = Object.keys(payload?.data?.company || {}).map(_ => {
        return {key: _, value: payload?.data?.company[_]};
      });
      let plants = Object.keys(payload.data?.plant || {}).map(_ => {
        return {key: _, value: payload.data?.plant?.[_]};
      });
      let tempData = (payload.data?.companyToBranch || []).map(_ => {
        return {
          [Object.keys(_)[0]]: [
            ..._[Object.keys(_)[0]].map(__ => {
              return {key: __, value: payload.data?.plant[__]};
            }),
          ],
        };
      });
      let companiesPlants = {};
      tempData.map(_ => {
        companiesPlants[Object.keys(_)[0]] = _[Object.keys(_)[0]];
      });
      return state
        .set('company', new List(companies))
        .set('plant', new List(plants))
        .set('companyPlant', new Map(companiesPlants));

    case HOMEPAGE_ACTIONS.SET_LOGOUT_FUNCTION:
      return state.set('logoutFunc', payload.data);

    case AUTH_ACTIONS.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
