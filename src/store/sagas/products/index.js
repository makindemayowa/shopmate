import { all } from 'redux-saga/effects';
import { getAllProductsWatcher } from './get_all_products.saga';
import { searchAllProductsWatcher } from './search_all_products.saga';
import { getProductsAttributeWatcher } from './get_products_attribute.saga';
import { getProductsDepartMentWatcher } from './get_products_departments.saga';
import { getCategoriesInDepartmentWatcher } from './get_categories_in_department.saga';

/**
 * @export
 */
export default function* productsSaga() {
  yield all([
    getAllProductsWatcher(),
    searchAllProductsWatcher(),
    getProductsAttributeWatcher(),
    getProductsDepartMentWatcher(),
    getCategoriesInDepartmentWatcher(),
  ]);
}
