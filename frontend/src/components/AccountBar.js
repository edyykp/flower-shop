import React from 'react';
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
        font-size: 14px;
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

    return (
        
            userInfo ? <Styles>
                            <Navbar className="navbar justify-content-end">
                                <NavDropdown title={`Bine ai venit, ${userInfo.firstName}`}  style={{paddingRight: "50px"}} >
                                    {
                                        userInfo.isAdmin ? 
                                        <div>
                                            <NavDropdown.Item href="/products" >
                                                <BagPlus size={30} color="grey" style={{paddingRight: "5px"}}/>
                                                    Adaugă produs nou
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="/productstable">
                                                <Eye size={30} color="grey" style={{paddingRight: "5px"}}/>
                                                Vezi produse curente
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
                        <Styles>
                            <Navbar className="navbar justify-content-end">
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

export default AccountBar;