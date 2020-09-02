import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {ListGroup, Row, Col, Form, FormGroup, Button} from 'react-bootstrap';
import {Layout} from './components/Layout';
import { ReCaptcha } from 'react-recaptcha-google';
import { useDispatch } from 'react-redux';
import { contactEmail } from './actions/userActions';
import Axios from 'axios';
import {notify} from 'react-notify-toast';

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

export const Contact = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isHuman, setIsHuman] = useState(false);
    let captchaDemo;

    const dispatch = useDispatch();

    useEffect(() => {
        if (captchaDemo) {
            console.log("started, just a second...")
            captchaDemo.reset();
        }
        return () => {
          //
        };
      }, [captchaDemo]);
    
    const onLoadRecaptcha = () => {
          if (captchaDemo) {
              captchaDemo.reset();
          }
    }  
    const verifyCallback = (recaptchaToken) => {
        Axios.post('/api/recaptcha', {recaptchaToken}).then(async (response) => {
            if(response.data === "success"){
                await setIsHuman(true);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isHuman === true) {
            dispatch(contactEmail({name,email,phone,subject,message}));
            notify.show("Mesajul a fost trimis");
        }
        else {
            notify.show("Recaptcha greșit");
        }
    }
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
      
        window.addEventListener('resize', handleResize)
    });

        return (
            <Styles>
                <Layout style={{width: "100%",paddingTop:"40px", maxWidth: "100%", backgroundColor: "#A071A9", paddingLeft: "10px", paddingRight:"20px", paddingBottom: "50px", marginBottom: "0px", height: "100%", maxHeight: "100%"}}>
                    <div style={{paddingTop: "40px"}}>
                        {width > 700 ?
                        <Row>
                        <Col >
                            <h2 style={{color:"white"}}>Contactează-ne</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label style={{color:"#F0F0F0"}}>Nume și prenume</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setName(e.target.value)} required maxLength={70}/>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formBasicEmail">
                                        <Form.Label style={{color:"#F0F0F0"}}>Adresă de email</Form.Label>
                                        <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required maxLength={50}/>
                                        <Form.Text className="text-muted" >
                                            Adresa ta este în siguranță cu noi
                                        </Form.Text>
                                    </Form.Group>
                                    <FormGroup as={Col}>
                                        <Form.Label style={{color:"#F0F0F0"}}>Număr de telefon</Form.Label>
                                        <Form.Control type="tel" placeholder="+40 (722) 222 222" onChange={(e) => setPhone(e.target.value)} required maxLength={15}/>
                                    </FormGroup>
                                </Form.Row>
                                <Form.Group>
                                    <Form.Label style={{color:"#F0F0F0"}}>Subiect</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setSubject(e.target.value)} required maxLength={20}/>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label style={{color:"#F0F0F0"}}>Mesaj</Form.Label>
                                    <Form.Control as="textarea" rows={10} style={{resize: "none"}} onChange={(e) => setMessage(e.target.value)} required maxLength={500}/>
                                </Form.Group>
                                <Button variant="primary" type="submit" >TRIMITE MESAJ</Button>
                            </Form>
                            <ReCaptcha
                                ref={(el) => captchaDemo = el}
                                size="normal"
                                data-theme="dark"            
                                render="explicit"
                                sitekey="6Le2fb8ZAAAAALoTSgIeXmaLap1s2M3TyFTAlyET"
                                onloadCallback={onLoadRecaptcha}
                                verifyCallback={verifyCallback}
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
                                        <p>1. Florărie în Shopping City Buzău</p>
                                        <p>2. Florărie în Shopping City Buzău</p>
                                        <p>3. Florărie str. George Emil Palade, vizavi de Piața Daciei, Buzău</p>
                                        <p>4. Florărie str. Sfântul Sava Gotul (Pomul Verde), Buzău</p>
                                    </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row> 
                    :
                    <Col>
                    <Row >
                        <h2 style={{color:"white"}}>Contactează-ne</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label style={{color:"#F0F0F0"}}>Nume și prenume</Form.Label>
                                <Form.Control type="text" onChange={(e) => setName(e.target.value)} required maxLength={70}/>
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formBasicEmail">
                                    <Form.Label style={{color:"#F0F0F0"}}>Adresă de email</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required maxLength={50}/>
                                    <Form.Text className="text-muted" >
                                        Adresa ta este în siguranță cu noi
                                    </Form.Text>
                                </Form.Group>
                                <FormGroup as={Col}>
                                    <Form.Label style={{color:"#F0F0F0"}}>Număr de telefon</Form.Label>
                                    <Form.Control type="tel" placeholder="+40 (722) 222 222" onChange={(e) => setPhone(e.target.value)} required maxLength={15}/>
                                </FormGroup>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label style={{color:"#F0F0F0"}}>Subiect</Form.Label>
                                <Form.Control type="text" onChange={(e) => setSubject(e.target.value)} required maxLength={20}/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label style={{color:"#F0F0F0"}}>Mesaj</Form.Label>
                                <Form.Control as="textarea" rows={10} style={{resize: "none"}} onChange={(e) => setMessage(e.target.value)} required maxLength={500}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" >TRIMITE MESAJ</Button>
                        </Form>
                        <ReCaptcha
                            ref={(el) => captchaDemo = el}
                            size="normal"
                            data-theme="dark"            
                            render="explicit"
                            sitekey="6Le2fb8ZAAAAALoTSgIeXmaLap1s2M3TyFTAlyET"
                            onloadCallback={onLoadRecaptcha}
                            verifyCallback={verifyCallback}
                        />
                    </Row>
                    <Row>
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
                    </Row>
                </Col> 
                    }
                        
                    </div>
                </Layout>
            </Styles>
        )
    
}