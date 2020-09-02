import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

export const Footer = () => {
  return (
    <MDBFooter  style={{backgroundColor:"#D8D8D8", paddingTop: "10px", bottom:"0"}}>
      <MDBContainer className="text-center text-md-left" style={{backgroundColor:"#D8D8D8"}}>
        <MDBRow >
          <MDBCol md="4"><p>
            <strong>Tel: </strong><a href="tel:+40 (784) 284 243" style={{color: "blue"}}>+40 (784) 284 243</a>    </p>
          </MDBCol>
          <MDBCol md="4">
              <p>
            <strong>Whatsapp: </strong>+40 (784) 284 243</p>
          </MDBCol>
          <MDBCol md="4">
              <p>
            <strong>Email: </strong>florariamedeea@yahoo.com
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
        <MDBContainer fluid style={{backgroundColor:"#928D94"}} className="footer-copyright text-center py-3">
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.florariamedeea.ro/" style={{color: "blue"}}> florariamedeea.ro </a>
        </MDBContainer>
    </MDBFooter>
  );
}
