import React, {Component} from 'react';

import {Row, Col, Tooltip, OverlayTrigger} from 'react-bootstrap';

var styles = {
    pickupSavings: {
        textDecoration: 'underline'
    },
    totalSavings: {
        color: 'red',
        fontWeight: 800
    }
}
export default class PickupSavings extends Component {
    render() {
        const tooltip = (
            <Tooltip id="tooltip-bottom" style={{zIndex:"2000"}}>
            <p>Prin ridicarea personală a produselor din magazin puteți evita plata livrării acestora.</p>
        </Tooltip>
        )
        
        return(
            <Row className="show-grid">
                <Col md={6}>
                    <OverlayTrigger key="bottom" overlay={tooltip} placement="bottom">
                        <div style={styles.pickupSavings}>Ridicare personală</div>
                    </OverlayTrigger>
                </Col>
                <Col style={styles.totalSavings} md={6}>{`${this.props.price} lei`}</Col>
            </Row>
        )
    }
}