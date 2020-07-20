import React from 'react';
import {Row, Col, Button, Container, Form, Card, Image, ListGroup, OverlayTrigger, Popover} from 'react-bootstrap';
import { Layout } from './Layout';
import data from '../data';
import styled from 'styled-components';
import {Truck, ShieldCheck, CashStack, Check2Circle, Gift} from 'react-bootstrap-icons';

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
   
    .img {
        &:hover {
            cursor: pointer;
            border: 2px solid white;
        }
    }
`;

const Style = styled.div`
.img {
   cursor: pointer;

    &:active {
        transform: scale(1.3);
        z-index: 1;
        position: sticky;
    }
    
}
`;
var styles = {
    item: {
        width:"20%",
        textAlign: "center", 
        paddingRight: "0", 
        paddingLeft: "0",
        paddingBottom: "0"
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

export class ProductDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transform: 2
        };
        this.product = data.products.find( x => x._id === this.props.match.params.id);
    }

    render() {
        return (
            <Layout style={{width: "100%", maxWidth: "100%", backgroundColor: "white", paddingLeft: "100px", paddingRight:"100px", paddingBottom: "50px", marginBottom: "0px", height: "100%", maxHeight: "100%"}}>
                <Row style={{marginTop: "50px", marginLeft: "40px", width: "100%", maxWidth:"100%"}}>
                    <Col>
                        <h2>{this.product.name}</h2>
                        <hr/>
                        <Container>
                            <Row style={{justifyContent:"space-between"}}>
                                <Col md={6} style={{justifyContent:"flex-start"}}>
                                    <strong>
                                        <p style={{color: "purple", fontSize:"30px"}}>{this.product.price} LEI
                                        
                                        </p>
                                    </strong>
                                </Col>
                                <Col style={{justifyContent:"flex-end"}} md={3}>
                                    <input type="number" min={1} max={9} style={{textAlign: "center", width: "48px", height: "40px"}} defaultValue={1}/>
                                    <Button variant="primary">Adaugă în coș</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width:"100%"}}>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label style={{font:"Helvetica", fontSize:"25px", color:"#808080"}}>Mesaj pentru felicitare cadou:</Form.Label>
                                    <Form.Control as="textarea" rows={5} style={{resize: "none", width:"100%"}} placeholder="Text felicitare"/>
                                </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                        <hr/>
                        <Container>
                            <Row>
                                <h4>Descriere {this.product.name}</h4>
                                <br />
                                <p style={{color: "grey"}}>{this.product.description}</p>
                                <br />
                                <h6>Alcătuit din:</h6>
                                <p style={{color:"grey"}}>{this.product.composition}</p>
                            </Row>
                            
                        </Container>
                    </Col>
                    <Col>
                    
                        <Container>
                            <Row style={{marginBottom: "20px", justifyContent:"space-between"}}>
                                <Col style={{justifyContent:"flex-start"}}>
                                    <Style style={{overflow:"hidden"}}>
                                        <Image 
                                        src={require(`./../assets/${this.product.image}.png`)} 
                                        style={{width: "30vw", height:"25vw", objectFit:"cover", transform: `scale(${this.state.transform})`}}
                                        className="img"
                                        />
                                    </Style>
                                </Col>
                                <Styles style={{ display: "flex"}}>
                                    <Col style={{justifyContent:"space-between", flexDirection: "column", display: "flex"}}>
                                        
                                            <Row style={{justifyContent:"flex-end", overflow:"hidden"}}>
                                                <Image 
                                                src={require(`./../assets/${this.product.image}.png`)} 
                                                style={{width: "12vw", height:"8vw", objectFit:"cover"}} 
                                                className="img"
                                                onClick={() => this.setState({transform: 1})}
                                                />
                                            </Row>
                                            <Row style={{justifyContent:"flex-end", overflow:"hidden"}}>
                                                <Image 
                                                src={require(`./../assets/${this.product.image}.png`)} 
                                                style={{width: "12vw", height:"8vw", transform: "scale(1.5)", objectFit:"cover"}} 
                                                className="img"
                                                onClick={() => this.setState({transform: 1.5})}
                                                />
                                            </Row>
                                            <Row style={{justifyContent: "flex-end", overflow:"hidden"}}>
                                                <Image 
                                                src={require(`./../assets/${this.product.image}.png`)} 
                                                style={{width: "12vw", height:"8vw", transform: "scale(2)", objectFit:"cover"}} 
                                                className="img"
                                                onClick={() => this.setState({transform: 2})}
                                                />
                                            </Row>   
                                        
                                    </Col>
                                </Styles>
                            </Row>
                            <Row>
                                <Styles>
                                    <ListGroup horizontal>
                                        <OverlayTrigger trigger="hover" placement="bottom" overlay={popoverPlatiSecurizate}>
                                                <ListGroup.Item style={styles.item} className="list-group-item">
                                                        <ShieldCheck size={40} color="grey" style={{paddingBottom:"10px"}} className="icon"/>
                                                        <p style={{fontSize: "12px", paddingLeft: "25px", paddingRight: "25px"}} className="par">
                                                            PLĂȚI SECURIZATE
                                                        </p>
                                                </ListGroup.Item>
                                        </OverlayTrigger>
                                        <OverlayTrigger trigger="hover" placement="bottom" overlay={popoverLivrareInOre}>
                                            <ListGroup.Item style={styles.item} className="list-group-item">
                                                <Truck size={40} color="grey" style={{paddingBottom:"10px"}} className="icon"/>
                                                <p style={{fontSize: "12px", paddingLeft: "25px", paddingRight: "25px"}} className="par">LIVRARE ÎN 4 ORE</p>
                                            </ListGroup.Item>
                                        </OverlayTrigger>
                                        <OverlayTrigger trigger="hover" placement="bottom" overlay={popoverLivrareGratuita}>
                                            <ListGroup.Item style={styles.item} className="list-group-item">
                                                <CashStack size={40} color="grey" style={{paddingBottom:"10px"}} className="icon"/>
                                                <p style={{fontSize: "12px", paddingLeft: "25px", paddingRight: "25px"}} className="par">LIVRARE GRATUITĂ</p>
                                            </ListGroup.Item>
                                        </OverlayTrigger>
                                        <OverlayTrigger trigger="hover" placement="bottom" overlay={popoverGarantie}>
                                            <ListGroup.Item style={styles.item} className="list-group-item">
                                                <Check2Circle size={40} color="grey" style={{paddingBottom:"10px"}} className="icon"/>
                                                <p style={{fontSize: "12px", paddingLeft: "25px", paddingRight: "25px"}} className="par">100% DISCREȚIE ȘI GARANȚIE</p>
                                            </ListGroup.Item>
                                        </OverlayTrigger>
                                        <OverlayTrigger trigger="hover" placement="bottom" overlay={popoverCadouri}>
                                            <ListGroup.Item style={styles.item} className="list-group-item">
                                                <Gift size={40} color="grey" style={{paddingBottom:"10px"}} className="icon"/>
                                                <p style={{fontSize: "12px", paddingLeft: "25px", paddingRight: "25px"}} className="par">FELICITARE CADOU</p>
                                            </ListGroup.Item> 
                                        </OverlayTrigger>
                                    </ListGroup>
                                </Styles>
                            </Row>
                        </Container>
                    
                    </Col>
                </Row>
                <Row style={{marginBottom: "0", height: "100%", maxHeight: "100%", marginTop: "20px"}}>
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
        )
    }
}