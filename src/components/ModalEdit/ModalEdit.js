import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { putUpdateUser } from '../../services/getApi';

function ModalEdit(props) {
    const { show, handleClose, dataUserEdit, handleUpdateUserModal } = props;

    // input modal
    const [nameModal, setNameModal] = useState('');
    const [jobModal, setJobModal] = useState('');

    useEffect(() => {
        setNameModal(dataUserEdit.first_name);
    }, [dataUserEdit]);

    const handleEditUser = async () => {
        let res = await putUpdateUser(nameModal, jobModal);

        if (res && res.updatedAt) {
            handleUpdateUserModal({
                first_name: nameModal,
                id: dataUserEdit.id,
            });
        }
        handleClose();
        setNameModal('');
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalEdit;
