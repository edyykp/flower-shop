import React, {Component} from 'react';
import styled from 'styled-components';
import {ListGroup, Row, Col, Form, FormGroup, Button} from 'react-bootstrap';
import {Layout} from './components/Layout';
import { ReCaptcha } from 'react-recaptcha-google';

const Styles = styled.div`
    .list-group {
        backgroundColor: #A071A9;
    }

    .list-group .list-group-item {
        backgroundColor: #A071A9;
    }
`;

var styles = {
    item: {
        backgroundColor: "#A071A9",
        color: "white",
        borderColor: "white"
    }
}

export class Contact extends Component {
    constructor(props, context) {
        super(props, context);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            phone: ''
          }
          this.changeNameState = this.changeNameState.bind(this);
          this.changeEmailState = this.changeEmailState.bind(this);
          this.changeSubjectState = this.changeSubjectState.bind(this);
          this.changePhoneState = this.changePhoneState.bind(this);
          this.changeMessageState = this.changeMessageState.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        if (this.captchaDemo) {
            console.log("started, just a second...")
            this.captchaDemo.reset();
        }
    }  
    
    onLoadRecaptcha() {
          if (this.captchaDemo) {
              this.captchaDemo.reset();
          }
    }  
    
    verifyCallback(recaptchaToken) {
        // Here you will get the final recaptchaToken!!!  
        console.log(recaptchaToken, "<= your recaptcha token")
    }

    handleSubmit() {
        console.log(this.state);
    }

    changeNameState(event) {
        this.setState({name: event.target.value});

    }

    changeEmailState(event) {
        this.setState({email: event.target.value});
    }
    
    changePhoneState(event) {
        this.setState({phone: event.target.value});
    }

    changeSubjectState(event) {
        this.setState({subject: event.target.value});
    }

    changeMessageState(event) {
        this.setState({message: event.target.value});
    }

    render() {
        return (
            <Styles>
                <Layout style={{width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingLeft: "100px", paddingRight:"100px", paddingBottom: "50px", marginBottom: "0px", height: "100%", maxHeight: "100%"}}>
                    <div style={{paddingTop: "40px"}}>
                        <Row>
                            <Col>
                                <h2 style={{color:"white"}}>Contactează-ne</h2>
                                <Form>
                                    <Form.Group>
                                        <Form.Label style={{color:"#F0F0F0"}}>Nume și prenume</Form.Label>
                                        <Form.Control type="text" onChange={this.changeNameState} value={this.state.name}/>
                                    </Form.Group>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formBasicEmail">
                                            <Form.Label style={{color:"#F0F0F0"}}>Adresă de email</Form.Label>
                                            <Form.Control type="email" placeholder="name@example.com" onChange={this.changeEmailState}/>
                                            <Form.Text className="text-muted" >
                                                Adresa ta este în siguranță cu noi
                                            </Form.Text>
                                        </Form.Group>
                                        <FormGroup as={Col}>
                                            <Form.Label style={{color:"#F0F0F0"}}>Număr de telefon</Form.Label>
                                            <Form.Control type="tel" placeholder="+40 (722) 222 222" onChange={this.changePhoneState}/>
                                        </FormGroup>
                                    </Form.Row>
                                    <Form.Group>
                                        <Form.Label style={{color:"#F0F0F0"}}>Subiect</Form.Label>
                                        <Form.Control type="text" onChange={this.changeSubjectState}/>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label style={{color:"#F0F0F0"}}>Mesaj</Form.Label>
                                        <Form.Control as="textarea" rows={10} style={{resize: "none"}} onChange={this.changeMessageState}/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>TRIMITE MESAJ</Button>
                                </Form>
                                <ReCaptcha
                                    ref={(el) => {this.captchaDemo = el;}}
                                    size="normal"
                                    data-theme="dark"            
                                    render="explicit"
                                    sitekey="6LeO17IZAAAAAPgcOezijZ52srk6dS_fwhchPxRZ"
                                    onloadCallback={this.onLoadRecaptcha}
                                    verifyCallback={this.verifyCallback}
                                />
                            </Col>
                            <Col>
                                <ListGroup variant="flush" className="list-group">
                                        <ListGroup.Item className="list-group-item" style={styles.item}>
                                        <p><strong>Tel: </strong>+40 (784) 284 243</p>
                                        <p><strong>SMS: </strong>+40 (784) 284 243</p>
                                        <p><strong>Whatsapp: </strong>+40 (784) 284 243</p>
                                        <p><strong>Email: </strong>comenzi@florariebuzau.ro</p>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="list-group-item" style={styles.item}>
                                            <strong><h5>Program florării Shopping City Buzău:</h5></strong>
                                            <p>Luni - duminică: 10:00 - 22:00</p>
                                            <strong><h5>Program florărie George Emil Palade:</h5></strong>
                                            <p>Luni - Sâmbătă: 8:00 - 20:00</p>
                                            <p>Dumincă: 8:00 - 14:00</p>
                                            <strong><h5>Program florărie Pomul Verde:</h5></strong>
                                            <p>Luni - Sâmbătă: 8:00 - 20:00</p>
                                            <p>Dumincă: 8:00 - 14:00</p>
                                            <strong><h5>Program livrări:</h5></strong>
                                            <p>Luni-sâmbătă: 10:00 - 19:00</p>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="list-group-item" style={styles.item}>
                                            <strong><h3>Locațiile florăriilor:</h3></strong>
                                            <p>1. Florârie în Shopping City Buzău</p>
                                            <p>2. Florărie în Shopping City Buzău</p>
                                            <p>3. Florărie str. George Emil Palade, vizavi de Piața Daciei, Buzău</p>
                                            <p>4. Florărie str. Sfântul Sava Gotul (Pomul Verde), Buzău</p>
                                        </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </div>
                </Layout>
            </Styles>
        )
    }
    
}