import React, { useState } from 'react';
import {Nav, Navbar, Image, Form, FormControl, Button, NavDropdown, Modal, Tooltip, OverlayTrigger} from 'react-bootstrap';
import styled from 'styled-components';
import Logo from '../assets/logo.png';
import { Cart4, TelephoneForward} from 'react-bootstrap-icons';
import {SocialIcon} from 'react-social-icons';
import { ShoppingCart } from './ShoppingCart';

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: #bbb;

        &:hover {
            color:white;
        }
    }

    .search-box {
        opacity: 0.7;
        color: gray;

        &:focus {
            opacity:1;
            color: black;
        }
    }

    #search-button {
        background-color: purple;
        border-color: purple;

        &:hover {
            background-color: #9A2FA2;
            border-color: gray;
        }
    }

    #basic-navbar-dropdown {
        color: #bbb;

        &:hover {
            color:white;
        }
    }

    .purchase-card {
        width: 350px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        padding: 1em;
    }
`;

export function NavigationBar(total) {

        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const tooltip = (
            <Tooltip id="tooltip">
            <p>Coșul de cumpărături</p>
        </Tooltip>
        )
        return (
            <Styles>
                <Navbar expand="lg" fixed="top">
                    <Navbar.Brand href="/">
                        <Image src={Logo} fluid width="200"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Item><Nav.Link href="/">Acasă</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/bucheteflori">Buchete Flori</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/aranjamenteflori">Aranjamente Flori</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/trandafiricriogenati">Trandafiri Criogenati</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/plante">Plante</Nav.Link></Nav.Item>
                            <NavDropdown title="Nuntă" id="basic-navbar-dropdown">
                                <NavDropdown.Item href="/nunta">Nuntă</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/buchetedemireasa">Buchete de mireasă</NavDropdown.Item>
                                <NavDropdown.Item href="/lumanaridecununie">Lumânări de cununie</NavDropdown.Item>
                                <NavDropdown.Item href="/aranjamentefloralesala">Aranjamente florale sală</NavDropdown.Item>
                                <NavDropdown.Item href="/buchetenasa">Buchete pentru nașă</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Botez" id="basic-navbar-dropdown">
                                <NavDropdown.Item href="/botez">Botez</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/aranjamentecristelnita">Aranjamente cristelniță</NavDropdown.Item>
                                <NavDropdown.Item href="/lumanari">Lumânări</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Item><Nav.Link href="/contact">Contact</Nav.Link></Nav.Item>
                        </Nav>
                        <SocialIcon url="https://www.facebook.com/buzauflori" style={{ height: 35, width: 35, paddingRight: "50px" }} target="_blank"/>
                        <SocialIcon url="https://www.instagram.com/florariamedeea/?hl=en" style={{ height: 35, width: 35, paddingRight: "50px" }} target="_blank"/>
                        <TelephoneForward color="purple" size={30} /> 
                        <p style={{color:"#bbb", textAlign:"center", justifyContent:"center", paddingTop:"15px", paddingLeft:"10px", paddingRight:"20px"}}>
                        <a href="tel:+40 (784) 284 243">
                            +40 (784) 284 243
                            </a></p>
                        <Form inline>
                            <FormControl type="text" placeholder="Caută produse" className="search-box mr-sm-2"/>
                            <Button variant="secondary" id="search-button">Caută</Button>
                        </Form>
                        <OverlayTrigger placement="left" overlay={tooltip}>
                            <div>
                                <Cart4 color="purple" size={50} style={{paddingLeft:"15px"}} onClick={handleShow}/>
                            </div>
                        </OverlayTrigger>   
                        
                        <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                        >
                                <Modal.Header closeButton>
                                    <Modal.Title>Coș de cumpărături</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ShoppingCart />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        ÎNCHIDE
                                    </Button>
                                    <Button variant="primary">FINALIZEAZĂ COMANDA</Button>
                                </Modal.Footer>
                        </Modal>
                    </Navbar.Collapse>
                </Navbar>
            </Styles>
        )
    
}