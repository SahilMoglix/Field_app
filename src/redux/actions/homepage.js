import {HOMEPAGE_ACTIONS} from '../constants/homepage';

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
