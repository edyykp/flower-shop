import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Form, Button, Card, Col, ProgressBar, Image, Table, Row, Container, Spinner} from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import {ChevronLeft, ChevronRight} from 'react-bootstrap-icons';
import { createOrder } from './actions/orderActions';
import { notify } from 'react-notify-toast';
import Cookie from 'js-cookie';

const Styles = styled.div`
    

    .card {
        margin-top: 50px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: auto;
        font-family: Arial;
        z-index: 2;
    }

    .card-body {
        width: 100%;
        display: inline;
        justify-content: center;
        align-items: center;
    }
}
`;
export const ShippingScreen = props => {
    const userSignin = useSelector(state=> state.userSignin);
    const {loading: loadingUser, userInfo, error: errorUser } = userSignin;

    const [userID, setUserID] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [ phone, setPhone] = useState("");
    
    
    const [country, setCountry] = useState('Romania'); 
    const [facturare, setFacturare] = useState('persoanafizica');
    const [progression, setProgression] = useState(20);
    const [destinationName, setDestinationName] = useState("");
    const [destinationPhone, setDestinationPhone] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");
    const [destinationRegion, setRegion] = useState("Buzau");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("În cursul zilei");
    const [anonym, setAnonym] = useState("Da");
    const [methoddelivery, setMethodDelivery] = useState("livrarebuzau");
    const [payment, setPayment] = useState("platacard");
    const [comments, setComments] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [cui, setCUI] = useState("");

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading: loadingOrder, success: successOrder, error: errorOrder, order } = orderCreate;

    const datee = new Date();
    let month;
    let day;
    if(datee.getMonth() + 1 < 10) month = "0" + (datee.getMonth()+1).toString();
    else month = (datee.getMonth()+1).toString();
    if(datee.getDate() < 10) day = "0" + datee.getDate().toString();
    else day = datee.getDate().toString();
    const today =  datee.getFullYear().toString() + "-" + month + "-" + day ;


    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

    useEffect(() => {
        if (successOrder) {
            Cookie.set("cartItems", [], {sameSite: "Strict", secure: true});
            props.history.push('/redirect/' + order._id);
        }   
      });
    
      useEffect(() => {
        if(userInfo) {
            setEmail(userInfo.email);
            setPhone(userInfo.phone);
            setAddress(userInfo.address);
            setFirstName(userInfo.firstName);
            setLastName(userInfo.lastName);
            setUserID(userInfo._id);
        }
      }, [userInfo]);

    const [firstCard, setFirstCard] = useState(true);
    const [secondCard, setSecondCard] = useState(false);
    const [thirdCard, setThirdCard] = useState(false);
    const [forthCard, setForthCard] = useState(false);
    const [fifthCard, setFifthCard] = useState(false);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if(firstName !== "" && lastName !== "" && email!== "" && address !== "" && destinationAddress !== "" && date !== "" && hour !== "" && methoddelivery !== "" && payment !== "") {
            if(facturare === "persoanafizica") {
                let totalPrice = methoddelivery === "livrareafara" ? itemsPrice + 20 : itemsPrice;
                dispatch(createOrder({userID, firstName, lastName, email, phone, address, 
                facturare, country, destinationRegion, destinationPhone, destinationName, 
                destinationAddress, date, hour, anonym, methoddelivery, payment, comments, totalPrice, cartItems, companyName, cui}));
            }
            else if(companyName !== "" && cui !== "") {
                let totalPrice = methoddelivery === "livrareafara" ? itemsPrice + 20 : itemsPrice;
                dispatch(createOrder({userID, firstName, lastName, email, phone, address, 
                facturare, country, destinationRegion, destinationPhone, destinationName, 
                destinationAddress, date, hour, anonym, methoddelivery, payment, comments, totalPrice, cartItems, companyName, cui}));
            }  
            
        }
        else {
            notify.show("Completează toate câmpurile obligatorii");
        }
        
    }

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
      
        window.addEventListener('resize', handleResize)
    });

    
    return (
        loadingUser ? 
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", height:"100vh",justifyContent:"center"}}>
                <Spinner animation="border" variant="secondary" style={{position:"absolute", top:"50%", left: "50%"}}/>
        </Layout> 
        : errorUser ?
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", height:"100vh",justifyContent:"center"}}>
            <h1 style={{position:"absolute", top:"50%", left: "50%"}}>A apărut o eroare neașteptată.</h1>
        </Layout> 
        : loadingOrder ? 
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", height:"100vh",justifyContent:"center"}}>
            <Spinner animation="border" variant="secondary" style={{verticalAlign:"middle"}}/>
        </Layout>
        : errorOrder ? 
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", height:"100vh",justifyContent:"center"}}>
            <h1 style={{position:"absolute", top:"50%", left: "50%"}}>A apărut o eroare neașteptată.</h1>
        </Layout>
        :
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingTop:"45px", paddingBottom:"190px"}}>
          
            <Styles>
                <ProgressBar animated now={progression} />

            <Form onSubmit={submitHandler} >
                {
                    firstCard ? 
                    width > 1200 ? 
                    <Card style={{width:"40%"}}>
                                <Card.Header>
                                <h4>Informații personale</h4>
                                </Card.Header>
                                <Card.Title style={{paddingTop:"10px"}}>
                                    {!userInfo && 
                                    <Container>
                                        <Button variant="link" href="/signin?redirect=shipping">
                                        Autentificare
                                    </Button> 
                                    <span style={{color:"grey", fontSize:"20px"}}>|</span>
                                    <Button variant="link" href="/signup?redirect=shipping">
                                        Înregistrare
                                    </Button>
                                    <span style={{color:"grey", fontSize:"17px", float:"right", paddingRight:"20px", paddingTop:"10px"}}>sau finalizează comanda fără cont</span>
                                    </Container>
                                    }
                                    <hr/>
                                    
                                </Card.Title>
                                
                                <Card.Body >
                                    
                                        <Form.Row >
                                            <Col>
                                                <Form.Group >
                                                    <Form.Label>Nume*</Form.Label>
                                                    <Form.Control type="text" onChange={(e) => setLastName(e.target.value)} defaultValue={userInfo ? userInfo.lastName : lastName} maxLength={20}/>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group >
                                                    <Form.Label>Prenume*</Form.Label>
                                                    <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)} defaultValue={userInfo ? userInfo.firstName : firstName} maxLength={20}/>
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group >
                                                    <Form.Label>Adresă de email*</Form.Label>
                                                    <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} defaultValue={userInfo ? userInfo.email : email} maxLength={50}/>
                                                    <Form.Text className="text-muted">
                                                    We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>
                                                <Form.Group >
                                                    <Form.Label>Număr de telefon</Form.Label>
                                                    <Form.Control type="text" onChange={(e) => setPhone(e.target.value)} defaultValue={userInfo ? userInfo.phone : phone} maxLength={15}/>
                                                </Form.Group>
                                                <Form.Group   >
                                                    <Form.Label >Facturează ca:*</Form.Label>
                                                    <Container>
                                                    <Form.Check type="radio" label="Persoană fizică" inline value="persoanafizica" name="facturare" defaultChecked onClick={() => setFacturare("persoanafizica")}/>
                                                    <Form.Check type="radio" label="Firmă" inline value="firma" name="facturare" onClick={() => setFacturare("firma")}/>
                                                    </Container>
                                                    <Container>
                                                        {
                                                            facturare === "firma" && 
                                                            <Form.Row>
                                                                <Form.Group as={Col}>
                                                                    <Form.Label>Denumire firmă</Form.Label>
                                                                    <Form.Control type="text" onChange={(e) =>setCompanyName(e.target.value)} defaultValue={userInfo? userInfo.companyName : companyName} maxLength={50}/>
                                                                </Form.Group>
                                                                <Form.Group as={Col}>
                                                                    <Form.Label>Număr înregistrare firmă</Form.Label>
                                                                    <Form.Control type="text" onChange={(e) => setCUI(e.target.value)} defaultValue={userInfo? userInfo.companyName : companyName} maxLength={100}/>
                                                                </Form.Group>
                                                            </Form.Row>
                                                                
                                                        }
                                                    </Container>
                                                    
                                                </Form.Group>
                                                <Form.Group   >
                                                    <Form.Label>Adresă*</Form.Label>
                                                    <Form.Control as="textarea" rows={3} style={{resize:"none"}} onChange={(e) => setAddress(e.target.value)} defaultValue={userInfo ? userInfo.address : address} maxLength={200}/>
                                                </Form.Group>
                                                <Form.Group   >
                                                    <Form.Label>Țară*</Form.Label>
                                                    <Container>
                                                        <CountryDropdown onChange={(e) => setCountry(e)} value={country} />
                                                    </Container>
                                                </Form.Group>
                                            </Col>
                                            
                                        </Form.Row>
                                        
                                        <Container style={{color:"grey", marginBottom:"15px"}}>* - câmp obligatoriu</Container>
                                        <Button variant="danger" onClick={() => props.history.goBack()} style={{float:"left"}}>
                                        <ChevronLeft size={21} color="white"/> <span>Înapoi</span>
                                        </Button>
                                        <Button onClick={() => {
                                            setFirstCard(false);
                                            setSecondCard(true);
                                            setProgression(40);
                                        }} variant="success" style={{float:"right"}}>  
                                            <span>Treci la pasul următor</span>
                                            <ChevronRight size={21} color="white"/>
                                            </Button>
                                       
                                </Card.Body>
                            </Card>
                            :
                            <Card style={{width:"90%"}}>
                                <Card.Header>
                                <h4>Informații personale</h4>
                                </Card.Header>
                                <Card.Title style={{paddingTop:"10px"}}>
                                    {!userInfo && 
                                    <Container>
                                        <Button variant="link" href="/signin?redirect=shipping">
                                        Autentificare
                                    </Button> 
                                    <span style={{color:"grey", fontSize:"20px"}}>|</span>
                                    <Button variant="link" href="/signup?redirect=shipping">
                                        Înregistrare
                                    </Button>
                                    <span style={{color:"grey", fontSize:"17px", float:"right", paddingRight:"20px", paddingTop:"10px"}}>sau finalizează comanda fără cont</span>
                                    </Container>
                                    }
                                    <hr/>
                                    
                                </Card.Title>
                                
                                <Card.Body >
                                    
                                        <Form.Row >
                                            <Col>
                                                <Form.Group >
                                                    <Form.Label>Nume*</Form.Label>
                                                    <Form.Control type="text" onChange={(e) => setLastName(e.target.value)} defaultValue={userInfo ? userInfo.lastName : lastName} maxLength={20}/>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group >
                                                    <Form.Label>Prenume*</Form.Label>
                                                    <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)} defaultValue={userInfo ? userInfo.firstName : firstName} maxLength={20}/>
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group >
                                                    <Form.Label>Adresă de email*</Form.Label>
                                                    <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} defaultValue={userInfo ? userInfo.email : email} maxLength={50}/>
                                                    <Form.Text className="text-muted">
                                                    We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>
                                                <Form.Group >
                                                    <Form.Label>Număr de telefon</Form.Label>
                                                    <Form.Control type="text" onChange={(e) => setPhone(e.target.value)} defaultValue={userInfo ? userInfo.phone : phone} maxLength={15}/>
                                                </Form.Group>
                                                <Form.Group   >
                                                    <Form.Label >Facturează ca:*</Form.Label>
                                                    <Container>
                                                    <Form.Check type="radio" label="Persoană fizică" inline value="persoanafizica" name="facturare" defaultChecked onClick={() => setFacturare("persoanafizica")}/>
                                                    <Form.Check type="radio" label="Firmă" inline value="firma" name="facturare" onClick={() => setFacturare("firma")}/>
                                                    </Container>
                                                    <Container>
                                                        {
                                                            facturare === "firma" && 
                                                            <Form.Row>
                                                                <Form.Group as={Col}>
                                                                    <Form.Label>Denumire firmă</Form.Label>
                                                                    <Form.Control type="text" onChange={(e) =>setCompanyName(e.target.value)} defaultValue={userInfo? userInfo.companyName : companyName} maxLength={50}/>
                                                                </Form.Group>
                                                                <Form.Group as={Col}>
                                                                    <Form.Label>Număr înregistrare firmă</Form.Label>
                                                                    <Form.Control type="text" onChange={(e) => setCUI(e.target.value)} defaultValue={userInfo? userInfo.companyName : companyName} maxLength={100}/>
                                                                </Form.Group>
                                                            </Form.Row>
                                                                
                                                        }
                                                    </Container>
                                                    
                                                </Form.Group>
                                                <Form.Group   >
                                                    <Form.Label>Adresă*</Form.Label>
                                                    <Form.Control as="textarea" rows={3} style={{resize:"none"}} onChange={(e) => setAddress(e.target.value)} defaultValue={userInfo ? userInfo.address : address} maxLength={200}/>
                                                </Form.Group>
                                                <Form.Group   >
                                                    <Form.Label>Țară*</Form.Label>
                                                    <Container>
                                                        <CountryDropdown onChange={(e) => setCountry(e)} value={country} style={{width:"200px"}}/>
                                                    </Container>
                                                </Form.Group>
                                            </Col>
                                            
                                        </Form.Row>
                                        
                                        <Container style={{color:"grey", marginBottom:"15px"}}>* - câmp obligatoriu</Container>
                                        <Button variant="danger" onClick={() => props.history.goBack()} style={{float:"left"}}>
                                        <ChevronLeft size={21} color="white"/> <span>Înapoi</span>
                                        </Button>
                                        <Button onClick={() => {
                                            setFirstCard(false);
                                            setSecondCard(true);
                                            setProgression(40);
                                        }} variant="success" style={{float:"right"}}>  
                                            <span>Treci la pasul următor</span>
                                            <ChevronRight size={21} color="white"/>
                                            </Button>
                                       
                                </Card.Body>
                            </Card>
                            :
                            null
                }
                {
                    secondCard ?
                    width > 800 ?  
                    <Card style={{width:"40%"}}>
                                <Card.Header>
                                <h4>Livrare</h4>
                                </Card.Header>
                                <Card.Title style={{paddingTop:"10px"}}>
                                    Detalii despre livrare
                                    <hr/>
                                    
                                </Card.Title>  
                                
                                <Card.Body >
                                                <Form.Group >
                                                    <Form.Label>Nume și prenume destinatar</Form.Label>
                                                    <Form.Control type="text" onChange={(e) => setDestinationName(e.target.value)} value={destinationName} maxLength={100}/>
                                                </Form.Group>
                                                <Form.Group >
                                                    <Form.Label>Număr de telefon destinatar</Form.Label>
                                                    <Form.Control type="text" onChange={(e) => setDestinationPhone(e.target.value)} value={destinationPhone} maxLength={15}/>
                                                </Form.Group>
                                                <Form.Group   >
                                                    <Form.Label>Adresă destinatar*</Form.Label>
                                                    <Form.Control as="textarea" rows={3} style={{resize:"none"}} onChange={(e) => setDestinationAddress(e.target.value)} value={destinationAddress} maxLength={250}/>
                                                </Form.Group>
                                                <Form.Group   >
                                                    <Form.Label>Județ*</Form.Label>
                                                    <Container>
                                                        <RegionDropdown country="Romania" onChange={(e) => setRegion(e)} value={destinationRegion} />
                                                    </Container>
                                                </Form.Group>
                                        
                                                <Container style={{color:"grey", marginBottom:"15px"}}>* - câmp obligatoriu</Container>
                                        <Button variant="danger" onClick={() => {
                                            setSecondCard(false);
                                            setFirstCard(true);
                                            setProgression(20);
                                        }} style={{float:"left"}}>
                                        <ChevronLeft size={21} color="white"/> <span>Înapoi</span>
                                        </Button>
                                        <Button onClick={() => {
                                            setSecondCard(false);
                                            setThirdCard(true);
                                            setProgression(60);
                                        }} variant="success" style={{float:"right"}}>  
                                            <span>Treci la pasul următor</span>
                                            <ChevronRight size={21} color="white"/>
                                            </Button>
                                </Card.Body>
                            </Card>
                            :
                            <Card style={{width:"90%"}}>
                                <Card.Header>
                                <h4>Livrare</h4>
                                </Card.Header>
                                <Card.Title style={{paddingTop:"10px"}}>
                                    Detalii despre livrare
                                    <hr/>
                                    
                                </Card.Title>  
                                
                                <Card.Body >
                                                <Form.Group >
                                                    <Form.Label>Nume și prenume destinatar</Form.Label>
                                                    <Form.Control type="text" onChange={(e) => setDestinationName(e.target.value)} value={destinationName} maxLength={100}/>
                                                </Form.Group>
                                                <Form.Group >
                                                    <Form.Label>Număr de telefon destinatar</Form.Label>
                                                    <Form.Control type="text" onChange={(e) => setDestinationPhone(e.target.value)} value={destinationPhone} maxLength={15}/>
                                                </Form.Group>
                                                <Form.Group   >
                                                    <Form.Label>Adresă destinatar*</Form.Label>
                                                    <Form.Control as="textarea" rows={3} style={{resize:"none"}} onChange={(e) => setDestinationAddress(e.target.value)} value={destinationAddress} maxLength={250}/>
                                                </Form.Group>
                                                <Form.Group   >
                                                    <Form.Label>Județ*</Form.Label>
                                                    <Container>
                                                        <RegionDropdown country="Romania" onChange={(e) => setRegion(e)} value={destinationRegion} />
                                                    </Container>
                                                </Form.Group>
                                        
                                                <Container style={{color:"grey", marginBottom:"15px"}}>* - câmp obligatoriu</Container>
                                        <Button variant="danger" onClick={() => {
                                            setSecondCard(false);
                                            setFirstCard(true);
                                            setProgression(20);
                                        }} style={{float:"left"}}>
                                        <ChevronLeft size={21} color="white"/> <span>Înapoi</span>
                                        </Button>
                                        <Button onClick={() => {
                                            setSecondCard(false);
                                            setThirdCard(true);
                                            setProgression(60);
                                        }} variant="success" style={{float:"right"}}>  
                                            <span>Treci la pasul următor</span>
                                            <ChevronRight size={21} color="white"/>
                                            </Button>
                                </Card.Body>
                            </Card>
                            :
                            null
                } 
                {
                    thirdCard ?
                    width > 800 ? 
                    <Card style={{width:"40%"}}>
                                <Card.Header>
                                <h4>Livrare</h4>
                                </Card.Header>
                                <Card.Title style={{paddingTop:"10px"}}>
                                    Data/Ora livrare
                                    <hr/>
                                    
                                </Card.Title>
                                
                                <Card.Body >
                                        <Form.Group>
                                            <label htmlFor="date">Data livrării:*</label>
                                            <input
                                                id="date"
                                                label="Birthday"
                                                type="date"
                                                value={date}
                                                onChange= { (e) => setDate(e.target.value)}
                                                min={today}
                                                max="2050-01-01"
                                            />
                                        </Form.Group>
                                    
                                    <Form.Group>
                                        <Form.Label>Ora livrării:*</Form.Label>
                                        <Form.Control as="select" onChange={e => setHour(e.target.value)} value={hour} >
                                            <option>în cursul zilei</option>
                                            <option>10:00 - 13:00</option>
                                            <option>13:00 - 16:00</option>
                                            <option>16:00 - 19:00</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Livrare anonimă?*</Form.Label>
                                        <Form.Control as="select" onChange={e => setAnonym(e.target.value)} value={anonym} >
                                            <option>Da</option>
                                            <option>Nu</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Container style={{color:"grey", marginBottom:"15px"}}>* - câmp obligatoriu</Container>
                                        <Button variant="danger" onClick={() => {
                                            setSecondCard(true);
                                            setThirdCard(false);
                                            setProgression(40);
                                        }} style={{float:"left"}}>
                                        <ChevronLeft size={21} color="white"/> <span>Înapoi</span>
                                        </Button>
                                        <Button onClick={() => {
                                            setThirdCard(false);
                                            setForthCard(true);
                                            setProgression(80);
                                        }} variant="success" style={{float:"right"}}>  
                                            <span>Treci la pasul următor</span>
                                            <ChevronRight size={21} color="white"/>
                                            </Button>
                                </Card.Body>
                            </Card>
                            :
                            <Card style={{width:"90%"}}>
                                <Card.Header>
                                <h4>Livrare</h4>
                                </Card.Header>
                                <Card.Title style={{paddingTop:"10px"}}>
                                    Data/Ora livrare
                                    <hr/>
                                    
                                </Card.Title>
                                
                                <Card.Body >
                                        <Form.Group>
                                            <label htmlFor="date">Data livrării:*</label>
                                            <input
                                                id="date"
                                                label="Birthday"
                                                type="date"
                                                value={date}
                                                onChange= { (e) => setDate(e.target.value)}
                                                min={today}
                                                max="2050-01-01"
                                            />
                                        </Form.Group>
                                    
                                    <Form.Group>
                                        <Form.Label>Ora livrării:*</Form.Label>
                                        <Form.Control as="select" onChange={e => setHour(e.target.value)} value={hour} >
                                            <option>în cursul zilei</option>
                                            <option>10:00 - 13:00</option>
                                            <option>13:00 - 16:00</option>
                                            <option>16:00 - 19:00</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Livrare anonimă?*</Form.Label>
                                        <Form.Control as="select" onChange={e => setAnonym(e.target.value)} value={anonym} >
                                            <option>Da</option>
                                            <option>Nu</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Container style={{color:"grey", marginBottom:"15px"}}>* - câmp obligatoriu</Container>
                                        <Button variant="danger" onClick={() => {
                                            setSecondCard(true);
                                            setThirdCard(false);
                                            setProgression(40);
                                        }} style={{float:"left"}}>
                                        <ChevronLeft size={21} color="white"/> <span>Înapoi</span>
                                        </Button>
                                        <Button onClick={() => {
                                            setThirdCard(false);
                                            setForthCard(true);
                                            setProgression(80);
                                        }} variant="success" style={{float:"right"}}>  
                                            <span>Treci la pasul următor</span>
                                            <ChevronRight size={21} color="white"/>
                                            </Button>
                                </Card.Body>
                            </Card>
                            :
                            null
                }
                {
                    forthCard ? 
                    width > 800 ?
                    <Card style={{width:"40%"}}>
                                <Card.Header>
                                <h4>Livrare</h4>
                                </Card.Header>
            
                                
                                <Card.Body >
                                        <Form.Group>
                                            <Form.Label>
                                                <h3>Metodă de livrare</h3>
                                            </Form.Label>
                                            <span style={{display:"inline", float:"right"}}>
                                                <Image src="/assets/netopia_banner_patrat.jpg" alt="netopia" style={{width:"200px", height:"200px"}}/>
                                            </span>
                                            <Form.Check type="radio" name="metodalivrare" value="livrarebuzau" defaultChecked label="Livrare gratuită în Buzău" onClick={e => setMethodDelivery(e.target.value)}/>
                                            <Form.Check type="radio" name="metodalivrare" value="livrareafara" label="Livrare în afara orașului - 20 lei" onClick={e => setMethodDelivery(e.target.value)}/>
                                            <Form.Check type="radio" name="metodalivrare" value="ridicarepersonala" label="Ridicare personală din florărie" onClick={e => setMethodDelivery(e.target.value)}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                <h3>Metodă de plată</h3>
                                            </Form.Label>
                                            <Form.Check type="radio" name="metodaplata" value="platacard" defaultChecked label="Plată card" onClick={e => setPayment(e.target.value)}/>
                                            
                                            <Form.Check type="radio" name="metodaplata" value="plataramburs" label="Plată la livrare" onClick={e => setPayment(e.target.value)}/>
                                        </Form.Group>
                                    
                                    
                                        <Container style={{color:"grey", marginBottom:"15px"}}>* - câmp obligatoriu</Container>
                                        <Button variant="danger" onClick={() => {
                                            setForthCard(false);
                                            setThirdCard(true);
                                            setProgression(60);
                                        }} style={{float:"left"}}>
                                        <ChevronLeft size={21} color="white"/> <span>Înapoi</span>
                                        </Button>
                                        <Button onClick={() => {
                                            setFifthCard(true);
                                            setForthCard(false);
                                            setProgression(100);
                                        }} variant="success" style={{float:"right"}}>  
                                            <span>Continuă</span>
                                            <ChevronRight size={21} color="white"/>
                                            </Button>
                                </Card.Body>
                            </Card>
                            :
                            <Card style={{width:"90%"}}>
                                <Card.Header>
                                <h4>Livrare</h4>
                                </Card.Header>
            
                                
                                <Card.Body >
                                        <Form.Group>
                                            <Form.Label>
                                                <h3>Metodă de livrare</h3>
                                            </Form.Label>
                                            
                                            <Form.Check type="radio" name="metodalivrare" value="livrarebuzau" defaultChecked label="Livrare gratuită în Buzău" onClick={e => setMethodDelivery(e.target.value)}/>
                                            <Form.Check type="radio" name="metodalivrare" value="livrareafara" label="Livrare în afara orașului - 20 lei" onClick={e => setMethodDelivery(e.target.value)}/>
                                            <Form.Check type="radio" name="metodalivrare" value="ridicarepersonala" label="Ridicare personală din florărie" onClick={e => setMethodDelivery(e.target.value)}/>
                                            <span style={{display:"inline", float:"right"}}>
                                                <Image src="/assets/netopia_banner_patrat.jpg" alt="netopia" style={{width:"200px", height:"200px"}}/>
                                            </span>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                <h3>Metodă de plată</h3>
                                            </Form.Label>
                                            <Form.Check type="radio" name="metodaplata" value="platacard" defaultChecked label="Plată card" onClick={e => setPayment(e.target.value)}/>
                                            
                                            <Form.Check type="radio" name="metodaplata" value="plataramburs" label="Plată la livrare" onClick={e => setPayment(e.target.value)}/>
                                        </Form.Group>
                                    
                                    
                                        <Container style={{color:"grey", marginBottom:"15px"}}>* - câmp obligatoriu</Container>
                                        <Button variant="danger" onClick={() => {
                                            setForthCard(false);
                                            setThirdCard(true);
                                            setProgression(60);
                                        }} style={{float:"left"}}>
                                        <ChevronLeft size={21} color="white"/> <span>Înapoi</span>
                                        </Button>
                                        <Button onClick={() => {
                                            setFifthCard(true);
                                            setForthCard(false);
                                            setProgression(100);
                                        }} variant="success" style={{float:"right"}}>  
                                            <span>Continuă</span>
                                            <ChevronRight size={21} color="white"/>
                                            </Button>
                                </Card.Body>
                            </Card>
                            :
                            null
                } 
                {
                    fifthCard ?
                    width > 800 ?
                    <Container>
                    <Row>
                        <Table striped bordered hover style={{backgroundColor:"white", marginTop:"20px"}} responsive>
                            <thead style={{backgroundColor:"lightgrey"}}>
                                <tr>
                                <th style={{textAlign:"center"}}></th>
                                <th style={{textAlign:"center", fontSize:"18px"}}>Produs</th>
                                <th style={{textAlign:"center", fontSize:"18px"}}>Text felicitare</th>
                                <th style={{textAlign:"center", fontSize:"18px"}}>Preț</th>
                                <th style={{textAlign:"center", fontSize:"18px"}}>Cantitate</th>
                                <th style={{textAlign:"center", fontSize:"18px"}}>Total</th>
                                </tr>
                               
                            </thead>
                            <tbody>
                                {cartItems.map((product) => (
                                    <tr key={product.product} >
                                    <td style={{width:"10%"}}>
                                        <Image src={product.image} style={{width: "8vh", height:"6vh", objectFit:"cover"}}/></td>
                                    <td style={{width:"15%", textAlign: "center", verticalAlign:"middle", fontSize:"18px"}}>{product.name}</td>
                                    <td style={{width:"15%", textAlign: "center", verticalAlign:"middle", fontSize:"18px"}}>{product.textGift}</td>
                                    <td style={{width:"15%", textAlign: "center", verticalAlign:"middle", fontSize:"18px"}}>{product.price} LEI</td>
                                    <td style={{width:"15%", textAlign: "center", verticalAlign:"middle", fontSize:"18px"}}>{product.qty}</td>
                                    <td style={{width:"15%", textAlign: "center", verticalAlign:"middle", fontSize:"18px"}}>{`${(product.qty * product.price).toFixed(2)} LEI`}</td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                        <Col>
                            <Table responsive style={{backgroundColor:"white", marginTop:"20px"}}>
                                <thead style={{backgroundColor:"lightgrey"}}>
                                    <tr>
                                    <th style={{textAlign:"left", fontSize:"18px"}}>Informații personale</th>
                                    <th style={{textAlign:"center", fontSize:"18px"}}></th>
                                    </tr>
                                  
                                </thead>
                                <tbody>
                                    <tr style={{height:"40px"}}>
                                        <td>Cumpărător</td>
                                        <td>{firstName}{' '}{lastName}</td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>Telefon</td>
                                        <td>{phone}</td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>Email</td>
                                        <td>{email}</td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>Adresă de facturare</td>
                                        <td>{address}{' '}{country}</td>
                                    </tr>
                                    <tr>
                                        <td>Tip facturare</td>
                                {facturare === "persoanafizica" ? <td>Persoană fizică</td> : <td>Firmă</td>}
                                    </tr>
                                    {
                                        facturare === "firma" && 
                                            <tr>
                                                <td>Denumire firmă și Cod Unic de înregistrare</td>
                                                <td>{companyName}{', '}{cui}</td>
                                            </tr>
                                    }
                                </tbody>
                            </Table>
                            <Table responsive style={{backgroundColor:"white", marginTop:"20px"}}>
                                    <thead style={{backgroundColor:"lightgrey"}}>
                                        <tr>
                                        <th style={{textAlign:"left", fontSize:"18px"}}>Observații client / Text felicitare</th>

                                        </tr>
                                        
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Form.Control as="textarea" rows={3} style={{resize:"none"}} placeholder="Dacă ai ceva de adăugat sau ai omis textul pentru felicitare, completează aici" value={comments} onChange={ e => setComments(e.target.value)} />
                                            </td>
                                        </tr>
                                    </tbody>
                            </Table>        
                        </Col>
                        <Col>
                            <Table responsive style={{backgroundColor:"white", marginTop:"20px"}}>
                                <thead style={{backgroundColor:"lightgrey"}}>
                                    <tr>
                                        <th style={{textAlign:"left", fontSize:"18px"}}>Livrare și plată</th>
                                        <th style={{textAlign:"center", fontSize:"18px"}}></th>
                                    </tr>
                                    
                                </thead>
                                <tbody>
                                    <tr style={{height:"40px"}}>
                                        <td>{destinationName}</td>
                                        <td></td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>{destinationPhone}</td>
                                        <td></td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>{destinationAddress}</td>
                                        <td></td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>{destinationRegion}</td>
                                        <td></td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>Dată și oră livrare</td>
                                        <td>{date}{' '}{hour}</td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>Metodă livrare</td>
                                        {
                                            methoddelivery === "livrareafara" ? <td>Livrare în afara orașului - 20 lei</td>
                                            : methoddelivery === "livrarebuzau" ? <td>Livrare gratuită în Buzău</td> :
                                            <td>Ridicare personală din florărie</td>
                                        }
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td >Metodă plată</td>
                                        {
                                            payment === "platacard" ? <td>Plată card</td>
                                            :  <td>Plată la livrare</td> 
                                        }
                                    </tr>
                                </tbody>
                            </Table>
                            <Table responsive style={{backgroundColor:"white", marginTop:"20px"}}>
                                <thead style={{backgroundColor:"lightgrey"}}>
                                    <tr>
                                        <th style={{textAlign:"left", fontSize:"18px"}}>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Subtotal</td>
                                        <td>{itemsPrice} LEI</td>
                                    </tr>
                                    <tr style={{color:"grey"}}>
                                        <td>Taxă de livrare</td>
                                        {methoddelivery === "livrareafara" ? <td>20 LEI</td> : <td>0 LEI</td>}
                                    </tr>
                                    <tr style={{fontWeight:"bold"}}>
                                        <td>Total</td>
                                        {methoddelivery === "livrareafara" ? <td>{itemsPrice+20} LEI</td> : <td>{itemsPrice} LEI</td>}
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row style={{justifyContent:"space-between", paddingLeft:" 50px", paddingRight:"50px", paddingTop:"50px"}}>
                    <Button variant="danger" size="lg" onClick={() => {
                        setProgression(80);
                        setFifthCard(false);
                        setForthCard(true);
                    }}>ÎNAPOI</Button>
                    <Button variant="success" type="submit" size="lg">FINALIZEAZĂ COMANDA</Button>
                    </Row>
                    
                    </Container>
                    :
                    <Container>
                    <Row>
                        <Table striped bordered hover style={{backgroundColor:"white", marginTop:"20px"}} responsive>
                            <thead style={{backgroundColor:"lightgrey"}}>
                                <tr>
                                <th style={{textAlign:"center"}}></th>
                                <th style={{textAlign:"center", fontSize:"14px"}}>Produs</th>
                                <th style={{textAlign:"center", fontSize:"14px"}}>Text felicitare</th>
                                <th style={{textAlign:"center", fontSize:"14px"}}>Preț</th>
                                <th style={{textAlign:"center", fontSize:"14px"}}>Cantitate</th>
                                <th style={{textAlign:"center", fontSize:"14px"}}>Total</th>
                                </tr>
                               
                            </thead>
                            <tbody>
                                {cartItems.map((product) => (
                                    <tr key={product.product} >
                                    <td style={{width:"10%"}}>
                                        <Image src={product.image} style={{width: "8vh", height:"6vh", objectFit:"cover"}}/></td>
                                    <td style={{width:"15%", textAlign: "center", verticalAlign:"middle", fontSize:"12px"}}>{product.name}</td>
                                    <td style={{width:"15%", textAlign: "center", verticalAlign:"middle", fontSize:"12px"}}>{product.textGift}</td>
                                    <td style={{width:"15%", textAlign: "center", verticalAlign:"middle", fontSize:"12px"}}>{product.price} LEI</td>
                                    <td style={{width:"15%", textAlign: "center", verticalAlign:"middle", fontSize:"12px"}}>{product.qty}</td>
                                    <td style={{width:"15%", textAlign: "center", verticalAlign:"middle", fontSize:"12px"}}>{`${(product.qty * product.price).toFixed(2)} LEI`}</td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                            <Table responsive style={{backgroundColor:"white", marginTop:"20px"}}>
                                <thead style={{backgroundColor:"lightgrey"}}>
                                    <tr>
                                    <th style={{textAlign:"left", fontSize:"18px"}}>Informații personale</th>
                                    <th style={{textAlign:"center", fontSize:"18px"}}></th>
                                    </tr>
                                  
                                </thead>
                                <tbody>
                                    <tr style={{height:"40px"}}>
                                        <td>Cumpărător</td>
                                        <td>{firstName}{' '}{lastName}</td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>Telefon</td>
                                        <td>{phone}</td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>Email</td>
                                        <td>{email}</td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>Adresă de facturare</td>
                                        <td>{address}{' '}{country}</td>
                                    </tr>
                                    <tr>
                                        <td>Tip facturare</td>
                                {facturare === "persoanafizica" ? <td>Persoană fizică</td> : <td>Firmă</td>}
                                    </tr>
                                    {
                                        facturare === "firma" && 
                                            <tr>
                                                <td>Denumire firmă și Cod Unic de înregistrare</td>
                                                <td>{companyName}{', '}{cui}</td>
                                            </tr>
                                    }
                                </tbody>
                            </Table>
                            </Row>
                            <Row>
                            <Table responsive style={{backgroundColor:"white", marginTop:"20px"}}>
                                    <thead style={{backgroundColor:"lightgrey"}}>
                                        <tr>
                                        <th style={{textAlign:"left", fontSize:"18px"}}>Observații client / Text felicitare</th>

                                        </tr>
                                        
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Form.Control as="textarea" rows={3} style={{resize:"none"}} placeholder="Dacă ai ceva de adăugat sau ai omis textul pentru felicitare, completează aici" value={comments} onChange={ e => setComments(e.target.value)} />
                                            </td>
                                        </tr>
                                    </tbody>
                            </Table>
                            </Row>
                            
                        <Row>
                            <Table responsive style={{backgroundColor:"white", marginTop:"20px"}}>
                                <thead style={{backgroundColor:"lightgrey"}}>
                                    <tr>
                                        <th style={{textAlign:"left", fontSize:"18px"}}>Livrare și plată</th>
                                        <th style={{textAlign:"center", fontSize:"18px"}}></th>
                                    </tr>
                                    
                                </thead>
                                <tbody>
                                    <tr style={{height:"40px"}}>
                                        <td>{destinationName}</td>
                                        <td></td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>{destinationPhone}</td>
                                        <td></td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>{destinationAddress}</td>
                                        <td></td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>{destinationRegion}</td>
                                        <td></td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>Dată și oră livrare</td>
                                        <td>{date}{' '}{hour}</td>
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td>Metodă livrare</td>
                                        {
                                            methoddelivery === "livrareafara" ? <td>Livrare în afara orașului - 20 lei</td>
                                            : methoddelivery === "livrarebuzau" ? <td>Livrare gratuită în Buzău</td> :
                                            <td>Ridicare personală din florărie</td>
                                        }
                                    </tr>
                                    <tr style={{height:"40px"}}>
                                        <td >Metodă plată</td>
                                        {
                                            payment === "platacard" ? <td>Plată card</td>
                                            :  <td>Plată la livrare</td> 
                                        }
                                    </tr>
                                </tbody>
                            </Table>
                            </Row>
                            <Row>
                            <Table responsive style={{backgroundColor:"white", marginTop:"20px"}}>
                                <thead style={{backgroundColor:"lightgrey"}}>
                                    <tr>
                                        <th style={{textAlign:"left", fontSize:"18px"}}>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Subtotal</td>
                                        <td>{itemsPrice} LEI</td>
                                    </tr>
                                    <tr style={{color:"grey"}}>
                                        <td>Taxă de livrare</td>
                                        {methoddelivery === "livrareafara" ? <td>20 LEI</td> : <td>0 LEI</td>}
                                    </tr>
                                    <tr style={{fontWeight:"bold"}}>
                                        <td>Total</td>
                                        {methoddelivery === "livrareafara" ? <td>{itemsPrice+20} LEI</td> : <td>{itemsPrice} LEI</td>}
                                    </tr>
                                </tbody>
                            </Table>
                            </Row>
                            
                    <Row style={{justifyContent:"space-between", paddingLeft:" 50px", paddingRight:"50px", paddingTop:"50px"}}>
                    <Button variant="danger" size="lg" style={{marginBottom:"8px"}}onClick={() => {
                        setProgression(80);
                        setFifthCard(false);
                        setForthCard(true);
                    }}>ÎNAPOI</Button>
                    <Button variant="success" type="submit" size="lg">FINALIZEAZĂ COMANDA</Button>
                    </Row>
                    
                    </Container>
                    :
                    null
                }
                       </Form>
            </Styles>

        </Layout>
    
        
    )
}