import React from 'react';
import {Carousel} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    #jumbotron1 {
        background: url(/assets/florarie.png) no-repeat;
        background-size: cover;
        color: #ccc;
        height: 700px;
        position: relative;
        z-index: -1;
    }

    #jumbotron2 {
        background: url(/assets/mino-copy.png) no-repeat;
        background-size: cover;
        color: #ccc;
        height: 700px;
        position: relative;
        z-index: -1;
    }

    #jumbotron3 {
        background: url(/assets/florarie2-copy-2.png) no-repeat;
        background-size: cover;
        color: #ccc;
        height: 700px;
        position: relative;
        z-index: -1;
    }

    .overlay {
        background-color: #000;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 0;
    }

`;

export const Jumbotron = () => (
    <Styles>
        <Carousel interval={2500} pause="hover" wrap={true} style={{marginTop:"52px"}}>
            <Carousel.Item id="jumbotron1">
                <div className="overlay"></div>
                <Carousel.Caption>
                <h2 style={{fontSize:"50px"}}>Livrări la domiciliu</h2>
                <p style={{fontSize:"20px"}}>Oricând la dispoziția ta!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item id="jumbotron2">
                <div className="overlay"></div>
                <Carousel.Caption>
                <h2 style={{fontSize:"50px"}}>Flori pentru evenimente</h2>
                <p style={{fontSize:"20px"}}>Comenzi buchete de flori!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item id="jumbotron3">
                <div className="overlay"></div>
                <Carousel.Caption>
                <h2 style={{fontSize:"50px"}}>Cadouri. Aranjamente.</h2>
                <p style={{fontSize:"20px"}}> Trimite flori online!</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </Styles>
)