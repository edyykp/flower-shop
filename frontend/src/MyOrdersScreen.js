import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import {  Button, Card, Spinner, Row, Col, Table } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from './actions/orderActions';

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
export const MyOrdersScreen = () => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();

    const myOrderList = useSelector(state => state.myOrderList);
    const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

    useEffect(() => {
        if (userInfo) {
            dispatch(listMyOrders());
        }
        
        return () => {
    
        };
      }, [userInfo, dispatch])

      const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
      
        window.addEventListener('resize', handleResize)
    });
    return (
        loadingOrders ?
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", height:"100vh",justifyContent:"center"}}>
                <Spinner animation="border" variant="secondary" style={{position:"absolute", top:"50%", left: "50%"}}/>
        </Layout> : 
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingTop:"40px", paddingBottom:"82px"}}>
            <Styles>
                <Button variant="link" style={{color:"lightgrey", marginTop:"50px", textDecoration:"none"}} size="lg" href="/accountprofile">Contul meu</Button>
                <Button variant="link" style={{color:"white", marginTop:"50px", textDecoration:"none"}} size="lg" href="/orders">Comenzile mele</Button>
                <Card style={{width: "100%", marginTop: "50px", marginLeft: "auto", marginRight: "auto", marginBottom: "50px", fontFamily: "Arial", zIndex: 2, overflow: "hidden"}}>
                    <Card.Body style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
                        {errorOrders && <div style={{color:"black", fontWeight:"bold", textAlign:"center", border:"2px solid red", backgroundColor:"#DA7E7E"}}>A apărut o eroare neașteptată. Încearcă din nou mai târziu.</div>}
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATA PLASĂRII</th>
                                    <th>TOTAL</th>
                                    <th>DATA ȘI ORA LIVRĂRII</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 && <tr><td>Nu ați plasat nicio comandă recent.</td></tr>}
                                {orders.map(order => 
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                <td>{order.createdAt.split('.')[0].split('T')[0]}{', '}{order.createdAt.split('.')[0].split('T')[1]}</td>
                                        <td>{order.totalPrice} LEI</td>
                                        <td>{order.date}{', '}{order.hour}</td>
                                        {order.state === 0 ? <td>Nelivrat</td> : order.state === 1 ? <td>În curs de livrare</td> : <td>Livrat</td>}
                                    </tr>)}
                            </tbody>
                        </Table>
                        
                        
                        
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