/**
 *
 * if a user select a department and category in the navigation menu
 * - Filter should display Department and category dynamically when a user select a department and category
 *  on the navigation bar
 * - Implement pagination for products
 *
 */
import React, { Component } from 'react';
import {
  withStyles,
  Paper,
  Radio,
  Checkbox,
  Button,
  Fab,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { Slider } from 'material-ui-slider';
import withWidth from '@material-ui/core/withWidth';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Close from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import * as productActions from '../../store/actions/products';
import styles from './styles';
import { Container, Section } from '../../components/Layout';
import ListProduct from '../../components/ListProduct';
import Banner from '../../components/Banner';
import SubscribeBar from '../../components/SubscribeBar';
import './styles.css';

const defaultState = {
  selectedColors: [],
  selectedSizes: [],
  priceRange: [0, 100],
  searchTerm: '',
};
/**
 * Home component
 *
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
  static propTypes = {
    getAllProducts: PropTypes.func.isRequired,
    searchAllProducts: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    sizes: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getColorAttribute: PropTypes.func.isRequired,
    getSizeAttribute: PropTypes.func.isRequired,
  };

  state = defaultState;

  /**
   *
   * @memberOf Home
   */
  componentDidMount() {
    const { getAllProducts, getColorAttribute, getSizeAttribute } = this.props;
    getAllProducts({
      page: 1,
      limit: 9,
      description_length: 120,
    });
    getColorAttribute({ attribute_id: 2 });
    getSizeAttribute({ attribute_id: 1 });
  }

  onPriceSliderChange = priceRange => {
    this.setState({
      priceRange,
    });
  };

  updateAttributeState = (e, selectedState) => {
    const value = e.target.value;
    const selectedStateValue = this.state[selectedState];
    if (selectedStateValue.indexOf(value) < 0) {
      this.setState({
        [selectedState]: [...selectedStateValue, value],
      });
    } else {
      this.setState({
        [selectedState]: selectedStateValue.filter(a => a !== value),
      });
    }
  };

  updateSearchKeyword = e => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  resetState = () => {
    this.setState(defaultState);
  };

  // Only filtering results by price alone for now
  onFilterSubmit = () => {
    // TODO filter by size and color
    // Get attributes in product  GET /attributes/inProduct/{product_id}
    // filter search results based on attributes present
    const { searchTerm, priceRange } = this.state;
    const { searchAllProducts } = this.props;
    return searchAllProducts({
      query_string: searchTerm,
      all_words: 'yes',
      page: 1,
      limit: 100,
      isFilter: true,
      priceRange,
    });
  };

  /**
   *
   * @returns HTML string
   * @memberOf Home
   */
  render() {
    const { classes, products, isLoading, sizes, colors } = this.props;
    const {
      priceRange,
      searchTerm,
      selectedSizes,
      selectedColors,
    } = this.state;

    let currentProducts = products;

    return (
      <div className={classes.root}>
        <Container>
          <Section>
            <div className="flex mb-4 contentHolder">
              <div className="w-1/4 filterSection">
                <Paper className={classes.controlContainer} elevation={1}>
                  <div className={classes.filterBlock}>
                    <div className={classes.titleContainer}>
                      <span className={classes.controlsTopTitle}>
                        Filter Items
                      </span>
                    </div>
                    <div className={classes.filterItems}>
                      <div className="py-1">
                        <span className={classes.isGrey}>Category: </span>
                        <span>Regional</span>
                      </div>
                      <div className="py-1 pb-2">
                        <span className={classes.isGrey}>Department: </span>
                        <span>French</span>
                      </div>
                    </div>
                  </div>
                  <div className={classes.filterBodyContainer}>
                    <div className={classes.colorBlock}>
                      <div className={classes.titleContainer}>
                        <span className={classes.controlsTitle}>Color</span>
                      </div>
                      <div className={classes.colorRadiosContainer}>
                        {colors.map(color => (
                          <Radio
                            key={color.attribute_value_id}
                            style={{ padding: 0, color: `${color.value}` }}
                            onClick={e =>
                              this.updateAttributeState(e, 'selectedColors')
                            }
                            size="small"
                            checked={
                              selectedColors.indexOf(color.value) > -1
                                ? true
                                : false
                            }
                            icon={<FiberManualRecord />}
                            value={color.value}
                            name="radio-button-demo"
                            aria-label={color.value}
                          />
                        ))}
                      </div>
                    </div>
                    <div className={classes.sizesBlock}>
                      <div className={classes.titleContainer}>
                        <span className={classes.controlsTitle}>Size</span>
                      </div>
                      <div className={classes.sizeCheckboxes}>
                        {sizes.map(size => (
                          <Checkbox
                            key={size.attribute_value_id}
                            onClick={e =>
                              this.updateAttributeState(e, 'selectedSizes')
                            }
                            style={{ padding: 0 }}
                            checkedIcon={
                              <div className={classes.sizeCheckboxChecked}>
                                {size.value}
                              </div>
                            }
                            icon={
                              <div className={classes.sizeCheckboxUnchecked}>
                                {size.value}
                              </div>
                            }
                            checked={
                              selectedSizes.indexOf(size.value) > -1
                                ? true
                                : false
                            }
                            value={size.value}
                          />
                        ))}
                      </div>
                    </div>
                    <div className={classes.sliderBlock}>
                      <div className={classes.titleContainer}>
                        <span className={classes.controlsTitle}>
                          Price Range
                        </span>
                      </div>
                      <div className={classes.sliderContainer}>
                        <Slider
                          color="#f62f5e"
                          onChange={this.onPriceSliderChange}
                          min={1}
                          value={priceRange}
                          max={100}
                          range
                        />
                      </div>
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                          height: '24px',
                        }}
                      >
                        <div className={classes.rangesText}>
                          £ {priceRange[0]}
                        </div>
                        <div style={{ flexGrow: 1 }} />
                        <div className={classes.rangesText}>
                          £ {priceRange[1]}
                        </div>
                      </div>
                    </div>
                    <div className={classes.searchBlock}>
                      <div className={classes.titleContainer}>
                        <span className={classes.controlsTitle}>
                          Search keyword
                        </span>
                      </div>
                      <div className={classes.searchContainer}>
                        <TextField
                          inputProps={{
                            className: classes.filterSearchInput,
                          }}
                          value={searchTerm}
                          onChange={this.updateSearchKeyword}
                          placeholder="Enter a keyword to search..."
                          margin="dense"
                          variant="outlined"
                          name="search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={classes.footerBlock}>
                    <Fab
                      color="primary"
                      size="small"
                      onClick={this.onFilterSubmit}
                      className={classes.coloredButton}
                      style={{ borderRadius: 24, height: 35, width: 90 }}
                    >
                      <span className={classes.submitButtonText}>Apply</span>
                    </Fab>

                    <Button
                      className={classes.clearText}
                      onClick={this.resetState}
                    >
                      <Close className={classes.boldIcon} />
                      <span>Reset</span>
                    </Button>
                  </div>
                </Paper>
              </div>
              {isLoading ? (
                <div className={classes.progressContainer}>
                  <CircularProgress color="primary" />
                </div>
              ) : (
                <div className="w-3/4 flex flex-wrap ml-6 productsSection">
                  {currentProducts.map((product, index) => (
                    <div
                      key={index}
                      className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 mb-4"
                    >
                      <ListProduct product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Section>
          <Section>
            <Banner />
          </Section>
          <Section>
            <SubscribeBar />
          </Section>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getAllProducts: productActions.getAllProducts,
      getColorAttribute: productActions.getProductsColorAttribute,
      getSizeAttribute: productActions.getProductsSizeAttribute,
      searchAllProducts: productActions.searchAllProducts,
    },
    dispatch,
  );
};

const mapStateToProps = ({ products, categories, departments }) => {
  return {
    products: products.all.data.rows,
    isLoading: products.all.isLoading,
    sizes: products.all.attributes.size,
    colors: products.all.attributes.color,
  };
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps,
      )(Home),
    ),
  ),
);
