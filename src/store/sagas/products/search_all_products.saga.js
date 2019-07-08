import { put, takeLatest, call } from 'redux-saga/effects';
import productsService from '../../../services/productsService';
import {
  SEARCH_ALL_PRODUCTS,
  SEARCH_ALL_PRODUCTS_SUCCESS,
  SEARCH_ALL_PRODUCTS_ERROR,
} from '../../actions/products';

/**
 * @param {any} action
 */
function* searchAllProductsSaga(action) {
  try {
    const data = yield call(productsService.searchProducts, action.payload);
    yield put({
      type: SEARCH_ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: SEARCH_ALL_PRODUCTS_ERROR,
      payload: error,
    });
  }
}

/**
 * @export
 */
export function* searchAllProductsWatcher() {
  yield takeLatest(SEARCH_ALL_PRODUCTS, searchAllProductsSaga);
}
