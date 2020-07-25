import React, { useEffect } from 'react';
import {ListGroup, Spinner, Pagination} from 'react-bootstrap';
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

    let active = 2;
    let items=[];
    for (let number = 1; number <= 5; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }
    return (
        loading? <Spinner animation="border" variant="secondary" style={{position:"absolute", top:"50%", left: "50%"}}/>
        :
        error? <div style={{position:"absolute", top:"50%", left: "50%"}}>{error}</div> :
        <div>
            <ListGroup horizontal style={{flexWrap:"wrap", justifyContent: "space-evenly"}}>
                {
                    products.map(product => 
                        <ProductCard product={product} key={product._id}/>
                        )
                }
            </ListGroup>
        </div>
            

    )
}
