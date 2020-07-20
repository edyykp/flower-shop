import React, { Component } from 'react';
import {ListGroup} from 'react-bootstrap';
import data from '../data';
import { ProductCard } from './ProductCard';

export class ProductList extends Component {
    
    render() {
        
        return (
            <ListGroup horizontal style={{flexWrap:"wrap", justifyContent: "space-evenly"}}>
                {
                    data.products.map(product => 
                        <ProductCard name={product.name} image={product.image} price={product.price} id={product._id}/>
                        )
                }
            </ListGroup>
        )
    }
}