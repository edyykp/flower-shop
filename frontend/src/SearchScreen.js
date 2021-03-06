import React, { useState } from 'react';
import { Layout } from './components/Layout';
import {Col, Row, Container, Form, Button} from 'react-bootstrap';
import {Sidebar} from './components/Sidebar';
import {ProductList} from './components/ProductList';
import { Search } from 'react-bootstrap-icons';
import { useLocation } from 'react-router';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

export const SearchScreen = props => {
    const [sortOrder, setSortOrder] = useState("Recomandate");

    const sortHandler = (e) => {
        setSortOrder(e.target.value);
        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('sortOrder', sortOrder)
        props.history.push('/search?sortOrder='+sortOrder);
        props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
      };

    let query = useQuery();
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
                              <strong><h2>{query.get("category")}</h2></strong>
                          </Col>
                          <Col style={{justifyContent: "right"}}>
                              <Form inline>
                                  Preț de la:   
                                  <Form.Control type="text" style={{width:"80px"}} maxLength={4}/>
                                  lei până la:  
                                  <Form.Control type="text" style={{width:"80px"}} maxLength={4}/>
                                  lei
                                  <Button variant="success" style={{marginLeft:"10px"}}>
                                      <Search color="white" size={18} />
                                  </Button>
                                  <Form.Control as="select" style={{marginLeft: "5px"}} defaultValue="Recomandate" onChange={sortHandler}>
                                      <option>Preț crescător</option>
                                      <option>Preț descrescător</option>
                                      <option>Recomandate</option>
                                      <option>Cele mai vândute</option>
                                      <option>Ordine alfabetică(A-Z)</option>
                                      <option>Ordine alfabetica(Z-A)</option>
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