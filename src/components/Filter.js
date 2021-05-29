import React, { Component } from 'react';
import { connect } from 'react-redux';
import {filterProducts,orderProducts} from '../actions/productActions'
class Filter extends Component {
    render() { 
        return (
            !this.props.filteredItems?
            <div>loading...</div>:(

                <div className="filter">
                    <div className="filter-result">
                        {this.props.filteredItems.length} {" "} Products
                    </div>
                    <div className="filter-sort">
                        Order {" "}
                        <select  value={this.props.sort} 
                               onChange={(e) =>
                                this.props.orderProducts(
                                  this.props.filteredItems,
                                  e.target.value
                                )
                              }
                            >
                            <option value="latest">latest</option>
                            <option value="lowest">lowest</option>
                            <option value="highest">highest</option> 
                        </select>
                    </div>
                    <div className="filter-size">
                        filter {" "}
                        <select 
                            value={this.props.size}
                            onChange={(e)=>this.props.filterProducts(this.props.products,e.target.value)}>
                            <option value="">ALL</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option> 
                        </select>
                    </div>
                </div>
            )
        );
    }
}
export default connect(
    (state)=>({
        size:state.product.size,
        sort:state.product.sort,
        products:state.product.items,
        filteredItems:state.product.filteredItems
    }),{
        filterProducts,orderProducts
    }
)(Filter) 