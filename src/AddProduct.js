import React, {Component} from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';

class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.initialState = {
            id: '',
            name: '',
            address: ''
        }
        if(props.product) {
            this.state = props.product;
        } else {
            this.state = this.initialState;
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.onFormSubmit(this.state);
        this.setState(this.initialState);
        // console.log(this.state);
    }

    render() {
        let title;
        if(this.state.name && this.state.address) {
            title = 'Update Product';
        } else {
            title = 'Add Product';
        } 
        return (
            <div>

                {!this.state.isAddProduct && <Button variant="primary" onClick={() =>this.onCreate() }>Add Product</Button> }
                <h2>{title}</h2>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name"/>
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" value={this.state.address} onChange={this.handleChange} placeholder="Address" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="hidden" name="id" value={this.state.id} />
                            <Button variant="success" type="submit">Save</Button>
                        </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AddProduct;