import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Form, Button, Card, Spinner} from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { forgotEmail } from './actions/userActions';
import { notify } from 'react-notify-toast';

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
export const ForgotScreen = props => {

    const [validated, setValidated] = useState(false);

    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const userForgot = useSelector(state=> state.userForgot);
    const {loading, success } = userForgot;

    useEffect(() => {
        if(success) {
            notify.show("Un mail de resetare a fost trimis");
        }
        return () => {

        };
    }, [success]);

    const submitHandler = (e) => {
        e.preventDefault();
        setValidated(true);
        dispatch(forgotEmail(email));
    }
    return (
        loading ? 
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", height:"100vh",justifyContent:"center"}}>
                <Spinner animation="border" variant="secondary" style={{position:"absolute", top:"50%", left: "50%"}}/>
        </Layout> 
        :
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingTop:"100px", paddingBottom:"110px", height:"80vh"}}>
            <Styles>
                <Card>
                    <Card.Header>
                        <h2>Introdu adresa de email</h2>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={submitHandler} noValidate validated={validated}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Adresă de email</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required maxLength={50}/>
                            </Form.Group>
                            <Button type="submit" style={{width: "100%", height:"50px", backgroundColor:"purple", color:"lightgrey", borderColor:"purple", fontSize:"20px"}}>
                                <strong>Trimite mail</strong>
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Styles>

        </Layout>
    )
}