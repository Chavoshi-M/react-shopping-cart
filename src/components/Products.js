import React, { Component } from 'react';
import formatCurrency from '../util';

class Products extends Component {
    render() {
        return (
            <div>
                <ul className="products">
                    {this.props.products.map(itm=>(
                        <li key={itm._id}>
                            <div className="product">
                                <a href={"#"+itm._id}>
                                    <img src={itm.image} alt={itm.title}/>
                                    <p> {itm.title}</p>
                                </a>
                                <div className="product-price">
                                    <div>{formatCurrency( itm.price)}</div>
                                    <button className='button  primary'>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Products;