// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {HOMEPAGE_ACTIONS} from '../constants/homepage';
// api call
import {
  getDesignations,
  getPlantCompnaies,
  getDepartments,
} from '../../services/homepage';
// actions
import {
  failedFetchDepartments,
  failedFetchDesignations,
  failedFetchPlantCompanies,
  fetchedDepartments,
  fetchedDesignations,
  fetchedPlantCompanies,
} from '../actions/homepage';
import {
  plantCompanies,
  designations,
  depaertments,
} from '../../responses/calendar';

function* fetchDepartment() {
  try {
    const {data, error} = yield call(getDepartments);
    // let data = depaertments;
    // let error = null;
    if (error) {
      yield put(failedFetchDepartments(error));
    } else {
      yield put(fetchedDepartments(data.result));
    }
  } catch (error) {
    console.log(error, 'department');
    yield put(failedFetchDepartments(error));
  }
}

function* fetchDesignation() {
  try {
    const {data, error} = yield call(getDesignations);
    // let data = designations;
    // let error = null;
    if (error) {
      yield put(failedFetchDesignations(error));
    } else {
      yield put(fetchedDesignations(data.result));
    }
  } catch (error) {
    console.log(error, 'designation');
    yield put(failedFetchDesignations(error));
  }
}

function* fetchPlantCompany() {
  try {
    const {data, error} = yield call(getPlantCompnaies);
    // let data = plantCompanies;
    // let error = null;
    if (error) {
      yield put(failedFetchPlantCompanies(error));
    } else {
      yield put(fetchedPlantCompanies(data.data));
    }
  } catch (error) {
    console.log(error, 'plantcompany');
    yield put(failedFetchPlantCompanies(error));
  }
}

export default fork(function* () {
  // yield takeEvery(HOMEPAGE_ACTIONS.FETCH_PRODUCTS, fetchHomeLayout);
  yield takeEvery(HOMEPAGE_ACTIONS.FETCH_DESIGNATIONS, fetchDesignation);
  yield takeEvery(HOMEPAGE_ACTIONS.FETCH_DEPARTMENTS, fetchDepartment);
  yield takeEvery(HOMEPAGE_ACTIONS.FETCH_PLANT_COMPANIES, fetchPlantCompany);
});
