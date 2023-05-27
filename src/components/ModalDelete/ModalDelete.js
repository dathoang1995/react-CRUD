// import React, { useState } from 'react';7
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../services/getApi';

function ModalDelete(props) {
    const { show, handleClose, dataUserDelete, handleDeleteUserModal } = props;

    const handleConfirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);
        console.log(res);
        if (res && +res.statusCoded === 204) {
            handleDeleteUserModal(dataUserDelete);
        }
        handleClose();
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure DELETE with
                    <br />
                    email={dataUserDelete.email}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleConfirmDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalDelete;
