import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Form, Button, Card, Spinner} from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector} from 'react-redux';
import { resetEmail } from './actions/userActions';
import { useHistory } from 'react-router';

const Styles = styled.div`

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
export const ResetScreen = props => {

    const [password, setPass] = useState('');
    const [error,setError] = useState('');
    const [repass, setRePass] = useState('');

    const dispatch = useDispatch();
    const resetLink = window.location.pathname.split('/reset/')[1];

    const userReset = useSelector(state=> state.userReset);
    const {loading, success } = userReset;
    const history = useHistory();

    useEffect(() => {
        if(success) {
            history.push('/');
        }
        return () => {

        };
    }, [success, history]);

    const submitHandler = (e) => {
        if(password !== repass) {
            setError("Parolele nu coincid.");
            e.preventDefault();

        }
        else if(password.length < 8) {
            setError("Parola este prea scurtă.");
            e.preventDefault();

        }
        else{
            dispatch(resetEmail({password, resetLink}));
            e.preventDefault();
            setError("");
        }
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
                        <h2>Resetează parola</h2>
                    </Card.Header>
                    <Card.Body>
                        {error !== "" && <div style={{color:"black", fontWeight:"bold", textAlign:"center", border:"2px solid red", backgroundColor:"#DA7E7E"}}>{error}</div>}
                        <Form onSubmit={submitHandler} >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Parolă nouă</Form.Label>
                                <Form.Control type="password"  onChange={(e) => setPass(e.target.value)} required maxLength={30}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Confirmă parolă nouă</Form.Label>
                                <Form.Control type="password"  onChange={(e) => setRePass(e.target.value)} required maxLength={30}/>
                            </Form.Group>
                            <Button type="submit" style={{width: "100%", height:"50px", backgroundColor:"purple", color:"lightgrey", borderColor:"purple", fontSize:"20px"}}>
                                <strong>Schimbă parola</strong>
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Styles>

        </Layout>
    )
}