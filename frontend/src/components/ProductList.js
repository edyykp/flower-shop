import React, { useEffect } from 'react';
import {ListGroup, Spinner} from 'react-bootstrap';
import { ProductCard } from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { useLocation } from 'react-router';



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function ProductList() {
    let query= useQuery();

    const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();
    const searchKeyWord = query.get("category");
    const sortOrder = query.get("sortOrder");
    const minPrice = query.get("minPrice");
    const maxPrice = query.get("maxPrice");
    const category = window.location.pathname.split('/')[1];
    useEffect(() => {
        dispatch(listProducts(category, sortOrder, searchKeyWord, minPrice, maxPrice));
        return() => {
    
        };
    }, [dispatch, category, sortOrder, searchKeyWord, minPrice, maxPrice])

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
