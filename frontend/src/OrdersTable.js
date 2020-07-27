import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from './components/Layout';
import { Table,  Spinner} from 'react-bootstrap';
import {  listOrders } from './actions/orderActions';
import { OrderInTable } from './OrderInTable';

export const OrdersTable = () => {
    const orderList = useSelector(state => state.orderList);
    const {loading, orders, error} = orderList;

    
    const dispatch = useDispatch();

      useEffect(() => {
        dispatch(listOrders());
        return () => {
          //
        };
      }, [ dispatch]);
      
      
    return (
        loading ? 
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", height:"100vh",justifyContent:"center"}}>
                <Spinner animation="border" variant="secondary" style={{position:"absolute", top:"50%", left: "50%"}}/>
        </Layout> 
        :
        <Layout style={{height:"100vh",background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingTop:"40px", paddingBottom:"20px"}}>
            {error  && alert("A apărut o eroare neașteptată. Încearcă din nou.")}
            <Table striped bordered hover style={{backgroundColor:"white", marginTop:"20px"}}>
                <thead>
                    <tr>
                    <th>Produs,Qty,Preț,Text felicitare</th>
                    <th>Nume client</th>
                    <th>Email și telefon client</th>
                    <th>Adresă client</th>
                    <th>Facturare</th>
                    <th>Adresă de livrare</th>
                    <th>Contact destinatar</th>
                    <th>Data și ora livrării</th>
                    <th>Livrare anonimă?</th>
                    <th>Tip livrare</th>
                    <th>Metodă de plată</th>
                    <th>Comentarii</th>
                    <th>Preț total</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {orders.map((order) => (
                     <OrderInTable order={order} key={order._id} />   
                    ))
                }
                </tbody>
            </Table>
        </Layout>
    )
}