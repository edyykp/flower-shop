import React, {Component} from 'react'
import {Container} from 'react-bootstrap';
import styled from 'styled-components';
import Subtotal from './Subtotal';
import PickupSavings from './PickupSavings';
import EstimatedTotal from './EstimatedTotal';
import ItemDetails from './ItemDetails';

const Styles = styled.div`
    .purchase-card {
        width: 450px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
        padding: 1em;
    }
`;

export class ShoppingCart extends Component {

    render() {

        return (
            <Styles>
                <Container className="purchase-card">
                    <Subtotal  />
                    <PickupSavings price="0"/>
                    <hr />
                    <EstimatedTotal  />
                    <ItemDetails />
                    
                </Container>
            </Styles>
        )
    }
}