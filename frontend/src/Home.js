import React from 'react';
import {ListGroup, Row, Col, OverlayTrigger, Popover, Card} from 'react-bootstrap';
import styled from 'styled-components';
import {Truck, ShieldCheck, Check2Circle, Gift, CashStack} from 'react-bootstrap-icons'; 
import {Jumbotron} from './components/Jumbotron';
import {Layout} from './components/Layout';

const Styles = styled.div`
    .list-group-item {
        .par {
            color: grey;
        }
        &: hover {
            .icon {
                fill: red;
            }

            .par {
                color: red;
            }
        }
    }
`;
var styles = {
    item: {
        width:"20%",
        textAlign: "center", 
        paddingRight: "0", 
        paddingLeft: "0"
    }
};
const popoverPlatiSecurizate = (
    <Popover id="popover-basic">
      <Popover.Title as="h3" style={{color:"black"}}>Plăți Securizate</Popover.Title>
      <Popover.Content>
        Prin diverse metode de plată online și utilizarea unui protocol HTTPS, păstrăm datele dumneavoastră personale în siguranță.
      </Popover.Content>
    </Popover>
  );

const popoverLivrareInOre = (
    <Popover id="popover-basic">
      <Popover.Title as="h3" style={{color:"black"}}>Livrare în 4 ore</Popover.Title>
      <Popover.Content>
        Livrare rapidă a produselor comandate oriunde în Buzău.
      </Popover.Content>
    </Popover>
  );

const popoverLivrareGratuita = (
    <Popover id="popover-basic">
      <Popover.Title as="h3" style={{color:"black"}}>Livrare Gratuită</Popover.Title>
      <Popover.Content>
        Livrarea este gratuită în Buzău.
      </Popover.Content>
    </Popover>
  );

const popoverGarantie = (
    <Popover id="popover-basic">
      <Popover.Title as="h3" style={{color:"black"}}>100% Discreție și Garanție</Popover.Title>
      <Popover.Content>
        Garantăm satisfacție pentru produsele ce vor ajunge în siguranță la dumneavoastră.
      </Popover.Content>
    </Popover>
  );

const popoverCadouri = (
    <Popover id="popover-basic">
      <Popover.Title as="h3" style={{color:"black"}}>Felicitare Cadou</Popover.Title>
      <Popover.Content>
        La orice buchet, oferim și o felicitare cadou. Completați mesajul dorit la pasul următor.
      </Popover.Content>
    </Popover>
  );
export const Home = () => (
        <Styles>
            <Jumbotron/>
            <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)",width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingLeft: "100px", paddingRight:"100px", paddingBottom: "50px", marginBottom: "0px", height: "100%", maxHeight: "100%"}}>
                <Row >
                    <Col style={{maxWidth:"100%", width: "100%", justifyContent:"center", paddingRight: "0", paddingLeft: "0"}}>
                        <ListGroup horizontal>
                            <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverPlatiSecurizate}>
                                    <ListGroup.Item style={styles.item} className="list-group-item">
                                            <ShieldCheck size={40} color="grey" style={{paddingBottom:"10px"}} className="icon"/>
                                            <p style={{fontSize: "16px"}} className="par">
                                                PLĂȚI SECURIZATE
                                            </p>
                                    </ListGroup.Item>
                            </OverlayTrigger>
                            <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverLivrareInOre}>
                                <ListGroup.Item style={styles.item} className="list-group-item">
                                    <Truck size={40} color="grey" style={{paddingBottom:"10px"}} className="icon"/>
                                    <p style={{fontSize: "16px"}} className="par">LIVRARE ÎN 4 ORE</p>
                                </ListGroup.Item>
                            </OverlayTrigger>
                            <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverLivrareGratuita}>
                                <ListGroup.Item style={styles.item} className="list-group-item">
                                    <CashStack size={40} color="grey" style={{paddingBottom:"10px"}} className="icon"/>
                                    <p style={{fontSize: "16px"}} className="par">LIVRARE GRATUITĂ</p>
                                </ListGroup.Item>
                            </OverlayTrigger>
                            <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverGarantie}>
                                <ListGroup.Item style={styles.item} className="list-group-item">
                                    <Check2Circle size={40} color="grey" style={{paddingBottom:"10px"}} className="icon"/>
                                    <p style={{fontSize: "16px"}} className="par">100% DISCREȚIE ȘI GARANȚIE</p>
                                </ListGroup.Item>
                            </OverlayTrigger>
                            <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverCadouri}>
                                <ListGroup.Item style={styles.item} className="list-group-item">
                                    <Gift size={40} color="grey" style={{paddingBottom:"10px"}} className="icon"/>
                                    <p style={{fontSize: "16px"}} className="par">FELICITARE CADOU</p>
                                </ListGroup.Item> 
                            </OverlayTrigger>
                        </ListGroup>
                    </Col>
                    
                </Row>
                <br/>
                <br/>
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
                </Row>
            </Layout>
        </Styles>
)