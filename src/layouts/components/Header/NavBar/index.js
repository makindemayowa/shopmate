import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  InputBase,
  Badge,
  Drawer,
  Hidden,
  IconButton,
  Button,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/icons/Menu';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles';
import * as productsActions from '../../../../store/actions/products';
import * as alertActions from '../../../../store/actions/alerts';
import './style.css';

/**
 *
 * @class NavBar
 * @extends {React.Component}
 */
class NavBar extends React.Component {
  static propTypes = {
    searchAllProducts: PropTypes.func.isRequired,
    getDepartments: PropTypes.func.isRequired,
    departments: PropTypes.array.isRequired,
  };
  state = {
    mobileOpen: false,
    search: '',
  };

  /**
   *
   * @memberOf NavBar
   */
  componentDidMount() {
    window.addEventListener('scroll', event => {
      const scrollpos = window.scrollY;
      if (scrollpos > 10) {
        this.setState({
          activeClass: 'is-scrolled',
        });
      } else {
        this.setState({
          activeClass: 'is-ontop',
        });
      }
    });
    const { getDepartments } = this.props;
    getDepartments();
  }

  componentDidUpdate(nextProps) {
    const { departments, getCategoriesInDepartment } = this.props;
    if (departments !== nextProps.departments) {
      departments.forEach(department => {
        getCategoriesInDepartment({ department_id: department.department_id });
      });
    }
  }

  onSearchInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitSearch = e => {
    const { searchAllProducts } = this.props;
    const { search } = this.state;
    if (e.which === 13 || e.keyCode === 13 || e.key === 'Enter') {
      return searchAllProducts({
        query_string: search,
        all_words: 'yes',
        page: 1,
        limit: 20,
      });
    }
  };

  /**
   *
   * @memberOf NavBar
   */
  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  /**
   *
   * @returns
   * @memberOf NavBar
   */
  render() {
    const { classes, brand, departments, departmentsDetails } = this.props;

    const brandComponent = (
      <Link to="/" className={classes.brand}>
        {brand}
      </Link>
    );

    return (
      <div>
        <AppBar
          className={`mainHeaderHolder ${classes.navBar +
            ' ' +
            this.state.activeClass}`}
        >
          <Toolbar className={classes.toolbar}>
            <div className={classes.flex}>{brandComponent}</div>
            <Hidden mdDown>
              <div
                className={`departments categories ${classes.linksContainer}`}
              >
                {!!departments.length &&
                  departments.map(department => (
                    <NavDropdown
                      key={department.department_id}
                      title={department.name}
                      className="department navDropdown"
                    >
                      {departmentsDetails[department.department_id]
                        .categories &&
                        departmentsDetails[
                          department.department_id
                        ].categories.map(category => (
                          <NavDropdown.Item
                            key={category.category_id}
                            className="category"
                          >
                            {category.name}
                          </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                  ))}
              </div>
            </Hidden>
            <Hidden mdDown>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  name="search"
                  onKeyDown={this.submitSearch}
                  onChange={this.onSearchInputChange}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </Hidden>
            <Hidden mdDown>
              <div
                className={classes.iconContainer}
                onClick={() => {
                  this.props.showCart();
                }}
              >
                <Badge
                  classes={{
                    badge: classes.badge,
                  }}
                  id="menuCartQuantity"
                  badgeContent={2}
                  color="primary"
                >
                  <img
                    alt="Shopping Cart Icon"
                    src="/assets/icons/shopping-cart-white.svg"
                  />
                </Badge>
              </div>
            </Hidden>
            <Hidden mdUp>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle.bind(this)}
              >
                <Menu />
              </IconButton>
            </Hidden>
          </Toolbar>
          <Hidden mdUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="right"
              className="py-12"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle.bind(this)}
            >
              <Button
                classes={{
                  root: classes.button,
                }}
              >
                <Link to="/department/1" className={classes.navDrawerLink}>
                  Regional
                </Link>
              </Button>
            </Drawer>
          </Hidden>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'transparent',
    'white',
    'rose',
    'dark',
  ]),
  brand: PropTypes.string.isRequired,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
};

const mapStateToProps = ({ products }) => {
  return {
    isLoading: products.all.isLoading,
    departments: products.all.departments,
    departmentsDetails: products.all.departmentsDetails,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      showCart: alertActions.showCart,
      searchAllProducts: productsActions.searchAllProducts,
      getDepartments: productsActions.getDepartments,
      getCategoriesInDepartment: productsActions.getCategoriesInDepartment,
    },
    dispatch,
  );
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NavBar),
);
