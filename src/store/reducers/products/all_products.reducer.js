import * as Actions from '../../actions';

const initialState = {
  data: {
    rows: [],
  },
  isLoading: false,
  departments: [],
  departmentsDetails: {
    1: { department: {}, categories: [] },
  },
  error: false,
  attributes: {
    size: [],
    color: [],
  },
};

const allProductsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ALL_PRODUCTS: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case Actions.GET_ALL_PRODUCTS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: false,
      };
    }
    case Actions.GET_ALL_PRODUCTS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case Actions.SEARCH_ALL_PRODUCTS: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case Actions.SEARCH_ALL_PRODUCTS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: false,
      };
    }
    case Actions.GET_SIZE_ATTRIBUTE_SUCCESS: {
      return {
        ...state,
        attributes: {
          ...state.attributes,
          size: action.payload,
        },
      };
    }
    case Actions.GET_COLOR_ATTRIBUTE_SUCCESS: {
      return {
        ...state,
        attributes: {
          ...state.attributes,
          color: action.payload,
        },
      };
    }
    case Actions.GET_PRODUCTS_DEPARTMENT_SUCCESS: {
      const departmentsDetails = {};
      action.payload.forEach(
        dept => (departmentsDetails[dept.department_id] = { department: dept }),
      );
      return {
        ...state,
        departmentsDetails,
        departments: action.payload,
      };
    }
    case Actions.GET_CATEGORIES_IN_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        departmentsDetails: {
          ...state.departmentsDetails,
          [action.payload.department_id]: {
            ...state.departmentsDetails[action.payload.department_id],
            categories: action.payload.categories,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default allProductsReducer;
