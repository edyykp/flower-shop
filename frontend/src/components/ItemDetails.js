import React, {Component} from 'react';
import {Button, Collapse, Media, Row, Col, Image, Container} from 'react-bootstrap';
import styled from 'styled-components';
import QuantityInput from "./QuantityInput";

const Styles = styled.div`
    .container {
        background-color: #DCDBDB;
        border-style: solid;
        border-radius: 5px;
        border-color: #D1D1D1;
        padding: 10px;
    }
`;

export default class ItemDetails extends Component {
    constructor(props) {
        super(props);
        this.state= {
            open: false,
            quantity: 1
        };
    }
    
    changePrice(param) {
        this.setState({quantity: param});
    }
    
    removeProduct() {

    }

    render() {
        return(
            <Styles>
                <div>
                    <Button
                        variant="link"
                        onClick={() => this.setState({open: !this.state.open})}
                    >
                    { this.state.open === false ? `Arată` : `Ascunde`} detalii
                    { this.state.open === false ? ` +` : ` -`}
                    </Button>
                    <Collapse in={this.state.open}>
                        <Container className="container">
                                <Media >
                                    <Image width={100}
                                        height={100}
                                        className="mr-3"
                                        alt="thumbnail"
                                        src={require("../assets/mino.png")}/>
                                    <Media.Body>
                                        <p>Denumire produs</p>
                                        <Row>
                                            <Col md={6}>
                                                <strong> {`${this.props.price} lei`}</strong>
                                                <br />
                                                <Button variant="link"
                                                        onClick={this.removeProduct}
                                                >Șterge</Button>
                                            </Col>
                                            <Col md={6}> Cantitate:
                                            <QuantityInput quantity={this.state.quantity} changeHandler={this.changePrice.bind(this)}/></Col>
                                        </Row>
                                    </Media.Body>
                                </Media>
                                </Container>
                    </Collapse>
                </div>
            </Styles>
        )
    }
}