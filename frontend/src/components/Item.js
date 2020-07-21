import React from 'react';
import {Image, Media, Button, Col, Row} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../actions/cartActions';

const Item = ({item}) => {
    var currentQty;

    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    return (
        <Media >
                                    <Image width={100}
                                        height={100}
                                        className="mr-3"
                                        alt="thumbnail"
                                        src={`/assets/${item.image}.png`}/>
                                    <Media.Body>
                                        <p>{item.name}</p>
                                        <Row>
                                            <Col md={6}>
                                                <strong> {`${item.price*item.qty} lei`}</strong>
                                                <br />
                                                <Button variant="link"
                                                        onClick={() =>  removeFromCartHandler(item.product)}
                                                >Șterge</Button>
                                            </Col>
                                            <Col md={6} style={{display:"inline"}}> Cantitate:
                                                <br/>
                                                <input 
                                                    type="number" defaultValue={item.qty} 
                                                    min={1} 
                                                    max={9} 
                                                    style={{padding: "5px", textAlign: "center", width:" 48px", height: "40px"}}
                                                    ref={(c) => currentQty = c}
                                                />
                                                <Button variant="danger" size="sm" onClick={ (e) => dispatch(addToCart(item.product, currentQty.value))}>Modifică</Button>
                                            </Col>
                                        </Row>
                                    </Media.Body>
                                </Media>
    )
}

export default Item;