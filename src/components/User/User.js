import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { createUser } from '../../services/getApi';

function User(props) {
    const { show, handleClose, handleUpdateListUser } = props;

    // input modal
    const [nameModal, setNameModal] = useState('');
    const [jobModal, setJobModal] = useState('');

    const handleSave = async () => {
        const res = await createUser(nameModal, jobModal);
        if (res && res.id) {
            handleUpdateListUser({ id: res.id, first_name: res.name });
            handleClose();
            setNameModal();
            setJobModal();
        } else {
            console.log('error');
        }
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new a user</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={nameModal}
                            onChange={(e) => setNameModal(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Job"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={jobModal}
                            onChange={(e) => setJobModal(e.target.value)}
                        />
                    </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSave()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default User;
