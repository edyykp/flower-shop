import React, { useState, useEffect } from 'react';
import { ToggleButtonGroup, ToggleButton, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrder, changeOrder } from './actions/orderActions';

export const OrderInTable = ({order}, key) => {

    const orderDelete = useSelector(state=> state.orderDelete);
    const {loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

    const changeStateOrder = useSelector(state => state.changeStateOrder);
    const {loading: loadingChange, success: successChange, error: errorChange, order: newOrder} = changeStateOrder;

    const [stateOrder, setStateOrder] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        if(successChange) {
            setStateOrder(newOrder.data.state);
        }
        return () => {
          //
        };
      }, [successChange, newOrder]);
    
      useEffect(() => {
          if(successDelete)
          window.location.reload(false);
        return () => {
          //
        };
      }, [successDelete]);
      
      const deleteHandler = () => {
        dispatch(deleteOrder(order._id));
      }
      const changeStateHandler = (id) => {
          dispatch(changeOrder({id: id, stateOrder}));
      }

    return (
        loadingDelete ? <tr><td>LOADING</td></tr> :
        <tr key={order._id}>
            {(errorDelete || errorChange)  && alert("A apărut o eroare neașteptată. Încearcă din nou.")}
                        <td>{
                            order.cartItems.map((product) => 
                                <span key={product._id}>
                                    <span>{product.name}</span>,
                                    <span>{product.qty}</span>,
                                    <span>{product.price}{' '}</span> LEI,
                                    <span>{product.textGift}</span>
                                    <hr/>
                                </span>
                            )}
                        </td>
                        <td>{order.firstName}{' '}{order.lastName}</td>
                        <td>{order.email}{' '}{order.phone}</td>
                        <td>{order.address}{', '}{order.country}</td>
                        {order.facturare === "persoanafizica" ? <td>Persoană fizică</td> : <td>Firmă</td>}
                        <td>{order.companyName}{', '}{order.cui}</td>   
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
                        { order.paymentStatus === "0" ? <td>Plătit</td> :
                          order.paymentStatus === "16" ? <td>Card cu risc (posibil furat)</td> :
                          order.paymentStatus === "17" ? <td>număr de card incorect</td> :
                          order.paymentStatus === "18" ? <td>card înghețat</td> :
                          order.paymentStatus === "19" ? <td>card expirat</td> :
                          order.paymentStatus === "20" ? <td>fonduri insuficiente</td> :
                          order.paymentStatus === "21" ? <td>cVV2 incorect</td> :
                          order.paymentStatus === "22" ? <td>Issuer unavailable</td> :
                          order.paymentStatus === "32" ? <td>Sumă incorectă</td> :
                          order.paymentStatus === "33" ? <td>Valută incorectă</td> :
                          order.paymentStatus === "34" ? <td>tranzacție nepermisă pentru cardholder</td> :
                          order.paymentStatus === "35" ? <td>tranzacție refuzată</td> :
                          order.paymentStatus === "36" ? <td>tranzacție refuzată de filtre antifraudă</td> :
                          order.paymentStatus === "37" ? <td>tranzacție refuzată (breaking the law)</td> :
                          order.paymentStatus === "38" ? <td>tranzacție refuzată</td> :
                          order.paymentStatus === "48" ? <td>invalid request</td> :
                          order.paymentStatus === "49" ? <td>duplicate PREAUTH</td> :
                          order.paymentStatus === "50" ? <td>duplicate AUTH</td> :
                          order.paymentStatus === "51" ? <td>you can only CANCEL a preauth order</td> :
                          order.paymentStatus === "52" ? <td>you can only CONFIRM a preauth order</td> :
                          order.paymentStatus === "53" ? <td>you can only CREDIT a confirmed order</td> :
                          order.paymentStatus === "54" ? <td>Credit amount is higher than auth amount</td> :
                          order.paymentStatus === "55" ? <td>Capture amount is higher than preauth amount</td> :
                          order.paymentStatus === "56" ? <td>Duplicate request</td> :
                          order.paymentStatus === "99" ? <td>Eroare generică</td> :
                          null
                        }
                        <td>
                                <ToggleButtonGroup type="radio" name="options" defaultValue={order.state}>
                                    <ToggleButton value={0} style={{border:"1px solid black"}} onClick={() => setStateOrder(0)}>Nelivrat</ToggleButton>
                                    <ToggleButton value={1} style={{border:"1px solid black"}} onClick={() => setStateOrder(1)}>În curs</ToggleButton>
                                    <ToggleButton value={2} style={{border:"1px solid black"}} onClick={() => setStateOrder(2)}>Livrat</ToggleButton>
                                </ToggleButtonGroup>
                                <Button variant="info" onClick={() => changeStateHandler(order)} style={{marginTop:'5px'}}>
                                    { loadingChange ? <Spinner animation="border" variant="secondary" /> :
                                <span>Modifică</span>
                                }
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => deleteHandler(key)}
                                    style={{marginTop:'5px'}}
                                >
                                    Delete
                                </Button>
                        
                        </td>
                    </tr>
    )
}