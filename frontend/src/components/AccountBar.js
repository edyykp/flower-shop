import React, { useState, useEffect } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';
import {PersonPlus, PersonCircle, BoxArrowLeft, Person, BagPlus, Eye, EyeFill, ClockHistory } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from '../actions/userActions';
import { useHistory } from 'react-router';

const Styles = styled.div`
    .navbar {
        background-color: #1E1E1E;
        
    }

    .navbar .nav-link {
        color: lightgrey;
        font-size: 11px;
        &: hover{
            color: purple;
        }
    }


`;
export const AccountBar = () => {
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        history.push('/');
      }

      const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
      
        window.addEventListener('resize', handleResize)
    });

    return (
        
            userInfo ? <Styles>
                            <Navbar className="navbar justify-content-between">
                                <Nav >
                                        <Nav.Item>
                                            <Nav.Link href="/terms" className="nav-link">
                                                <strong>Termeni și condiții</strong>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link href="/privacy" className="nav-link">
                                                <strong>Politica de confidențialitate</strong>
                                            </Nav.Link>
                                        </Nav.Item>
                                </Nav>
                                <NavDropdown title={`Bine ai venit, ${userInfo.firstName}`}  style={{paddingRight: "50px"}} >
                                    {
                                        userInfo.isAdmin ? 
                                        <div>
                                            <NavDropdown.Item href="/products" >
                                                <BagPlus size={30} color="grey" style={{paddingRight: "5px"}}/>
                                                    Adaugă produs
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="/productstable">
                                                <Eye size={30} color="grey" style={{paddingRight: "5px"}}/>
                                                Vezi produse
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="/orderstable">
                                                <EyeFill size={30} color="grey" style={{paddingRight: "5px"}} />
                                                Vezi comenzi
                                            </NavDropdown.Item>
                                        </div>
                                    :
                                    <div>
                                        <NavDropdown.Item href="/accountprofile">
                                                <Person size={30} color="grey" style={{paddingRight: "5px"}}/>
                                                    Profilul meu
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="/orders">
                                            <ClockHistory size={30} color="grey" style={{paddingRight: "5px"}}/>
                                                Comenzile mele
                                        </NavDropdown.Item>
                                    </div>
                                        
                                    }
                                    
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>
                                        <BoxArrowLeft size={30} color="grey" style={{paddingRight: "5px"}} />
                                        Log out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Navbar>
                        </Styles> 
                        :
                        
                            width > 600 ? 

                        
                            <Styles>
                            <Navbar className="navbar justify-content-between">
                                <Nav >
                                    <Nav.Item>
                                        <Nav.Link href="/terms" className="nav-link">
                                            <strong>Termeni și condiții</strong>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/privacy" className="nav-link">
                                            <strong>Politica de confidențialitate</strong>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Nav >
                                    <Nav.Item style={{ justifyContent:"space-between", paddingRight:"10px"}}>
                                        <Nav.Link href="/signin"  className="nav-link"><strong style={{paddingRight:"5px"}}>Autentifică-te</strong>
                                        <PersonCircle size={18} color="lightgrey"/>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item style={{paddingRight: "30px", justifyContent:"space-between"}}>
                                        <Nav.Link href="/signup" className="nav-link"><strong style={{paddingRight:"5px"}}>Înregistrează-te</strong>
                                        <PersonPlus size={18} color="lightgrey"/>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Navbar>
                        </Styles> 
                        :
                        width > 390 ?

                        <Styles>
                            <Navbar className="navbar justify-content-start">
                                <Nav >
                                    <Nav.Item>
                                        <Nav.Link href="/terms" className="nav-link">
                                            <strong>Termeni și condiții</strong>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/privacy" className="nav-link">
                                            <strong>Politica de confidențialitate</strong>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Nav >
                                    <Nav.Item style={{ justifyContent:"space-between", paddingRight:"10px"}}>
                                        <Nav.Link href="/signin"  className="nav-link"><strong style={{paddingRight:"5px"}}>Autentifică-te</strong>
                                        <PersonCircle size={18} color="lightgrey"/>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item style={{paddingRight: "30px", justifyContent:"space-between"}}>
                                        <Nav.Link href="/signup" className="nav-link"><strong style={{paddingRight:"5px"}}>Înregistrează-te</strong>
                                        <PersonPlus size={18} color="lightgrey"/>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Navbar>
                        </Styles> 
                        :
                        <Styles>
                        <Navbar className="navbar justify-content-between">
                            <Nav >
                                <Nav.Item style={{ justifyContent:"space-between", paddingRight:"10px"}}>
                                    <Nav.Link href="/signin"  className="nav-link"><strong style={{paddingRight:"5px"}}>Autentifică-te</strong>
                                    <PersonCircle size={18} color="lightgrey"/>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item style={{ justifyContent:"space-between"}}>
                                    <Nav.Link href="/signup" className="nav-link"><strong style={{paddingRight:"5px"}}>Înregistrează-te</strong>
                                    <PersonPlus size={18} color="lightgrey"/>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar>
                    </Styles> 
                        
        
        
    )
}

export default AccountBar;