import React from 'react';
import { Layout } from './components/Layout';
import {Col, Row, Container} from 'react-bootstrap';
import {Sidebar} from './components/Sidebar';
import {Subtitle} from './components/Subtitle';
import {ProductList} from './components/ProductList';

export const Botez = () => (
      <Layout style={{width: "100%", maxWidth: "100%",paddingTop:"40px", backgroundColor: "white", paddingLeft: "100px", paddingRight:"100px", paddingBottom: "50px", marginBottom: "0px", height: "100%", maxHeight: "100%"}}>
          <Row >
              <Col lg={3} style={{backgroundColor:"#A071A9", paddingTop: "40px", paddingBottom: "20px"}}>
                <Sidebar />
              </Col>
              <Col lg={9}>
                <Container style={{marginTop: "50px", marginLeft: "40px", width: "100%", maxWidth:"100%"}}>
                  <Subtitle title="Botez" />
                  <hr />
                  <Row style={{marginTop: "50px"}}>
                    <ProductList/>
                  </Row>
                </Container>
              </Col>
          </Row>
      </Layout>
)