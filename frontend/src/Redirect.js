import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Card, Button, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { detailsOrder } from './actions/orderActions';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

const Styles = styled.div`
    .nav-item {
        width:50%;
    }

    .nav-link:not(.active) {
        color: purple !important;
    }

    .nav-link {
        display: flex;
        justify-content: center;
        color: black ;
    }

    .card {
        margin-top: 200px;
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

export const Redirect = props => {
    const [time, setTime] = useState(5);
    const orderDetails = useSelector((state) => state.orderDetails);
    const {loading, error} = orderDetails;
    const dispatch = useDispatch();
    const [data1, setData1] = useState("");
    const [data2, setData2] = useState("");

    useEffect(() => {
        setInterval(() => {
            setTime(time - 1);
        }, 1000)
        if(time < 0) {
            document.currentForm.submit();
        }
        return() => {

        }
    }, [props.history, time])

    useEffect(() => {
        dispatch(detailsOrder(props.match.params.id));
        if (!error) {
            Axios.get('/api/orders/getpayment/' + props.match.params.id)
            .then(response => {
            setData1(response.data.envKey);
            setData2(response.data.envData);
            })
            .catch(err => console.log(err))
        }
        return() => {

        }
    }, [dispatch, props.match.params.id, error])

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
      
        window.addEventListener('resize', handleResize)
    });

    return (
        
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingTop:"40px", paddingBottom:"110px", height:"80vh"}}>
        <Styles>
            {
                width > 800 ?
                <Card style={{width:"40%"}}>
            {loading? <Spinner animation="border" variant="secondary" style={{position:"absolute", top:"50%", left: "50%"}}/>
        : error ? <Button onClick={props.history.push('/nomatch')}>...</Button> : 
                <Card.Body>
                    <form method="POST" action="http://sandboxsecure.mobilpay.ro" name="currentForm">
                        <input type="hidden" value={data1} name="env_key"></input>
                        <input type="hidden" value={data2} name="data"></input>
                        <strong><p>Veți fi redirecționat în câteva secunde către pagina de plată...</p></strong>
                        <hr/>
                        <p>Dacă nu sunteți redirecționat, pentru a încerca din nou,<Button variant="link" onClick={() => document.currentForm.submit()}>apăsați aici</Button></p>
                    </form>
                    </Card.Body>
        }
                </Card>
                :
                <Card style={{width:"80%"}}>
            {loading? <Spinner animation="border" variant="secondary" style={{position:"absolute", top:"50%", left: "50%"}}/>
        : error ? <Button onClick={props.history.push('/nomatch')}>...</Button> : 
                <Card.Body>
                    <form method="POST" action="http://sandboxsecure.mobilpay.ro" name="currentForm">
                        <input type="hidden" value={data1} name="env_key"></input>
                        <input type="hidden" value={data2} name="data"></input>
                        <strong><p>Veți fi redirecționat în câteva secunde către pagina de plată...</p></strong>
                        <hr/>
                        <p>Dacă nu sunteți redirecționat, pentru a încerca din nou,<Button variant="link" onClick={() => document.currentForm.submit()}>apăsați aici</Button></p>
                    </form>
                    </Card.Body>
        }
                </Card>
            }
            
            </Styles>

        </Layout>
    )
}