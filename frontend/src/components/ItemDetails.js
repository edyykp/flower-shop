import React, { useState} from 'react';
import {Button, Collapse, Container} from 'react-bootstrap';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Item from './Item';

const Styles = styled.div`
    .container {
        background-color: #DCDBDB;
        border-style: solid;
        border-radius: 5px;
        border-color: #D1D1D1;
        padding: 10px;
    }
`;

const ItemDetails = () => {

    const cart = useSelector(state => state.cart);

    const {cartItems} = cart;

    const [open, setOpen] = useState(false);
    const handleOpenFalse = () => setOpen(false);
    const handleOpenTrue = () => setOpen(true);
    

        return(
            <Styles>
                <div>
                    <Button
                        variant="link"
                        onClick={() => open === true ? handleOpenFalse() : handleOpenTrue() }
                    >
                    { open === false ? `Arată` : `Ascunde`} detalii
                    { open === false ? ` +` : ` -`}
                    </Button>
                    <Collapse in={open}>
                        <Container className="container">
                            {
                                cartItems.length === 0 ? 
                                <div>
                                    Cart is empty
                                </div>
                                :
                                cartItems.map(item => 
                                    <Item item={item} />)
                            }
                                
                                </Container>
                    </Collapse>
                </div>
            </Styles>
        )
    };

    export default ItemDetails;