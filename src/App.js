 import { Component } from 'react';
import { Provider } from 'react-redux';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products'; 
import store from './store';

class App extends Component { 
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
              <Products />
            </div>
            <div className="sidebar">
              <Cart />
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
