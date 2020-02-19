import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap';

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            products: [],
            response: {}
        };
    }

    componentDidMount() {
        const apiURL = 'http://localhost/exp/react-api/fetch-data.php';
        fetch(apiURL)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        products: result
                    })
                },
                (error) => {
                    this.setState({error})
                }
            )
    }

    deleteProduct(productId) {
        const {products} = this.state;

        const apiURL = 'http://localhost/exp/react-api/Delete-data.php';

        // this.setState({
        //     products: products.filter(product => product.id !== productId)
        // })

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
                response: result,
                products: products.filter(product => product.id !== productId)
            })
            },
            (error) => {
                this.setState({error});
            }
        )
    }

    render() {
        
        const {error, products} = this.state;
        // console.log(products);
        if(error) {
            return(
                <div>Error: {error.message}</div>
            )
        } else {
            return (
            <div>
                <h2>Product List</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.address}</td>
                            <td>
                                <Button variant="info" onClick={() => this.props.editProduct(product.id)}>Edit</Button> &nbsp;  
                                <Button variant="danger" onClick={() => this.deleteProduct(product.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            );
        }
        
    }
}

export default ProductList;