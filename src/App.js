 import { Component } from 'react';
import Filter from './components/Filter';
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
  sortProducts = e => {
    console.log(e.target.value);
    const sort = e.target.value
    this.setState(state=>({
      sort,
      products:this.state.products
        .slice()
        .sort((a,b)=>(
          sort === "lowest"?
          ((a.price>b.price)?1:-1):
          sort === "highest"?
          ((a.price<b.price)?1:-1):
          ((a._id>b._id)?1:-1)
        ))
    }))
  }
  filterProducts = (e)=>{
    if (e.target.value === "") {
      console.log(e.target.value);
      this.setState({
        size:e.target.value,
        products:data.products 
      })
    }else{
    console.log(this.state.products);
      this.setState({
        size:e.target.value,
        products:data.products.filter(itm=>itm.availableSizes.indexOf(e.target.value) >= 0)
      })
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
              <Filter 
                sort={this.state.sort}
                size={this.state.size}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
                count={this.state.products.length}
              />
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
