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
            console.log(newOrder);
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

      const deleteHandler = (order) => {
        dispatch(deleteOrder(order._id));
      }
      const changeStateHandler = (id) => {
          dispatch(changeOrder({id: id, stateOrder}));
      }

    return (
        loadingDelete ? 
                <Spinner animation="border" variant="secondary" style={{position:"absolute", top:"50%", left: "50%"}}/>
        :
        <tr key={order._id}>
            {(errorDelete || errorChange)  && alert("A apărut o eroare neașteptată. Încearcă din nou.")}
                        <td>{
                            order.cartItems.map((product) => 
                                <div key={product._id}>
                                    <span>{product.name}</span>,
                                    <span>{product.qty}</span>,
                                    <span>{product.price}{' '}</span> LEI,
                                    <span>{product.textGift}</span>
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
                            <div>
                                <ToggleButtonGroup type="radio" name="options" defaultValue={order.state}>
                                    <ToggleButton value={0} style={{border:"1px solid black"}} onClick={() => setStateOrder(0)}>Nelivrat</ToggleButton>
                                    <ToggleButton value={1} style={{border:"1px solid black"}} onClick={() => setStateOrder(1)}>În curs</ToggleButton>
                                    <ToggleButton value={2} style={{border:"1px solid black"}} onClick={() => setStateOrder(2)}>Livrat</ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                            <div style={{marginTop:"10px"}}>
                                <Button variant="info" onClick={() => changeStateHandler(order)}>
                                    { loadingChange ? <Spinner animation="border" variant="secondary" /> :
                                <span>Modifică</span>
                                }
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => deleteHandler(key)}
                                >
                                    Delete
                                </Button>
                            </div>
                        
                        </td>
                    </tr>
    )
}