import React, { useState } from 'react';
import { Layout } from './components/Layout';
import {Col, Row, Container, Form, Button} from 'react-bootstrap';
import {Sidebar} from './components/Sidebar';
import {ProductList} from './components/ProductList';
import { Search } from 'react-bootstrap-icons';

export const Nunta = props => {
    const [minPrice ,setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(9999);

    

      const priceHandler = () => {
        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('minPrice', minPrice);
        currentUrlParams.set('maxPrice', maxPrice);
        props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
      }
    const sortHandler = (e) => {
        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('sortOrder', e.target.value);
        props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
      };
    return (
      <Layout style={{width: "100%", maxWidth: "100%",paddingTop:"40px", backgroundColor: "white", paddingLeft: "100px", paddingRight:"100px", paddingBottom: "50px", marginBottom: "0px", height: "100%", maxHeight: "100%"}}>
          <Row >
              <Col lg={3} style={{backgroundColor:"#A071A9", paddingTop: "40px", paddingBottom: "20px"}}>
                <Sidebar />
              </Col>
              <Col lg={9}>
                <Container style={{marginTop: "50px", marginLeft: "40px", width: "100%", maxWidth:"100%"}}>
                <Row>
                          <Col style={{justifyContent: "left"}}>
                              <strong><h2>Nuntă</h2></strong>
                          </Col>
                          <Col style={{justifyContent: "right"}}>
                              <Form inline>
                                  Preț de la:   
                                  <Form.Control type="text" style={{width:"80px"}} onChange={(e) => setMinPrice(e.target.value)}/>
                                  lei până la:  
                                  <Form.Control type="text" style={{width:"80px"}} onChange={(e) => setMaxPrice(e.target.value)}/>
                                  lei
                                  <Button variant="success" style={{marginLeft:"10px"}} onClick={priceHandler}>
                                      <Search color="white" size={18} />
                                  </Button>
                                  <Form.Control as="select" style={{marginLeft: "5px"}} defaultValue="Recomandate" onChange={sortHandler}>
                                  <option value="default">Recomandate</option>
                                      <option value="highest">Preț crescător</option>
                                      <option value="lowest">Preț descrescător</option>
                                      <option value="mostsold">Cele mai vândute</option>
                                      <option value="az">Ordine alfabetică(A-Z)</option>
                                      <option value="za">Ordine alfabetica(Z-A)</option>
                                  </Form.Control>
                              </Form>
                          </Col>
                      </Row>
                  <hr />
                  <Row style={{marginTop: "50px"}}>
                    <ProductList/>
                  </Row>
                </Container>
              </Col>
          </Row>
      </Layout>
)
    }