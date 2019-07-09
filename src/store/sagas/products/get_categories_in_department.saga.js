import { put, takeEvery, call } from 'redux-saga/effects';
import productsService from '../../../services/productsService';
import {
  GET_CATEGORIES_IN_DEPARTMENT,
  GET_CATEGORIES_IN_DEPARTMENT_ERROR,
  GET_CATEGORIES_IN_DEPARTMENT_SUCCESS,
} from '../../actions/products';

function* getCategoriesInDepartmentSaga(action) {
  try {
    const data = yield call(
      productsService.getCategoriesInDepartment,
      action.payload,
    );
    yield put({
      type: GET_CATEGORIES_IN_DEPARTMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_CATEGORIES_IN_DEPARTMENT_ERROR,
      payload: error,
    });
  }
}

export function* getCategoriesInDepartmentWatcher() {
  yield takeEvery(GET_CATEGORIES_IN_DEPARTMENT, getCategoriesInDepartmentSaga);
}
