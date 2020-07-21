import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Subtotal = () => {
    const cart = useSelector(state => state.cart);

    const {cartItems} = cart;
        return (
            <Row className="show-grid">
                <Col md={6}>Subtotal</Col>
        <Col md={6}>{cartItems.reduce((a,c) => (parseFloat(a) + parseFloat(c.price * c.qty)).toFixed(2), 0)} lei</Col>
            </Row>
        )
    
}

export default Subtotal;