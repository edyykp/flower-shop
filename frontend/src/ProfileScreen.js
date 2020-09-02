import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { Form, Button, Card, Spinner, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updatePass, updateUser } from './actions/userActions';

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


    
}
`;
export const ProfileScreen = props => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [cui, setCui] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");

    const dispatch = useDispatch();

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: loadingUserUpdate} = userUpdate;

    const passwordUpdate = useSelector(state => state.passwordUpdate);
    const {loading: loadingPassUpdate} = passwordUpdate;

    const [errorSubmit, setErrorSubmit] = useState("");
    const [errorPass, setErrorPass] = useState("");

    const submitProfile = (e) => {
        if(email !== "" && firstName !== "" && lastName !== ""){
            dispatch(updateUser({ userId: userInfo._id, email, firstName, lastName, phone, address, companyName, cui }));
            setErrorSubmit("");
        }
        else {
            setErrorSubmit("Completează toate câmpurile obligatorii.");
            e.preventDefault();
            e.stopPropagation();
        }
    }

    const changePassword = (e) => {
        if(oldPassword !== userInfo.password) {
            setErrorPass("Parola veche este greșită.");
            e.preventDefault();
            e.stopPropagation();
        }
        else if(newPassword !== reNewPassword) {
            setErrorPass("Parolele nu coincid.");
            e.preventDefault();
            e.stopPropagation();
        } else if(newPassword.length < 8 ) {
            setErrorPass("Parola nouă este prea scurtă.");
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            dispatch(updatePass({ userId: userInfo._id, newPassword }));
            setErrorPass("");
        }       
    }
    useEffect(() => {
        if(userInfo) {
            setEmail(userInfo.email);
            setPhone(userInfo.phone);
            setAddress(userInfo.address);
            setFirstName(userInfo.firstName);
            setLastName(userInfo.lastName);
            setCompanyName(userInfo.companyName);
            setCui(userInfo.cui);
        }
      }, [userInfo]);

      const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
      
        window.addEventListener('resize', handleResize)
    });

    return (
        (loadingUserUpdate || loadingPassUpdate) ?
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", height:"100vh",justifyContent:"center"}}>
                <Spinner animation="border" variant="secondary" style={{position:"absolute", top:"50%", left: "50%"}}/>
        </Layout> : 
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingTop:"40px", paddingBottom:"82px"}}>
            <Styles>
                <Button variant="link" style={{color:"white", marginTop:"50px", textDecoration:"none"}} size="lg" href="/accountprofile">Contul meu</Button>
                <Button variant="link" style={{color:"lightgrey", marginTop:"50px", textDecoration:"none"}} size="lg" href="/orders">Comenzile mele</Button>
                <Card style={{width: "100%", marginTop: "50px", marginLeft: "auto", marginRight: "auto", marginBottom: "50px", fontFamily: "Arial", zIndex: 2, overflow: "hidden"}}>
                    <Card.Body style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
                        
                        <Row>
                            <Col>
                                <Card.Title><h2>Detalii despre cont</h2></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted"><h4>Editează profilul</h4></Card.Subtitle>
                                <Form onSubmit={submitProfile} noValidate >
                                    {errorSubmit && <div style={{color:"black", fontWeight:"bold", textAlign:"center", border:"2px solid red", backgroundColor:"#DA7E7E"}}>{errorSubmit}</div>}
                                    <Form.Group >
                                        <Form.Label>Prenume*</Form.Label>
                                        <Form.Control type="text" defaultValue={userInfo.firstName} required onChange={(e) => setFirstName(e.target.value)} maxLength={20}/>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Nume*</Form.Label>
                                        <Form.Control type="text" defaultValue={userInfo.lastName} required onChange={(e) => setLastName(e.target.value)} maxLength={20}/>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Email*</Form.Label>
                                        <Form.Control type="email" defaultValue={userInfo.email} required onChange={(e) => setEmail(e.target.value)} maxLength={50}/>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Telefon</Form.Label>
                                        <Form.Control type="text" defaultValue={userInfo.phone} onChange={(e) => setPhone(e.target.value)} maxLength={15}/>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Adresă</Form.Label>
                                        <Form.Control as="textarea" rows={5} style={{resize:"none"}} defaultValue={userInfo.address} onChange={(e) => setAddress(e.target.value)} maxLength={400}/>
                                    </Form.Group>
                                    <Card.Title><h4>Detalii firmă</h4></Card.Title>
                                    <Form.Group >
                                        <Form.Label>Denumire firmă</Form.Label>
                                        <Form.Control type="text" defaultValue={userInfo.companyName} onChange={(e) => setCompanyName(e.target.value)} maxLength={200}/>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Cod Unic de Înregistrare</Form.Label>
                                        <Form.Control type="text" defaultValue={userInfo.cui} onChange={(e) => setCui(e.target.value)} maxLength={100}/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Editează profilul</Button>
                                </Form>
                                
                            </Col>
                            <Col>
                                <Card.Title><h3>Schimbă parola</h3></Card.Title>
                                <Form onSubmit={changePassword} noValidate >
                                    <Form.Group >
    {                                   errorPass && <div style={{color:"black", fontWeight:"bold", textAlign:"center", border:"2px solid red", backgroundColor:"#DA7E7E"}}>{errorPass}</div> }
                                        <Form.Label>Parolă veche</Form.Label>
                                        <Form.Control type="password" onChange={(e) => setOldPassword(e.target.value)} maxLength={30}/>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Parolă nouă</Form.Label>
                                        <Form.Control type="password" onChange={(e) => setNewPassword(e.target.value)} maxLength={30}/>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Confirmă parola nouă</Form.Label>
                                        <Form.Control type="password" onChange={(e) => setReNewPassword(e.target.value)} maxLength={30}/>
                                    </Form.Group>
                                    <Button variant="danger" type="submit">Schimbă parola</Button>
                                </Form>
                            </Col>
                        </Row>
                        
                        
                        
                    </Card.Body>
                </Card>
                { width > 800 ?
                <Row style={{marginBottom: "0", height: "100%", maxHeight: "100%"}}>
                    <Col>
                        <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Title>Livrări aranjamente de flori</Card.Title>
                            <Card.Text>
                            Serviciul de livrat flori la domiciliu al Florăriei Medeea este gratuit în 
                            orașul Buzău și zonele limitrofe acestuia, fără taxe sau comisioane. Pentru o comandă în afara
                            orașului, costul de livrare diferă în funcție de distanță. Beneficiem de curieri proprii, livrând florile
                            în apă pentru a 
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Title>De ce Florăria Medeea?</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Title>Unde ne puteți găsi?</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Col>
                </Row> :
                <Col>
                    <Row style={{marginBottom:"10px"}}>
                    <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Title>Livrări aranjamente de flori</Card.Title>
                            <Card.Text>
                            Serviciul de livrat flori la domiciliu al Florăriei Medeea este gratuit în 
                            orașul Buzău și zonele limitrofe acestuia, fără taxe sau comisioane. Pentru o comandă în afara
                            orașului, costul de livrare diferă în funcție de distanță. Beneficiem de curieri proprii, livrând florile
                            în apă pentru a 
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Row>
                    <Row style={{marginBottom:"10px"}}>
                    <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Title>De ce Florăria Medeea?</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Row>
                    <Row>
                    <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Title>Unde ne puteți găsi?</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Row>
                </Col>
                
}
            </Styles>
        </Layout>
    )
}