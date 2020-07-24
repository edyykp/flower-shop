import React, {useState} from 'react';
import {ListGroup, Card, Button, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {ShoppingCart} from './ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';

export const ProductCard = ({product}) => {

    const [hover, setHover] = useState(false);
    const handleFalseHover = () => setHover(false);
    const handleTrueHover = () => setHover(true);
    
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

        const {cartItems} = cart;

        return (
            <ListGroup.Item style={{borderStyle:"none"}}>  
                        <Card style={{ width: '18rem' }}>
                            <Link to={"/productdetails/" + product._id} style={{overflow:"hidden"}}>
                                <Card.Img 
                                variant="top" 
                                src={`/assets/${product.image}.png`} 
                                style={{objectFit:"cover", width:"100%", height:"15vw", transform: `${hover ? "scale(1.5)" : "scale(1)"}`, transition: "1s"}}
                                onMouseOver={handleTrueHover}
                                onMouseOut={handleFalseHover}
                                />
                            </Link>
                            <Card.Body>
                                <Link to={"/productdetails/" + product._id} style={{overflow:"hidden"}}>        
                                <Card.Title style={{color: "black"}}>{product.name}</Card.Title>
                                </Link>
                                <Card.Text style={{color: "grey"}}>
                                {product.price} lei
                                </Card.Text>
                                <Button variant="primary" onClick={() => { dispatch(addToCart(product._id, 1, ""));setTimeout(() => {  handleShow(); }, 200);}}>Adaugă în coș</Button>
                            </Card.Body>
                        </Card>
                        <Modal
                                show={show}
                                backdrop="static"
                                keyboard={false}
                        >
                                <Modal.Header closeButton>
                                    <Modal.Title>Coș de cumpărături</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ShoppingCart />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        CONTINUĂ CUMPĂRĂTURILE
                                    </Button>
                                    <Button variant="primary" href="/shipping" disabled={cartItems.length === 0}>FINALIZEAZĂ COMANDA</Button>
                                </Modal.Footer>
                        </Modal>         
            </ListGroup.Item>
        )
    
}
