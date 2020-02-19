import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Container, Button, Alert } from 'react-bootstrap';
import ProductList from './ProductList';
import AddProduct from './AddProduct';

const strapi = new Strapi('http://localhost:1337');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     posts: []
   }
//    console.log(strapi);
 }

async componentDidMount() {
 try {
   const posts = await strapi.getEntries('Blogs')
   this.setState({ posts });
 } 
 catch(err) {
  alert(err);
 }
}

render() {
  let productForm;
    if(this.state.isAddProduct || this.state.isEditProduct) {
      // console.log(this.state);
      productForm = <AddProduct onFormSubmit={this.onFormSubmit} product={this.state.product} />
    }
  return (
    
    <section>
        <h1>Welcome</h1>
         {this.state.posts.map(post => (
            <div>
                <div>Title: {post.Title}</div>
                <div>Content: {post.Body}</div>   
            </div>
        ))} 

        
    </section>
  );
 }
}
export default App;