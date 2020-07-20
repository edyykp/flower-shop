import React, {Component} from 'react';
import {ListGroup, Card, Button, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {ShoppingCart} from './ShoppingCart';

export class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            show: false
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    render() {
        return (
            <ListGroup.Item style={{borderStyle:"none"}}>  
                        <Card style={{ width: '18rem' }}>
                            <Link to={"/productdetails/" + this.props.id} style={{overflow:"hidden"}}>
                                <Card.Img 
                                variant="top" 
                                src={require(`./../assets/${this.props.image}.png`)} 
                                style={{objectFit:"cover", width:"100%", height:"15vw", transform: `${this.state.hover ? "scale(1.5)" : "scale(1)"}`, transition: "1s"}}
                                onMouseOver={() => this.setState({hover: true})}
                                onMouseOut={() => this.setState({hover: false})}
                                />
                            </Link>
                            <Card.Body>
                                <Link to={"/productdetails/" + this.props.id} style={{overflow:"hidden"}}>        
                                <Card.Title style={{color: "black"}}>{this.props.name}</Card.Title>
                                </Link>
                                <Card.Text style={{color: "grey"}}>
                                {this.props.price} lei
                                </Card.Text>
                                <Button variant="primary" onClick={this.handleShow}>Adaugă în coș</Button>
                            </Card.Body>
                        </Card>
                        <Modal
                                show={this.state.show}
                                onHide={this.handleClose}
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
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        CONTINUĂ CUMPĂRĂTURILE
                                    </Button>
                                    <Button variant="primary">FINALIZEAZĂ COMANDA</Button>
                                </Modal.Footer>
                        </Modal>         
            </ListGroup.Item>
        )
    }
}