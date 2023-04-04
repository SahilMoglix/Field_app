import {HOMEPAGE_ACTIONS} from '../constants/homepage';

export const setLogoutFunction = data => {
  return {
    type: HOMEPAGE_ACTIONS.SET_LOGOUT_FUNCTION,
    payload: {
      data,
    },
  };
};

export const fetchDepartments = () => {
  return {
    type: HOMEPAGE_ACTIONS.FETCH_DEPARTMENTS,
  };
};

export const fetchedDepartments = data => {
  return {
    type: HOMEPAGE_ACTIONS.FETCHED_DEPARTMENTS,
    payload: {
      data,
    },
  };
};

export const failedFetchDepartments = error => {
  return {
    type: HOMEPAGE_ACTIONS.FAILED_FETCH_DEPARTMENTS,
    error,
  };
};

export const fetchDesignations = () => {
  return {
    type: HOMEPAGE_ACTIONS.FETCH_DESIGNATIONS,
  };
};

export const fetchedDesignations = data => {
  return {
    type: HOMEPAGE_ACTIONS.FETCHED_DESIGNATIONS,
    payload: {
      data,
    },
  };
};

export const failedFetchDesignations = error => {
  return {
    type: HOMEPAGE_ACTIONS.FAILED_FETCH_DESIGNATIONS,
    error,
  };
};

export const fetchPlantCompanies = () => {
  return {
    type: HOMEPAGE_ACTIONS.FETCH_PLANT_COMPANIES,
  };
};

export const fetchedPlantCompanies = data => {
  return {
    type: HOMEPAGE_ACTIONS.FETCHED_PLANT_COMPANIES,
    payload: {
      data,
    },
  };
};

export const failedFetchPlantCompanies = error => {
  return {
    type: HOMEPAGE_ACTIONS.FAILED_FETCH_PLANT_COMPANIES,
    error,
  };
};
