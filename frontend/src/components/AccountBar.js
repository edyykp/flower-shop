import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';
import {PersonPlus, PersonCircle, BoxArrowLeft, Person } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

const Styles = styled.div`
    .navbar {
        background-color: #1E1E1E;
        z-index:2000;
    }

    .navbar .nav-link {
        color: lightgrey;
        font-size: 14px;
        &: hover{
            color: purple;
        }
    }
`;
export const AccountBar = () => {
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    return (
        
            userInfo ? <Styles>
                            <Navbar fixed="top" className="navbar justify-content-end">
                                <NavDropdown title={`Bine ai venit,${userInfo.firstName}`} >
                                    <NavDropdown.Item href="accountprofile">
                                        <Person size={30} color="grey" style={{paddingRight: "5px"}}/>
                                        Profilul meu
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item >
                                        <BoxArrowLeft size={30} color="grey" style={{paddingRight: "5px"}}/>
                                        Log out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Navbar>
                        </Styles> 
                        :
                        <Styles>
                            <Navbar fixed="top" className="navbar justify-content-end">
                                <Nav>
                                    <Nav.Item style={{ justifyContent:"space-between", paddingRight:"10px"}}>
                                        <Nav.Link href="/signin"  className="nav-link"><strong style={{paddingRight:"5px"}}>Autentifică-te</strong>
                                        <PersonCircle size={20} color="lightgrey"/>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item style={{paddingRight: "30px", justifyContent:"space-between"}}>
                                        <Nav.Link href="/signup" className="nav-link"><strong style={{paddingRight:"5px"}}>înregistrează-te</strong>
                                        <PersonPlus size={20} color="lightgrey"/>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Navbar>
                        </Styles>
        
        
    )
}