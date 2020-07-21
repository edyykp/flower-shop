import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import {Signpost, CloudPlus, PersonPlus, PersonCircle } from 'react-bootstrap-icons';

const Styles = styled.div`
    .navbar {
        background-color: #1E1E1E;
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
    return (
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