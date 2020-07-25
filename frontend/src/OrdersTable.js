import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from './components/Layout';
import { Table, Button, Spinner } from 'react-bootstrap';
import { deleteOrder, listOrders } from './actions/orderActions';

export const OrdersTable = () => {
    const orderList = useSelector(state => state.orderList);
    const {loading, orders, error} = orderList;

    const orderDelete = useSelector(state=> state.orderDelete);
    const {loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

    const dispatch = useDispatch();

      useEffect(() => {
        dispatch(listOrders());
        return () => {
          //
        };
      }, [successDelete, dispatch]);
    
      const deleteHandler = (order) => {
        dispatch(deleteOrder(order._id));
      }

    return (
        loading || loadingDelete ? 
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", height:"100vh",justifyContent:"center"}}>
                <Spinner animation="border" variant="secondary" style={{position:"absolute", top:"50%", left: "50%"}}/>
        </Layout> 
        :
        <Layout style={{height:"100vh",background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingTop:"40px", paddingBottom:"20px"}}>
            {(error || errorDelete ) && alert("A apărut o eroare neașteptată. Încearcă din nou.")}
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
                    <tr key={order._id}>
                        <td>{
                            order.cartItems.map((product) => 
                                <div key={product._id}>
                                    <span>{product.name}</span>,
                                    <span>{product.qty}</span>,
                                    <span>{product.price}{' '}</span> LEI,
                                    <span>{product.textGift}</span>
                                    {console.log(product)}
                                    <hr/>
                                </div>
                            )}
                        </td>
                        <td>{order.firstName}{' '}{order.lastName}</td>
                        <td>{order.email}{' '}{order.phone}</td>
                        <td>{order.address}{', '}{order.country}</td>
                        {order.facturare === "persoanafizica" ? <td>Persoană fizică</td> : <td>Firmă</td>}
                        <td>{order.destinationAddress}{', '}{order.destinationRegion}</td>
                        <td>{order.destinationName}{' '}{order.destinationPhone}</td>
                        <td>{order.date}{', '}{order.hour}</td>
                        <td>{order.anonym}</td>
                        {
                            order.methoddelivery === "livrareafara" ? <td>Livrare în afara orașului - 20 lei</td>
                          : order.methoddelivery === "livrarebuzau" ? <td>Livrare gratuită în Buzău</td> :
                            <td>Ridicare personală din florărie</td>
                        }
                        {
                            order.payment === "platacard" ? <td>Plată card</td>
                            :  <td>Plată la livrare</td> 
                        }
                        <td>{order.comments}</td>
                        <td>{order.totalPrice} LEI</td>
                        <td>
                        <Button variant="info">
                            Edit
                        </Button>{' '}
                        <Button
                            variant="danger"
                            onClick={() => deleteHandler(order)}
                        >
                            Delete
                        </Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </Layout>
    )
}