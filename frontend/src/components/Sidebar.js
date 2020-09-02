import React from 'react';
import {Nav} from 'react-bootstrap';
import {withRouter} from 'react-router';
import styled from 'styled-components';

const Styles = styled.div`
    .nav-link {
        color: white;

        &:hover {
            color: black;
        }
    }

    .nav-pills .nav-link:not(.active) {
        background-color: #A071A9;
    }

    .nav-pills .nav-link {
        background-color: purple;
    }
`;

const wSidebar = props => {
    const {location} = props;
    return (
        <Styles >
                <strong style={{marginLeft:"5px"}}>Categorii</strong>
                <hr />
                <Nav className="flex-column" activeKey={location.pathname} variant="pills" >
                    <Nav.Link href="/">Acasă</Nav.Link>
                    <Nav.Link href="/bucheteflori">Buchete de flori</Nav.Link>
                    <Nav.Link href="/aranjamenteflori">Aranjamente florale</Nav.Link>
                    <Nav.Link href="/trandafiricriogenati">Trandafiri criogenați</Nav.Link>
                    <Nav.Link href="/plante">Plante</Nav.Link>
                    <Nav.Link href="/buchetedemireasa">Buchete de mireasă</Nav.Link>
                    <Nav.Link href="/lumanaridecununie">Lumânări de cununie</Nav.Link>
                    <Nav.Link href="/aranjamentefloralesala">Aranjamente florale de sală</Nav.Link>
                    <Nav.Link href="/buchetenasa">Buchete pentru nașă</Nav.Link>
                    <Nav.Link href="/aranjamentecristelnita">Aranjamente cristelniță</Nav.Link>
                    <Nav.Link href="/lumanari">Lumânări</Nav.Link>
                </Nav>
                <br />
                <strong style={{marginLeft:"5px"}}>Informații</strong>
                <hr />
                <Nav className="flex-column">
                    <Nav.Link href="/cumcumpar">Cum cumpăr?</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                    <Nav.Link href="/terms">Termeni și condiții</Nav.Link>
                    <Nav.Link href="/privacy">Politica de confidențialitate</Nav.Link>
                </Nav>
        </Styles>
    )
};

export const Sidebar = withRouter(wSidebar);