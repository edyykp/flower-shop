import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { saveProduct } from './actions/productActions';
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
export const ProductsScreen = props => {

    const [validated, setValidated] = useState(false);

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('bucheteflori');
    const [madeOf, setMadeOf] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const productSave = useSelector(state=> state.productSave);
    const {loading: loadingSave, success: successSave, error: errorSave } = productSave;
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(successSave) {
            window.location.reload(false);
        }
        return () => {

        };
    }, [successSave]);

    const submitHandler = (e) => {
        setValidated(true);
        e.preventDefault();
        if(e.target.checkValidity() === true)
            dispatch(saveProduct({name, image, price, category, madeOf, description}));
    }

    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        Axios
          .post('/api/uploads', bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            setImage(response.data);
            setUploading(false);
          })
          .catch((err) => {
            console.log(err);
            setUploading(false);
          });
    }

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
      
        window.addEventListener('resize', handleResize)
    });

    return (
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingTop:"40px", paddingBottom:"82px"}}>
            <Styles>
                {width > 800 ?
                <Card style={{width:"40%"}}>
                <Card.Header>
                    <h2>Administrare produse</h2>
                </Card.Header>
                <Card.Body>
                    <Card.Title >
                        <h3>Adăugați produs nou</h3>
                    </Card.Title>
                        {(loadingSave || uploading) && <Spinner animation="border" variant="secondary" />}
                        
                                    {errorSave && <div style={{color:"black", fontWeight:"bold", textAlign:"center", border:"2px solid red", backgroundColor:"#DA7E7E"}}>Eroare neașteptată. Încearcă din nou.</div>}
                    <Form onSubmit={submitHandler} noValidate validated={validated}>
                        <Form.Group >
                            <Form.Control type="text" placeholder="Denumire produs" onChange={(e) => setName(e.target.value)} required maxLength={100}/>
                            <Form.Text className="text-muted">
                                Titlul buchetului/aranjamentului.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.File label="Selectează imagine" required onChange={uploadFileHandler}/>
                        </Form.Group>

                        <Form.Group >
                            <Form.Control type="text" placeholder="Preț" onChange={(e) => setPrice(e.target.value)} required maxLength={10}/>
                            <Form.Text className="text-muted">
                                Prețul buchetului, doar în cifre. (exemple: 110,   99.99,     24.9)
                            </Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Control type="text" placeholder="Alcătuit din" onChange={(e) => setMadeOf(e.target.value)} required maxLength={200}/>
                            <Form.Text className="text-muted">
                                Din ce este alcătuit buchetul. (exemplu: 23 lalele, 4 trandafiri, 8 hortensii)
                            </Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Control as="textarea"  style={{resize: "none"}} placeholder="Desriere" onChange={(e) => setDescription(e.target.value)} rows={10} required maxLength={400}/>
                            <Form.Text className="text-muted">
                                O scurtă descriere a buchetului care să atragă atenția utilizatorului.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Categorie</Form.Label>
                            <Form.Control as="select" onChange={(e) => setCategory(e.target.value)} defaultValue="Alege..." required>
                                <option value="bucheteflori">Buchete de flori</option>
                                <option value="aranjamenteflori">Aranjamente florale</option>
                                <option value="trandafiricriogenati">Trandafiri criogenați</option>
                                <option value="plante">Plante</option>
                                <option value="buchetedemireasa">Buchete de mireasă</option>
                                <option value="lumanaridecununie">Lumânări de cununie</option>
                                <option value="aranjamentefloralesala">Aranjamente florale de sală</option>
                                <option value="buchetenasa">Buchete pentru nașă</option>
                                <option value="aranjamentecristelnita">Aranjamente cristelniță</option>
                                <option value="lumanari">Lumânări</option>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                Categoria în care va fi afișat produsul.
                            </Form.Text>
                        </Form.Group>
                        <Button type="submit" style={{width: "100%", height:"50px", backgroundColor:"purple", color:"lightgrey", borderColor:"purple", fontSize:"20px"}}>
                            <strong>Adaugă produs</strong>
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            :
            <Card style={{width:"90%"}}>
                    <Card.Header>
                        <h2>Administrare produse</h2>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title >
                            <h3>Adăugați produs nou</h3>
                        </Card.Title>
                            {(loadingSave || uploading) && <Spinner animation="border" variant="secondary" />}
                            
                                        {errorSave && <div style={{color:"black", fontWeight:"bold", textAlign:"center", border:"2px solid red", backgroundColor:"#DA7E7E"}}>Eroare neașteptată. Încearcă din nou.</div>}
                        <Form onSubmit={submitHandler} noValidate validated={validated}>
                            <Form.Group >
                                <Form.Control type="text" placeholder="Denumire produs" onChange={(e) => setName(e.target.value)} required maxLength={100}/>
                                <Form.Text className="text-muted">
                                    Titlul buchetului/aranjamentului.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.File label="Selectează imagine" required onChange={uploadFileHandler}/>
                            </Form.Group>

                            <Form.Group >
                                <Form.Control type="text" placeholder="Preț" onChange={(e) => setPrice(e.target.value)} required maxLength={10}/>
                                <Form.Text className="text-muted">
                                    Prețul buchetului, doar în cifre. (exemple: 110,   99.99,     24.9)
                                </Form.Text>
                            </Form.Group>
                            <Form.Group >
                                <Form.Control type="text" placeholder="Alcătuit din" onChange={(e) => setMadeOf(e.target.value)} required maxLength={200}/>
                                <Form.Text className="text-muted">
                                    Din ce este alcătuit buchetul. (exemplu: 23 lalele, 4 trandafiri, 8 hortensii)
                                </Form.Text>
                            </Form.Group>
                            <Form.Group >
                                <Form.Control as="textarea"  style={{resize: "none"}} placeholder="Desriere" onChange={(e) => setDescription(e.target.value)} rows={10} required maxLength={400}/>
                                <Form.Text className="text-muted">
                                    O scurtă descriere a buchetului care să atragă atenția utilizatorului.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Categorie</Form.Label>
                                <Form.Control as="select" onChange={(e) => setCategory(e.target.value)} defaultValue="Alege..." required>
                                    <option value="bucheteflori">Buchete de flori</option>
                                    <option value="aranjamenteflori">Aranjamente florale</option>
                                    <option value="trandafiricriogenati">Trandafiri criogenați</option>
                                    <option value="plante">Plante</option>
                                    <option value="buchetedemireasa">Buchete de mireasă</option>
                                    <option value="lumanaridecununie">Lumânări de cununie</option>
                                    <option value="aranjamentefloralesala">Aranjamente florale de sală</option>
                                    <option value="buchetenasa">Buchete pentru nașă</option>
                                    <option value="aranjamentecristelnita">Aranjamente cristelniță</option>
                                    <option value="lumanari">Lumânări</option>
                                </Form.Control>
                                <Form.Text className="text-muted">
                                    Categoria în care va fi afișat produsul.
                                </Form.Text>
                            </Form.Group>
                            <Button type="submit" style={{width: "100%", height:"50px", backgroundColor:"purple", color:"lightgrey", borderColor:"purple", fontSize:"20px"}}>
                                <strong>Adaugă produs</strong>
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            }
                
            </Styles>
        </Layout>
    )
}