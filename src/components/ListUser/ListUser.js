import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineFileAdd } from 'react-icons/ai';
import { BiImport, BiExport } from 'react-icons/bi';
import _ from 'lodash';
import { debounce } from 'lodash';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';
import ReactPaginate from 'react-paginate';

import { getApi } from '../../services/getApi';
import User from '../User/User';
import ModalEdit from '../ModalEdit/ModalEdit';
import ModalDelete from '../ModalDelete/ModalDelete';
import { UserContext } from '../../context/UserContext';
import Notification from '../ModalNotification/Notification';

import './listUser.scss';

function ListUser() {
    const [listUser, setListUser] = useState([]);
    const [showModalUser, setShowModalUser] = useState(false);

    // edit
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({}); // variable này lưu data user bị onclick vào

    // delete
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});

    // paginate
    const [totalPage, setTotalPage] = useState(0);

    // sort
    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUser(cloneListUser);
    };

    const { user } = useContext(UserContext);

    const [dataExport, setDataExport] = useState([]);

    useEffect(() => {
        fetch(1);
    }, []);

    const fetch = async (page) => {
        const res = await getApi(page);

        if (res && res.data.length > 0) {
            let data = res.data;
            setListUser(data);
            setTotalPage(res.total_pages);
        }
    };

    const handleUpdateListUser = (user) => {
        setListUser([user, ...listUser]);
    };

    const handleUpdateUserModal = (user) => {
        let cloneListUser = [...listUser];
        let index = listUser.findIndex((item) => item.id === user.id);
        cloneListUser[index].first_name = user.first_name;
    };

    const handleClose = () => {
        setShowModalUser(false);
        setShowModalEdit(false);
        setShowModalEdit(false);
        setShowModalDelete(false);
    };

    const handleModalEdit = (user) => {
        setShowModalEdit(true);
        setDataUserEdit(user);
    };

    // paginate
    const handlePageClick = (e) => {
        fetch(e.selected + 1);
    };

    const handleDelete = (user) => {
        setShowModalDelete(true);
        setDataUserDelete(user);
    };

    const handleDeleteUserModal = (user) => {
        let cloneListUser = [...listUser];
        cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
        setListUser(cloneListUser);
    };

    const handleSearchEmail = debounce((e) => {
        if (e.target.value) {
            setListUser(listUser.filter((item) => item.email.includes(e.target.value)));
        } else {
            fetch(1);
        }
    }, 1000);

    const getListUsers = (event, done) => {
        let result = [];
        result.push(['ID', 'First name', 'Last name', 'Email']);
        if (listUser && listUser.length > 0) {
            listUser.map((item) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.first_name;
                arr[2] = item.last_name;
                arr[3] = item.email;
                return result.push(arr);
            });

            setDataExport(result);
            done();
        }
    };

    const handleImport = (e) => {
        if (e.target.files && e.target.files[0]) {
            let file = e.target.files[0];

            if (file.type !== 'text/csv') {
                return;
            }

            Papa.parse(file, {
                complete: function (results) {
                    let rawCSV = results.data;
                    console.log(rawCSV);
                    console.log(rawCSV[4].length);

                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 4) {
                            if (
                                rawCSV[0][0] !== 'ID' ||
                                rawCSV[0][1] !== 'first_name' ||
                                rawCSV[0][2] !== 'last_name' ||
                                rawCSV[0][3] !== 'email'
                            ) {
                                alert('Error format file');
                            } else {
                                let fileImport = [];

                                rawCSV.map((item, index) => {
                                    let arr = [];
                                    if (index > 0 && item.length === 4) {
                                        arr.id = item[0];
                                        arr.first_name = item[1];
                                        arr.last_name = item[2];
                                        arr.email = item[3];
                                    }

                                    return fileImport.push(arr);
                                });

                                setListUser(fileImport);
                            }
                        }
                    }
                },
            });
        }
    };

    return (
        <>
            {user && user.auth ? (
                <div className="list-container">
                    <div className="d-flex justify-content-between m-3">
                        <h5>ListUser:</h5>
                        <div className="group-btn">
                            <label htmlFor="import" className="btn btn-success">
                                <BiImport /> Import
                            </label>
                            <input type="file" id="import" hidden onChange={(e) => handleImport(e)} />

                            <CSVLink
                                filename={'my-file.csv'}
                                className="btn btn-warning"
                                data={dataExport}
                                // 2 props dưới có thể bỏ qua nếu không muốn custom lại data
                                asyncOnClick={true}
                                onClick={getListUsers}
                            >
                                <BiExport /> Export
                            </CSVLink>

                            <Button variant="primary" onClick={() => setShowModalUser(true)}>
                                <AiOutlineFileAdd /> Add user
                            </Button>
                        </div>
                    </div>

                    <input
                        placeholder="Search your email..."
                        onChange={(e) => handleSearchEmail(e)}
                        className="mb-3  col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-3"
                    />

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="iconArrow">
                                    <span>ID</span>
                                    <span>
                                        <AiOutlineArrowDown className="icon" onClick={() => handleSort('desc', 'id')} />
                                        <AiOutlineArrowUp className="icon" onClick={() => handleSort('asc', 'id')} />
                                    </span>
                                </th>
                                <th>
                                    <div className="first_name">
                                        <span>First Name</span>
                                        <span>
                                            <AiOutlineArrowDown
                                                className="icon"
                                                onClick={() => handleSort('desc', 'first_name')}
                                            />
                                            <AiOutlineArrowUp
                                                className="icon"
                                                onClick={() => handleSort('asc', 'first_name')}
                                            />
                                        </span>
                                    </div>
                                </th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUser &&
                                listUser.length > 0 &&
                                listUser.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.first_name}</td>
                                            <td>{item.last_name}</td>
                                            <td>{item.email}</td>
                                            <td className="btn-handle">
                                                <Button variant="primary" onClick={() => handleModalEdit(item)}>
                                                    Edit
                                                </Button>

                                                <Button variant="danger" onClick={() => handleDelete(item)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>

                    {/* paginate*/}
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={4}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />

                    <User show={showModalUser} handleClose={handleClose} handleUpdateListUser={handleUpdateListUser} />

                    <ModalEdit
                        show={showModalEdit}
                        handleClose={handleClose}
                        dataUserEdit={dataUserEdit}
                        handleUpdateUserModal={handleUpdateUserModal}
                    />

                    <ModalDelete
                        show={showModalDelete}
                        handleClose={handleClose}
                        dataUserDelete={dataUserDelete}
                        handleDeleteUserModal={handleDeleteUserModal}
                    />
                </div>
            ) : (
                <Notification />
            )}
        </>
    );
}

export default ListUser;
