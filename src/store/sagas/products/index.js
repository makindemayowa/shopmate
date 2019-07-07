import { all } from 'redux-saga/effects';
import { getAllProductsWatcher } from './get_all_products.saga';
import { searchAllProductsWatcher } from './search_all_products.saga';

/**
 * @export
 */
export default function* productsSaga() {
  yield all([getAllProductsWatcher(), searchAllProductsWatcher()]);
}
