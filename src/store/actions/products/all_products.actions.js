export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_ALL_PRODUCTS_ERROR = 'GET_ALL_PRODUCTS_ERROR';
export const GET_ALL_PRODUCTS_SUCCESS = 'GET_ALL_PRODUCTS_SUCCESS';
export const SEARCH_ALL_PRODUCTS = 'SEARCH_ALL_PRODUCTS';
export const SEARCH_ALL_PRODUCTS_ERROR = 'SEARCH_ALL_PRODUCTS_ERROR';
export const SEARCH_ALL_PRODUCTS_SUCCESS = 'SEARCH_ALL_PRODUCTS_SUCCESS';
export const GET_SIZE_ATTRIBUTE = 'GET_SIZE_ATTRIBUTE';
export const GET_SIZE_ATTRIBUTE_ERROR = 'GET_SIZE_ATTRIBUTE_ERROR';
export const GET_SIZE_ATTRIBUTE_SUCCESS = 'GET_SIZE_ATTRIBUTE_SUCCESS';
export const GET_COLOR_ATTRIBUTE = 'GET_COLOR_ATTRIBUTE';
export const GET_COLOR_ATTRIBUTE_ERROR = 'GET_COLOR_ATTRIBUTE_ERROR';
export const GET_COLOR_ATTRIBUTE_SUCCESS = 'GET_COLOR_ATTRIBUTE_SUCCESS';

export const getAllProducts = data => ({
  type: GET_ALL_PRODUCTS,
  payload: data,
});

export const searchAllProducts = data => ({
  type: SEARCH_ALL_PRODUCTS,
  payload: data,
});

export const getProductsSizeAttribute = data => ({
  type: GET_SIZE_ATTRIBUTE,
  payload: data,
});

export const getProductsColorAttribute = data => ({
  type: GET_COLOR_ATTRIBUTE,
  payload: data,
});
