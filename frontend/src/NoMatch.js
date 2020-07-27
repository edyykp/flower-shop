import React from 'react';
import { Layout } from './components/Layout';
import { Button } from 'react-bootstrap';
import {EmojiNeutral} from 'react-bootstrap-icons';
export const NoMatch = () => (
    <Layout style={{justifyContent:"space-between",height:"calc(100vh/1.321)",background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingTop:"40px"}}>
        <div style={{margin:"auto", width:"50%", marginTop:"10%"}}>
            <h1 style={{color:"lightgrey"}}>404
            <EmojiNeutral size={230} color="lightgrey" style={{float:"right", paddingBottom:"20px"}}/></h1>
            <h1 style={{color:"lightgrey"}}>Pagina nu a fost găsită</h1>
            
            <Button variant="dark" style={{marginTop:"30px"}} href="/">Du-te înapoi la pagina principală</Button>

        </div>
    </Layout>
)