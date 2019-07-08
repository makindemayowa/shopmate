import { put, takeEvery, call } from 'redux-saga/effects';
import productsService from '../../../services/productsService';
import {
  GET_COLOR_ATTRIBUTE,
  GET_SIZE_ATTRIBUTE,
  GET_SIZE_ATTRIBUTE_ERROR,
  GET_SIZE_ATTRIBUTE_SUCCESS,
  GET_COLOR_ATTRIBUTE_ERROR,
  GET_COLOR_ATTRIBUTE_SUCCESS,
} from '../../actions/products';

/**
 * @param {any} action
 */
function* getProductsAttributeSaga(action) {
  try {
    const data = yield call(
      productsService.getProductsAttribute,
      action.payload,
    );
    if (action.type === GET_SIZE_ATTRIBUTE) {
      yield put({
        type: GET_SIZE_ATTRIBUTE_SUCCESS,
        payload: data,
      });
    }
    if (action.type === GET_COLOR_ATTRIBUTE) {
      yield put({
        type: GET_COLOR_ATTRIBUTE_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    if (action.type === GET_SIZE_ATTRIBUTE) {
      yield put({
        type: GET_SIZE_ATTRIBUTE_ERROR,
        payload: error,
      });
    }
    if (action.type === GET_COLOR_ATTRIBUTE) {
      yield put({
        type: GET_COLOR_ATTRIBUTE_ERROR,
        payload: error,
      });
    }
  }
}

/**
 *
 *
 * @export
 */
export function* getProductsAttributeWatcher() {
  yield takeEvery(
    [GET_COLOR_ATTRIBUTE, GET_SIZE_ATTRIBUTE],
    getProductsAttributeSaga,
  );
}
