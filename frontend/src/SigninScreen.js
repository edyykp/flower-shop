import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { Form, Button, Card, Nav } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from './actions/userActions';

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
        z-index: 3;
        overflow: hidden;
    }

    .card-body {
        width: 100%;
        display: inline;
        justify-content: center;
        align-items: center;
    }
}
`;
export const SigninScreen = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const userSignin = useSelector(state=> state.userSignin);
    const {loading, userInfo, error } = userSignin;

    const dispatch = useDispatch();

    useEffect(() => {
        if(userInfo) {
            console.log("Cf");
            props.history.push("/");
        }
        return () => {

        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password, remember));
    }
    return (
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingTop:"40px", paddingBottom:"82px"}}>
            <Styles>
                <Card>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="/signin">
                            <Nav.Item>
                                <Nav.Link href="/signin" className="nav-link">Autentificare</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/signup" className="nav-link">Înregistrare</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title >
                            <PersonCircle size={100} color="lightgrey" style={{display:"block", marginLeft:"auto", marginRight:"auto"}}/>
                        </Card.Title>
                        <Card.Text>
                            {loading && <div>Loading..</div>}
                            {error && <div>{error}</div>}
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Adresă de email</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Parolă</Form.Label>
                                <Form.Control type="password" placeholder="Parolă" onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" onChange={(e) => setRemember(e.target.checked)}/>
                            </Form.Group>
                            <Button type="submit" style={{width: "100%", height:"50px", backgroundColor:"purple", color:"lightgrey", borderColor:"purple", fontSize:"20px"}}>
                                <strong>Autentifică-te</strong>
                            </Button>
                        </Form>
                        </Card.Text>
                        <Button variant="link">
                            Ați uitat parola?
                        </Button>
                    </Card.Body>
                </Card>
            </Styles>

        </Layout>
    )
}