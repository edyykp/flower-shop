import React, { useState, useEffect } from 'react';
import {ListGroup} from 'react-bootstrap';
import { ProductCard } from './ProductCard';
import axios from 'axios';





export function ProductList(props) {
    
    const [products, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get("/api/products");
            setProduct(data);
        }
        fetchData();
        return() => {
    
        };
    }, [])
        
    return (
        <ListGroup horizontal style={{flexWrap:"wrap", justifyContent: "space-evenly"}}>
            {
                products.map(product => 
                    <ProductCard name={product.name} image={product.image} price={product.price} id={product._id} key={product._id}/>
                    )
            }
        </ListGroup>
    )
}
