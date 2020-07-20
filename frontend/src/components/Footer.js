import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

export const Footer = () => {
  return (
    <MDBFooter  style={{backgroundColor:"#D8D8D8", marginTop: "0px", height: "100%", maxHeight: "100%", paddingTop: "10px"}}>
      <MDBContainer className="text-center text-md-left" style={{backgroundColor:"#D8D8D8", marginTop: "0px", height: "100%", maxHeight: "100%"}}>
        <MDBRow style={{paddingLeft: "15%"}}>
          <MDBCol md="4"><p>
            <strong>Tel: </strong><a href="tel:+40 (784) 284 243" style={{color: "blue"}}>+40 (784) 284 243</a>    </p>
          </MDBCol>
          <MDBCol md="4">
              <p>
            <strong>Whatsapp: </strong>+40 (784) 284 243</p>
          </MDBCol>
          <MDBCol md="4">
              <p>
            <strong>Email: </strong>comenzi@florariebuzau.ro
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
        <MDBContainer fluid style={{backgroundColor:"#928D94"}} className="footer-copyright text-center py-3">
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.florariebuzau.ro/" style={{color: "blue"}}> florariebuzau.ro </a>
        </MDBContainer>
    </MDBFooter>
  );
}
