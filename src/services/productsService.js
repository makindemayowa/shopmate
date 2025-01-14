import axios from 'axios';
import EventEmitter from '../utils/EventEmitter';
import systemConfig from '../config/system';

class productsService extends EventEmitter {
  constructor() {
    super();

    this.setDefaults();
  }

  setDefaults = () => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
  };

  getAllProducts = ({ page, limit, description_length }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(systemConfig.serverBaseUrl + '/products', {
          params: {
            page,
            limit,
            description_length,
          },
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  searchProducts = ({
    query_string,
    all_words,
    page,
    limit,
    description_length,
    isFilter,
    priceRange,
  }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(systemConfig.serverBaseUrl + '/products/search', {
          params: {
            query_string,
            all_words,
            page,
            limit,
            description_length,
          },
        })
        .then(response => {
          if (isFilter) {
            const filtered = response.data.rows.filter(
              product =>
                parseFloat(product.price) >= priceRange[0] &&
                parseFloat(product.price) <= priceRange[1],
            );
            const resp = {
              ...response.data,
              rows: filtered,
            };
            resolve(resp);
          } else {
            resolve(response.data);
          }
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  getProductsInCategory = ({ category_id }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(systemConfig.serverBaseUrl + `/products/inCategory/${category_id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  getProductsInDepartment = ({ department_id }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          systemConfig.serverBaseUrl +
            `/products/inDepartment/${department_id}`,
        )
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  /* ---------------------------------------------- */
  /* The Following Methods are for a single product */
  /* ---------------------------------------------- */

  getProductById = ({ product_id }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(systemConfig.serverBaseUrl + `/products/${product_id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  getProductDetails = ({ product_id }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(systemConfig.serverBaseUrl + `/products/${product_id}/details`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  getProductLocations = ({ product_id }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(systemConfig.serverBaseUrl + `/products/${product_id}/locations`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  getProductReviews = ({ product_id }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(systemConfig.serverBaseUrl + `/products/${product_id}/reviews`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  createProductReview = ({ product_id, review, rating }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(systemConfig.serverBaseUrl + `/products/${product_id}/reviews`, {
          review,
          rating,
        })
        .then(response => {
          resolve(response.data.user);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  /* ---------------------------------------------- */
  /* The Following Methods are for product attributes*/
  /* ---------------------------------------------- */

  getProductsAttribute = ({ attribute_id }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(systemConfig.serverBaseUrl + `/attributes/values/${attribute_id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  getDepartments = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(systemConfig.serverBaseUrl + `/departments`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  getCategoriesInDepartment = ({ department_id }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          systemConfig.serverBaseUrl +
            `/categories/inDepartment/${department_id}`,
        )
        .then(response => {
          resolve({
            department_id,
            categories: response.data,
          });
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };
}

const instance = new productsService();

export default instance;
