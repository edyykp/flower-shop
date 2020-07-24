import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Form, Button, Card, Nav, Tooltip, OverlayTrigger } from 'react-bootstrap';
import {  PersonPlus,  InfoCircleFill } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {register} from './actions/userActions';

const Styles = styled.div`
    .nav-item {
        width:50%;
    }

    .nav-link:not(.active) {
        color: purple !important;
    }

    .nav-link {
        display: flex;
        justify-content: center;
        color: black ;
    }

    .card {
        width: 40%;
        margin-top: 50px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: auto;
        font-family: Arial;
        z-index: 2;
    }

    .card-body {
        width: 100%;
        display: inline;
        justify-content: center;
        align-items: center;
    }
}
`;
export const SignupScreen = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [ phone, setPhone] = useState('');
    const userRegister = useSelector(state=> state.userRegister);
    const {loading, userInfo, error } = userRegister;

    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    useEffect(() => {
        if(userInfo) {
            props.history.push("/");
        }
        return () => {

        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        setValidated(true);
        if(e.target.checkValidity() === true) {
            dispatch(register(firstName, lastName, email, phone, password));
        }
    }
    const [validated, setValidated] = useState(false);
    return (
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingTop:"40px", paddingBottom:"40px"}}>
            <Styles>
                <Card>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey={redirect === "/" ? "/signup" : "/signup?redirect=" + redirect}>
                            <Nav.Item>
                                <Nav.Link href={redirect === "/" ? "/signin" : "/signin?redirect=" + redirect} className="nav-link">Autentificare</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href={redirect === "/" ? "/signup" : "/signup?redirect=" + redirect} className="nav-link">Înregistrare</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title >
                            <PersonPlus size={100} color="lightgrey" style={{display:"block", marginLeft:"auto", marginRight:"auto"}}/>
                        </Card.Title>
                            
                            
                        <Form onSubmit={submitHandler} noValidate validated={validated}>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Nume*</Form.Label>
                                <Form.Control type="text" onChange={(e) => setLastName(e.target.value)} required/>
                            </Form.Group>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Prenume*</Form.Label>
                                <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)} required/>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Adresă de email*</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required/>
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Număr de telefon</Form.Label>
                                <Form.Control type="text" onChange={(e) => setPhone(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword"  >
                                <Form.Label>Parolă*</Form.Label>
                                
                                <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                        <Tooltip id="tooltip-right">
                                            Parola trebuie să conțină puțin 8 caractere.
                                        </Tooltip>
                                    }
                                    >
                                    <InfoCircleFill size={25}  color="grey" style={{paddingLeft:"10px"}}/>
                                </OverlayTrigger>

                                <Form.Control type="password" placeholder="Parolă" required onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" >
                                <Form.Label>Confirmare parolă*</Form.Label>
                                <Form.Control type="password" required onChange={(e) => setRePassword(e.target.value)}/>
                            </Form.Group>
                            <p style={{color:"grey"}}>* - câmp obligatoriu</p>
                            <Button type="submit" style={{width: "100%", height:"50px", backgroundColor:"purple", color:"lightgrey", borderColor:"purple", fontSize:"20px"}}>
                                <strong>Înregistrează-te</strong>
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Styles>

        </Layout>
    )
}