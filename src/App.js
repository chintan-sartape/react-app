import React, { Component } from 'react';
import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import ProductList from './ProductList';
import AddProduct from './AddProduct-old';

class App extends Component {

  state = {
    fields: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      isAddProduct: false,
      error: null,
      response: {},
      product: {},
      isEditProduct: false
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({isAddProduct: true});
  }

  onFormSubmit(data) {
    let apiURL;
    if(this.state.isEditProduct) {
      apiURL = 'http://localhost/exp/react-api/Edit-data.php';
    } else {
      apiURL = 'http://localhost/exp/react-api/Add-data.php';
    }
    const myHeaders = new Headers();
    myHeaders.append('content-Type', 'application/json');
    
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      myHeaders
    };
    // console.log(options);
    // return false;

    fetch(apiURL, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,
            isAddProduct: false,
            isEditProduct: false
          })
        },
        (error) => {
          this.setState({error});
        }
      )
  }

  editProduct = productId => {
    // console.log(productId);
    const apiURL = 'http://localhost/exp/react-api/Get-data.php';

    const formData = new FormData();
    formData.append('productID', productId);

    const options = {
      method: 'POST',
      body: formData
    };

    fetch(apiURL, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            product: result,
            isAddProduct: true,
            isEditProduct: true
          })
        },
        (error) => {
          this.setState({error});
        }
      )
  }

  render() {

    let productForm;
    if(this.state.isAddProduct || this.state.isEditProduct) {
      // console.log(this.state);
      productForm = <AddProduct onFormSubmit={this.onFormSubmit} product={this.state.product} />
    }
    return (
      // <Router>
      <div className="App">
        <Container>
        <h1>Welcome To React js</h1>

        {!this.state.isAddProduct && <Button variant="primary" onClick={() =>this.onCreate() }>Add Product</Button> }
        {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
        {!this.state.isAddProduct && <ProductList editProduct={this.editProduct} /> }
        {productForm}
        {this.state.error && <div>Error: {this.state.error.message}</div>}

        </Container>
      </div>
    );
  }

}
export default App;
