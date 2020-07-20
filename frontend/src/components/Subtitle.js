import React, {Component} from 'react';
import {Col, Button, Form, Row} from 'react-bootstrap';
import {Search} from 'react-bootstrap-icons';

export class Subtitle extends Component {
    render() {
        return (
            <Row>
                <Col style={{justifyContent: "left"}}>
                    <strong><h2>{`${this.props.title}`}</h2></strong>
                </Col>
                <Col style={{justifyContent: "right"}}>
                    <Form inline>
                        Preț de la:   
                        <Form.Control type="text" style={{width:"80px"}}/>
                        lei până la:  
                        <Form.Control type="text" style={{width:"80px"}}/>
                        lei
                        <Button variant="success" style={{marginLeft:"10px"}}>
                            <Search color="white" size={18} />
                        </Button>
                        <Form.Control as="select" style={{marginLeft: "5px"}} defaultValue="Recomandate">
                            <option>Preț crescător</option>
                            <option>Preț descrescător</option>
                            <option>Recomandate</option>
                            <option>Cele mai vândute</option>
                            <option>Ordine alfabetică(A-Z)</option>
                            <option>Ordine alfabetica(Z-A)</option>
                        </Form.Control>
                    </Form>
                </Col>
            </Row>
        )
    }
}