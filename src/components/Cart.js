import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade'
import {removeFromCart} from '../actions/cartActions'
import {createOrder,clearOrder} from '../actions/orderActions'
import Modal  from 'react-modal'
import Zoom  from 'react-reveal/Zoom'
class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            name:'',
            address:'',
            updatedItems:false
        }
    }
    handleInput = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    submitHandler = e=>{
        e.preventDefault();
        const order = {
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            cartItems:this.props.cartItems,
            total:this.props.cartItems.reduce(
                (acc,current)=>acc+current.price*current.count,0)
        }
        this.props.createOrder(order)
    }
    closeModal=()=>{
        this.props.clearOrder()

    }

    render() {
        const {cartItems,order} = this.props; 
        return (
            <Fragment>

                <div>
                    {
                        cartItems.length === 0 ? <div className="cart cart-header">Cart is Empty</div>:
                        <div className="cart cart-header">you have {cartItems.length} In Cart</div>
                    }
                    {
                        order && <Modal
                                isOpen={true}
                                onRequestClose={this.closeModal}
                            >
                            <Zoom>
                                <button onClick={this.closeModal}>x</button>
                                <div className="order-details">
                                    <h3 className="success-message">
                                        UYour order has been Placed
                                    </h3>

                                    <h2  >
                                        Order {order._id}
                                    </h2>
                                    <ul>
                                        <li>
                                            <div>Name:</div>
                                            <div>{order.name}</div>
                                        </li>
                                        <li>
                                            <div>address:</div>
                                            <div>{order.address}</div>
                                        </li>
                                        <li>
                                            <div>Date:</div>
                                            <div>{order.createdAt}</div>
                                        </li>
                                        <li>
                                            <div>email:</div>
                                            <div>{order.email}</div>
                                        </li>
                                        <li>
                                            <div>total:</div>
                                            <div>{order.total}</div>
                                        </li>
                                        <li>
                                            <div>cart items:</div>
                                            <div>{
                                               
                                            order.cartItems.map(itm=>(
                                                <div key={itm._id}>
                                                    {itm.count} * {itm.title}
                                                </div>
                                            ))}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Zoom>
                        </Modal>
                    }
                    {cartItems.length !== 0 &&(

                        <div>
                            <div className="cart">
                                <Fade left cascade>
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
                                </Fade>
                            </div>
                            <div className="cart">
                                <div className="total">
                                    <div>
                                        TOTAL : 
                                        {
                                        formatCurrency(cartItems.reduce((a,b)=>a + (b.price * b.count),0))}
                                    </div>
                                    <button className="button primary" onClick={()=>{
                                        this.setState({showCheckout:true})
                                    }}>
                                            Procced
                                    </button>
                                </div>
                            </div>
                            {this.state.showCheckout&&(
                                <Fade right cascade>
                                    <div className="cart">
                                        <form onSubmit={this.submitHandler}>
                                            <ul className="form-container">
                                                <li>
                                                    <label>Email</label>
                                                    <input 
                                                        name="email"
                                                        type="email"
                                                        required
                                                        onChange={this.handleInput}
                                                    />
                                                </li>
                                                <li>
                                                    <label>Name</label>
                                                    <input 
                                                        name="name"
                                                        type="text"
                                                        required
                                                        onChange={this.handleInput}
                                                    />
                                                </li>
                                                <li>
                                                    <label>Address</label>
                                                    <input 
                                                        name="address"
                                                        type="text"
                                                        required
                                                        onChange={this.handleInput}
                                                    />
                                                </li>
                                                <li>
                                                    <button 
                                                    className="button primary" type="submit">Checkout</button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </Fade>
                            )}
                        </div>
                    )}
                </div>
            </Fragment>
        );
    }
}

export default connect((state)=>({
    cartItems:state.cart.cartItems,
    order:state.order.order
}),{
    removeFromCart,
    createOrder,
    clearOrder
}) (Cart);