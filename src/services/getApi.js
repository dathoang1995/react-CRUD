import instance from './instance';

const getApi = (page) => {
    return instance.get(`/api/users?page=${page}`);
};

const createUser = (name, job) => {
    return instance.post('/api/users', { name, job });
};

const putUpdateUser = (name, job) => {
    return instance.put('/api/users/2', { name, job });
};

const deleteUser = (id) => {
    return instance.delete(`/api/users/${id}`, id);
};

const loginUser = (email, password) => {
    return instance.post('/api/login', { email, password });
};

export { getApi, createUser, putUpdateUser, deleteUser, loginUser };
