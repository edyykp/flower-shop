import React, { useEffect} from 'react'
import { notify } from 'react-notify-toast'
import { useDispatch, useSelector } from 'react-redux'
import { confirmEmail } from './actions/userActions'
import { Layout } from './components/Layout'
import { Card, Button } from 'react-bootstrap'
import styled from 'styled-components';

const Styles = styled.div`

    .card {
        width: 40%;
        min-width: 500px;
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

export const Confirm = props => {

  const userConfirm = useSelector(state => state.userConfirm);
  const {loading, userInfo} = userConfirm;
  // When the component mounts the mongo id for the user is pulled  from the 
  // params in React Router. This id is then sent to the server to confirm that 
  // the user has clicked on the link in the email. The link in the email will 
  // look something like this: 
  // 
  // http://localhost:3000/confirm/5c40d7607d259400989a9d42
  // 
  // where 5c40d...a9d42 is the unique id created by Mongo
    const { id } = props.match.params;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(confirmEmail(id));
      if(loading === false && userInfo) {
        notify.show("Adresa de mail a fost confirmată");
      }
    }, [dispatch, id, loading, userInfo]);

  // While the email address is being confirmed on the server a spinner is 
  // shown that gives visual feedback. Once the email has been confirmed the 
  // spinner is stopped and turned into a button that takes the user back to the 
  // <Landing > component so they can confirm another email address.
  return (
    <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingTop:"100px", paddingBottom:"110px", height:"80vh"}}>
    <Styles>
        <Card>
            <Card.Header>
                <h2>Adresa de email a fost confirmată.</h2>
            </Card.Header>
            <Card.Body>
                Acum vă puteți conecta în siguranță la contul dumneavoastră. 
                
            </Card.Body>
            <Card.Footer>
            <Button variant="link" style={{paddingTop:"20px", fontSize:"18px", textDecoration:"underline"}} href="/">Întoarce-te acasă</Button>
            </Card.Footer>
        </Card>
    </Styles>

</Layout>
  )
}