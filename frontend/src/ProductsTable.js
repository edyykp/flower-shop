import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, saveProduct, deleteProduct } from './actions/productActions';
import { Layout } from './components/Layout';
import { Table, Button, Modal, Form, Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .modal {
        z-index:2001;
    }
`;
export const ProductsTable = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const [validated, setValidated] = useState(false);
    
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Buchete de flori');
    const [madeOf, setMadeOf] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState('');
    const productList = useSelector(state => state.productList);
    const {loading, products, error} = productList;

    const productSave = useSelector(state=> state.productSave);
    const productDelete = useSelector(state=> state.productDelete);
    const {loading: loadingSave, success: successSave, error: errorSave } = productSave;
    const {loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    const dispatch = useDispatch();

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        setMadeOf(product.madeOf);
        setCategory(product.category);
      };

    useEffect(() => {
        if(successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {

        };
    }, [successSave, successDelete, dispatch]);

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setValidated(true);
        dispatch(saveProduct({_id: id, name, image, price, category, madeOf, description}));
        setModalVisible(false);
    }

    return (
        loading || loadingDelete || loadingSave? 
        <Layout style={{background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", height:"100vh",justifyContent:"center"}}>
                <Spinner animation="border" variant="secondary" style={{position:"absolute", top:"50%", left: "50%"}}/>
        </Layout> 
        :
        <Layout style={{height:"100vh",background: "linear-gradient(rgba(50,0,0,0.5),transparent)", width: "100%", maxWidth: "100%", backgroundColor: "#A071A9", paddingTop:"40px", paddingBottom:"20px"}}>
            {(error || errorSave || errorDelete ) && alert("A apărut o eroare neașteptată. Încearcă din nou.")}
            <Table striped bordered hover style={{backgroundColor:"white", marginTop:"20px"}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nume produs</th>
                        <th>Preț</th>
                        <th>Categorie</th>
                        <th>Alcătuire</th>
                        <th>Imagine</th>
                        <th>Descriere</th>
                    </tr>
                   
                </thead>
                <tbody>
                    {products.map((product) => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.madeOf}</td>
                        <td>{product.image}</td>
                        <td>{product.description}</td>
                        <td>
                        <Button variant="info" onClick={() => openModal(product)}>
                            Edit
                        </Button>{' '}
                        <Button
                            variant="danger"
                            onClick={() => deleteHandler(product)}
                        >
                            Delete
                        </Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </Table>
            <Styles>
            <Modal
                show={modalVisible}
                backdrop="static"
                keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>
                        Editează produsul
                        </Modal.Title>
                        
                    </Modal.Header>
                    <Modal.Body>
                    <Form  onSubmit={submitHandler} noValidate validated={validated}>
                            <Form.Group >
                                <Form.Control type="text" placeholder="Denumire produs" onChange={(e) => setName(e.target.value)} value={name}required/>
                                <Form.Text className="text-muted">
                                    Titlul buchetului/aranjamentului.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" value={image} required onChange={(e) => setImage(e.target.value)} />
                                <Form.Text className="text-muted">
                                    Imaginea produsului
                                </Form.Text>
                            </Form.Group>

                            <Form.Group >
                                <Form.Control type="text" placeholder="Preț" onChange={(e) => setPrice(e.target.value)} required value={price}/>
                                <Form.Text className="text-muted">
                                    Prețul buchetului, doar în cifre. (exemple: 110,   99.99,     24.9)
                                </Form.Text>
                            </Form.Group>
                            <Form.Group >
                                <Form.Control type="text" placeholder="Alcătuit din" onChange={(e) => setMadeOf(e.target.value)} required value={madeOf}/>
                                <Form.Text className="text-muted">
                                    Din ce este alcătuit buchetul. (exemplu: 23 lalele, 4 trandafiri, 8 hortensii)
                                </Form.Text>
                            </Form.Group>
                            <Form.Group >
                                <Form.Control as="textarea"  style={{resize: "none"}} value={description} placeholder="Desriere" onChange={(e) => setDescription(e.target.value)} rows={10} required/>
                                <Form.Text className="text-muted">
                                    O scurtă descriere a buchetului care să atragă atenția utilizatorului.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Categorie</Form.Label>
                                <Form.Control as="select" onChange={(e) => setCategory(e.target.value)} value={category} required>
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
                                <strong>Editează produs</strong>
                            </Button>
                            <Button 
                            variant="dark" 
                            style={{width: "100%", height:"50px", fontSize:"20px", marginTop:"5px"}}
                            onClick={() => setModalVisible(false)}>
                                <strong>Anulează</strong>
                            </Button>
                        </Form>
                    </Modal.Body>
            </Modal>
            </Styles>
        </Layout>
    )
}