 import { Component } from 'react';
import Products from './components/Products';
import data from './data.json'
//feature-1
class App extends Component {
  constructor(){
    super();
    this.state = {
      products:data.products,
      size:"",
      sort:""
    }
  }
  render() {
    return (
      <div className="container"> 
        <header>
          <a href="/home">home</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Products products={this.state.products}/>
            </div>
            <div className="sidebar">
              cart items
            </div>
          </div>
        </main>
        <footer>
          All right is Reserved
        </footer>
      </div>
    );
  }
}

export default App;
