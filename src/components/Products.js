import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import Modal from 'react-modal'
class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            product:null
        }
    }
    openModal = (itm)=>{
        this.setState({product:itm})
    }
    closeModal = ()=>{
        this.setState({product:null})
    }
    render() {
        const product = this.state.product;
        return (
            <div>
                <Fade bottom cascade={true}> 
                    <ul className="products">
                        {this.props.products.map(itm=>(
                            <li key={itm._id}>
                                <div className="product">
                                    <a href={"#"+itm._id} onClick={()=>this.openModal(itm)}>
                                        <img src={itm.image} alt={itm.title}/>
                                        <p> {itm.title}</p>
                                    </a>
                                    <div className="product-price">
                                        <div>{formatCurrency( itm.price)}</div>
                                        <button className='button  primary' onClick={()=>this.props.addToCart(itm)}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Fade>
                {this.state.product &&(
                    <Modal isOpen={true} onRequestClose={this.closeModal}>

                        <Zoom>
                            <div>
                                <button className="close-modal" onClick={this.closeModal}>Close</button>
                                <div className="product-detail">
                                    <img src={product.image}/>
                                    <div className="product-detail-desc">
                                        <p>
                                            <strong>{product.title}</strong>
                                        </p>
                                        <p>
                                        {product.description}
                                        </p>
                                        <p>
                                            Availble Sizes
                                            {product.availableSizes.map(itm=>(
                                                <span>{" "}
                                                    <button className="button">{itm}</button>
                                                </span>
                                            ))}
                                        </p>
                                        <div className="product-price">
                                            <div>
                                                {formatCurrency( product.price)}
                                            </div>
                                            <button 
                                            onClick={()=>{
                                                this.props.addToCart(product);
                                                this.closeModal();
                                            }}
                                            className="button primary">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )}
            </div>
        );
    }
}

export default Products;