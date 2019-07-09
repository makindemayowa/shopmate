import { put, takeLatest, call } from 'redux-saga/effects';
import productsService from '../../../services/productsService';
import {
  GET_PRODUCTS_DEPARTMENT,
  GET_PRODUCTS_DEPARTMENT_ERROR,
  GET_PRODUCTS_DEPARTMENT_SUCCESS,
} from '../../actions/products';

function* getDepartmentsaga(action) {
  try {
    const data = yield call(productsService.getDepartments);
    yield put({
      type: GET_PRODUCTS_DEPARTMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCTS_DEPARTMENT_ERROR,
      payload: error,
    });
  }
}

export function* getProductsDepartMentWatcher() {
  yield takeLatest(GET_PRODUCTS_DEPARTMENT, getDepartmentsaga);
}
