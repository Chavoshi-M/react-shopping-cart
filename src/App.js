 import { Component } from 'react';
import { Provider } from 'react-redux';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products'; 
import store from './store';

class App extends Component {
  constructor(){
    super();
    this.state = {
      cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[] 
    }
  }
  addToCart=(product)=>{
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(itm=>{
      if(itm._id === product._id){
        itm.count++;
        alreadyInCart = true;
      }
    })
    if (!alreadyInCart) {
      cartItems.push({...product,count:1})
    }
    this.setState({
      cartItems
    })
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
  }
  removeFromCart=(product)=>{
    const cartItems = this.state.cartItems.slice();
    const updatedItems = cartItems.filter(itm=>itm._id !== product._id)
    this.setState({cartItems:updatedItems});
    localStorage.setItem('cartItems',JSON.stringify(updatedItems));
  }
 
  createOrder = (data)=>{
    console.log(data);
  }
  render() {
    return (
      <Provider store={store}>
      <div className="container"> 
        <header>
          <a href="/home">home</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter/>
              <Products addToCart={this.addToCart}  />
            </div>
            <div className="sidebar">
              <Cart createOrder={this.createOrder} removeFromCart={this.removeFromCart} cartItems={this.state.cartItems}/>
            </div>
          </div>
        </main>
        <footer>
          All right is Reserved
        </footer>
      </div>
      </Provider>
    );
  }
}

export default App;
