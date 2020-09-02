import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { Card, Button} from 'react-bootstrap';
import styled from 'styled-components';
import Axios from 'axios';

const Styles = styled.div`

    .card {
        margin-top: 50px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: auto;
        font-family: Arial;
        z-index: 2;
        overflow: hidden;
    }

    .card-body {
        width: 100%;
        display: inline;
        justify-content: center;
        align-items: center;
    }
}
`;
export const FinishedOrder = props => {

    const [order, setOrder] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            await Axios.get('/api/orders/getorder/' + props.match.params.id)
            .then(response => {
                setOrder(response.data.order);
                setLoading(false);
            })
            .catch(err => console.log(err))
        }
        fetchData();
    }, [props.match.params.id])

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
      
        window.addEventListener('resize', handleResize)
    });
    return (
        !loading &&
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingTop:"100px", paddingBottom:"110px", height:"80vh"}}>
            <Styles>
                {
                    width > 800 ?
                    <Card style={{width:"40%"}}>
                {
        order && order.paymentStatus === "0" ? 
        <div>
                    <Card.Header>
                        <h2>Comanda a fost finalizată</h2>
                    </Card.Header>
                    <Card.Body>
                        În scurt timp, veți primi un mail de confirmare al comenzii și detalii despre livrare.
                        
                    </Card.Body>
                    <Card.Footer>
                    <Button variant="link" style={{paddingTop:"20px", fontSize:"18px", textDecoration:"underline"}} href="/">Întoarce-te acasă</Button>
                    </Card.Footer>
        </div> :
        order && order.paymentStatus !== "" && order.paymentStatus !== null ?
        <div>
            <Card.Header>
                <h2>Comanda nu a putut fi finalizată</h2>
            </Card.Header>
            <Card.Body>
                Plata nu a fost efectuată. Încearcă mai târziu.
                
            </Card.Body>
            <Card.Footer>
            <Button variant="link" style={{paddingTop:"20px", fontSize:"18px", textDecoration:"underline"}} href="/">Întoarce-te acasă</Button>
            </Card.Footer>
        </div> :
        <Button onClick={props.history.push('/nomatch')}>...</Button>
}
                </Card>
                :
                <Card style={{width:"80%"}}>
                {!order._id ? <Button onClick={props.history.push('/nomatch')}>...</Button> :
        order.paymentStatus === "0" ? 
        <div>
                    <Card.Header>
                        <h2>Comanda a fost finalizată</h2>
                    </Card.Header>
                    <Card.Body>
                        În scurt timp, veți primi un mail de confirmare al comenzii și detalii despre livrare.
                        
                    </Card.Body>
                    <Card.Footer>
                    <Button variant="link" style={{paddingTop:"20px", fontSize:"18px", textDecoration:"underline"}} href="/">Întoarce-te acasă</Button>
                    </Card.Footer>
        </div> :
        order.paymentStatus !== "" && order.paymentStatus !== null &&
        <div>
            <Card.Header>
                <h2>Comanda nu a putut fi finalizată</h2>
            </Card.Header>
            <Card.Body>
                Plata nu a fost efectuată. Încearcă mai târziu.
                
            </Card.Body>
            <Card.Footer>
            <Button variant="link" style={{paddingTop:"20px", fontSize:"18px", textDecoration:"underline"}} href="/">Întoarce-te acasă</Button>
            </Card.Footer>
        </div> 
}
                </Card>
                }
                
            </Styles>

        </Layout>
    )  
}