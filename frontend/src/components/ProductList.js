import React, { useEffect } from 'react';
import {ListGroup} from 'react-bootstrap';
import { ProductCard } from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';





export function ProductList(props) {
    
    const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
        return() => {
    
        };
    }, [dispatch])
        
    return (
        loading? <div>Loading...</div> :
        error? <div>{error}</div> :
        <ListGroup horizontal style={{flexWrap:"wrap", justifyContent: "space-evenly"}}>
            {
                products.map(product => 
                    <ProductCard product={product} key={product._id}/>
                    )
            }
        </ListGroup>
    )
}
