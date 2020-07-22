import React from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import {Layout} from './components/Layout';

export const CumCumpar= () => (
    <Layout style={{width: "100%", maxWidth: "100%",paddingTop:"40px", backgroundColor: "white", paddingLeft: "100px", paddingRight:"100px", paddingBottom: "50px", marginBottom: "0px", height: "100%", maxHeight: "100%"}}>
        <Row style={{marginBottom: "40px"}}>
            <Col style={{marginTop: "30px"}}>
            <h1 style={{paddingBottom: "10px"}}>Cum cumpăr?</h1>
            <p style={{fontSize: "20px", color: "grey"}}>
                1. Selectează produsul dorit;
            </p>
            <p style={{fontSize: "20px", color: "grey"}}>
                2. Adaugă produsul în coșul de cumpărături;
            </p>
            <p style={{fontSize: "20px", color: "grey"}}>
                3. Continuă cumpărăturile, selectând mai multe produse, sau finalizează comanda, accesând coșul de cumpărături (butonul dreapta-sus);
            </p>
            <p style={{fontSize: "20px", color: "grey"}}>
                4. Apasă pe butonul albastru 'Trimite comanda';
            </p>
            <p style={{fontSize: "20px", color: "grey"}}>
                5. În pagina deschisă vei putea scrie un mesaj ce va fi trecut pe felicitare;
            </p>
            <p style={{fontSize: "20px", color: "grey"}}>
                6. Completează datele destinatarului plus detaliile livrării (ora, data și alte mențiuni necesare);
            </p>
            <p style={{fontSize: "20px", color: "grey"}}>
                7. Completează datele tale și selectează metoda de plată (online cu card-ul sau ramburs la curier). Plata online cu card-ul este realizată prin intermediul XXXXXXXX, deci datele card-ului nu vor fi stocate;
            </p>
            <p style={{fontSize: "20px", color: "grey"}}>
                8. Confirmarea primirii comenzii va fi trimisă prin e-mail la adresa dumneavoastră.
            </p>
            </Col>
        </Row>
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
)