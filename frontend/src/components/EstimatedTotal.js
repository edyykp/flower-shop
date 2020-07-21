import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { useSelector } from 'react-redux';

const EsimatedTotal = () => {
    const cart = useSelector(state => state.cart);

    const {cartItems} = cart;
        return (
            
            <Row>
                <Col md={6}><h2>Total</h2></Col>
                <Col md={6}><h2>{cartItems.reduce((a,c) => (parseFloat(a) + parseFloat(c.price * c.qty)).toFixed(2), 0)} lei</h2></Col>
                <Col md={6}><h5>{cartItems.reduce((a,c) => parseFloat(a) + parseFloat(c.qty), 0)} produse</h5></Col>
            </Row>
        )
    
}

export default EsimatedTotal;