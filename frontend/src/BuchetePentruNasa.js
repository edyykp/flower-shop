import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import {Col, Row, Container, Form, Button} from 'react-bootstrap';
import {Sidebar} from './components/Sidebar';
import {ProductList} from './components/ProductList';
import { Search } from 'react-bootstrap-icons';

export const BuchetePentruNasa = props => {
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

      const [width, setWidth] = useState(window.innerWidth);

      useEffect(() => {
          function handleResize() {
              setWidth(window.innerWidth);
          }
        
          window.addEventListener('resize', handleResize)
      });

    return (
      width > 1000 ? 

      <Layout style={{width: "100%", maxWidth: "100%",paddingTop:"40px", backgroundColor: "white", paddingLeft: "100px", paddingRight:"100px", paddingBottom: "50px", marginBottom: "0px", height: "100%", maxHeight: "100%"}}>
          <Row >
              <Col lg={3} style={{backgroundColor:"#A071A9", paddingTop: "40px", paddingBottom: "20px"}}>
                <Sidebar />
              </Col>
              <Col lg={9}>
                <Container style={{marginTop: "50px", marginLeft: "40px", width: "100%", maxWidth:"100%"}}>
                <Row>
                          <Col style={{justifyContent: "left"}}>
                              <strong><h2>Buchete pentru nașă</h2></strong>
                          </Col>
                          <Col style={{justifyContent: "right"}}>
                              <Form inline>
                              <p>
                                    Preț de la:   
                                    <Form.Control type="text" style={{width:"80px"}} onChange={(e) => {if(!isNaN(e.target.value)) setMinPrice(e.target.value)}} maxLength={4}/>
                                    lei
                                  </p>
                                  <p style={{marginLeft:"8px"}}>
                                    până la:  
                                    <Form.Control type="text" style={{width:"80px"}} onChange={(e) => {if(!isNaN(e.target.value)) setMaxPrice(e.target.value)}} maxLength={4}/>
                                    lei
                                  </p>
                                  <p>
                                  <Button variant="success" onClick={priceHandler} style={{marginLeft:"5px"}}>
                                      <Search color="white" size={18} />
                                  </Button>
                                  </p>
                                  <p>
                                    <Form.Control as="select" onChange={(e) => {sortHandler(e.target.value);}} style={{marginLeft:"5px"}}>
                                        <option value="default">Recomandate</option>
                                        <option value="highest">Preț crescător</option>
                                        <option value="lowest">Preț descrescător</option>
                                        <option value="mostsold">Cele mai vândute</option>
                                        <option value="az">Ordine alfabetică(A-Z)</option>
                                        <option value="za">Ordine alfabetica(Z-A)</option>
                                    </Form.Control>
                                  </p>
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
      :
      <Layout style={{width: "100%", maxWidth: "100%",paddingTop:"40px", backgroundColor: "white", paddingLeft: "20px", paddingRight:"100px", paddingBottom: "50px", marginBottom: "0px", height: "100%", maxHeight: "100%"}}>
     <Col>
              <Row style={{backgroundColor:"#A071A9", paddingTop: "40px", paddingBottom: "20px"}}>
                <Sidebar />
              </Row>
              <Row style={{paddingTop:"10px"}}>
                <Col>
                          <Row style={{justifyContent: "left"}}>
                              <strong><h2>Buchete pentru nașă</h2></strong>
                          </Row>
                          <Row style={{justifyContent: "right"}}>
                              <Form inline>
                                  <p>
                                    Preț de la:   
                                    <Form.Control type="text" style={{width:"80px"}} onChange={(e) => {if(!isNaN(e.target.value)) setMinPrice(e.target.value)}} maxLength={4}/>
                                    lei
                                  </p>
                                  <p style={{marginLeft:"8px"}}>
                                    până la:  
                                    <Form.Control type="text" style={{width:"80px"}} onChange={(e) => {if(!isNaN(e.target.value)) setMaxPrice(e.target.value)}} maxLength={4}/>
                                    lei
                                  </p>
                                  <p>
                                  <Button variant="success" onClick={priceHandler} style={{marginLeft:"5px"}}>
                                      <Search color="white" size={18} />
                                  </Button>
                                  </p>
                                  
                                  <p>
                                    <Form.Control as="select" onChange={(e) => {sortHandler(e.target.value);}} style={{marginLeft:"5px"}}>
                                        <option value="default">Recomandate</option>
                                        <option value="highest">Preț crescător</option>
                                        <option value="lowest">Preț descrescător</option>
                                        <option value="mostsold">Cele mai vândute</option>
                                        <option value="az">Ordine alfabetică(A-Z)</option>
                                        <option value="za">Ordine alfabetica(Z-A)</option>
                                    </Form.Control>
                                  </p>
                              </Form>
                          </Row>
                          <hr />
                          <Row style={{marginTop: "50px"}}>
                            <ProductList/>
                          </Row>
                      </Col>
                  
              </Row>
          </Col>
          </Layout>
)
    }