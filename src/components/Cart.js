import React, { Component, Fragment } from 'react';
import formatCurrency from '../util';

class Cart extends Component {
    render() {
        const {cartItems} = this.props;
        return (
            <Fragment>

                <div>
                    {cartItems.length === 0 ? <div className="cart cart-header">Cart is Empty</div>:
                    <div className="cart cart-header">you have {cartItems.length} In Cart</div>
                    }
                    {cartItems.length !== 0 &&(

                    <div>
                        <div className="cart">
                            <ul className="cart-items">
                                {cartItems.map(itm=>(
                                    <li key={itm._id}>
                                        <div>
                                            <img src={itm.image}></img>
                                        </div>
                                        <div>

                                            <div>
                                                {itm.title}
                                            </div>
                                            <div className="right">
                                                {formatCurrency(itm.price)} x{itm.count} 
                                                <button className="button" onClick={()=>this.props.removeFromCart(itm)}>Remove</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="cart">
                            <div className="total">
                                <div>
                                    TOTAL : 
                                    {
                                    formatCurrency(cartItems.reduce((a,b)=>a + (b.price * b.count),0))}
                                </div>
                                <button className="button primary">
                                        Procced
                                </button>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </Fragment>
        );
    }
}

export default Cart;