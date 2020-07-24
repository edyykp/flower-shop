import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { Form, Button, Card } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { saveProduct } from './actions/productActions';

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
        width: 40%;
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
    const [category, setCategory] = useState('Buchete de flori');
    const [madeOf, setMadeOf] = useState('');
    const [description, setDescription] = useState('');
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
    return (
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingTop:"40px", paddingBottom:"82px"}}>
            <Styles>
                <Card>
                    <Card.Header>
                        <h2>Administrare produse</h2>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title >
                            <h3>Adăugați produs nou</h3>
                        </Card.Title>
                        <Card.Text>
                            {loadingSave && <div>Loading..</div>}
                            {errorSave && <div>{errorSave}</div>}
                        <Form onSubmit={submitHandler} noValidate validated={validated}>
                            <Form.Group >
                                <Form.Control type="text" placeholder="Denumire produs" onChange={(e) => setName(e.target.value)} required/>
                                <Form.Text className="text-muted">
                                    Titlul buchetului/aranjamentului.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.File label="Selectează imagine" required onChange={(e) => setImage(e.target.value)}/>
                            </Form.Group>

                            <Form.Group >
                                <Form.Control type="text" placeholder="Preț" onChange={(e) => setPrice(e.target.value)} required/>
                                <Form.Text className="text-muted">
                                    Prețul buchetului, doar în cifre. (exemple: 110,   99.99,     24.9)
                                </Form.Text>
                            </Form.Group>
                            <Form.Group >
                                <Form.Control type="text" placeholder="Alcătuit din" onChange={(e) => setMadeOf(e.target.value)} required/>
                                <Form.Text className="text-muted">
                                    Din ce este alcătuit buchetul. (exemplu: 23 lalele, 4 trandafiri, 8 hortensii)
                                </Form.Text>
                            </Form.Group>
                            <Form.Group >
                                <Form.Control as="textarea"  style={{resize: "none"}} placeholder="Desriere" onChange={(e) => setDescription(e.target.value)} rows={10} required/>
                                <Form.Text className="text-muted">
                                    O scurtă descriere a buchetului care să atragă atenția utilizatorului.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Categorie</Form.Label>
                                <Form.Control as="select" onChange={(e) => setCategory(e.target.value)} defaultValue="Alege..." required>
                                    <option>Buchete de flori</option>
                                    <option>Aranjamente florale</option>
                                    <option>Trandafiri criogenați</option>
                                    <option>Plante</option>
                                    <option>Buchete de mireasă</option>
                                    <option>Lumânări de cununie</option>
                                    <option>Aranjamente florale de sală</option>
                                    <option>Buchete pentru nașă</option>
                                    <option>Aranjamente cristelniță</option>
                                    <option>Lumânări</option>
                                </Form.Control>
                                <Form.Text className="text-muted">
                                    Categoria în care va fi afișat produsul.
                                </Form.Text>
                            </Form.Group>
                            <Button type="submit" style={{width: "100%", height:"50px", backgroundColor:"purple", color:"lightgrey", borderColor:"purple", fontSize:"20px"}}>
                                <strong>Adaugă produs</strong>
                            </Button>
                        </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Styles>
        </Layout>
    )
}