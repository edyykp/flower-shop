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
    constructor(props) {
        super(props);

        this.state = {
            total:100,
            PickupSavings: -0.0,
            taxes: 0,
            estimatedTotal: 0
        };
    }

    componentDidMount = () => {
        this.setState({
            taxes: (this.state.total + this.state.PickupSavings)* 0.0875
        },
        function() {
            this.setState({
                estimatedTotal: this.state.total + this.state.PickupSavings
            })
        })
    }

    render() {

        return (
            <Styles>
                <Container className="purchase-card">
                    <Subtotal price={this.state.total.toFixed(2)} />
                    <PickupSavings price={this.state.PickupSavings} />
                    <hr />
                    <EstimatedTotal price={this.state.estimatedTotal.toFixed(2)} />
                    <ItemDetails price={this.state.estimatedTotal.toFixed(2)}/>
                    
                </Container>
            </Styles>
        )
    }
}