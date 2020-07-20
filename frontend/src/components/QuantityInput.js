import React, {Component} from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const Styles = styled.div`
    .component-quantity-input {
        display: inline;
    }
    .component-quantity-input input{
        padding: 5px;
        text-align: center;
        width: 48px; 
        height: 40px;
    }
`;

export default class QuantityInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.quantity
        };
        this.changeQuantity = this.changeQuantity.bind(this);
    }

    changeQuantity(event) {
        this.setState({
            quantity: event.target.value
        })
    }

    render() {
        return (
            <Styles>
                <div className="component-quantity-input">
                    <input type="number" value={this.state.quantity} onChange={this.changeQuantity} min={1} max={9}/>
                    <Button variant="danger" onClick={() => this.props.changeHandler(this.state.quantity)} size="sm">Modifică</Button>
                </div>
            </Styles>
        )
    }
}