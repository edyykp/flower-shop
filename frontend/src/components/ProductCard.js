import React, {Component} from 'react';
import {ListGroup, Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };
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
                                <Button variant="primary">Adaugă în coș</Button>
                            </Card.Body>
                        </Card>         
            </ListGroup.Item>
        )
    }
}