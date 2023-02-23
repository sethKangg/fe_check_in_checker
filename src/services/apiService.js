import axios from 'axios';
const postCreateUser = (email) => {
   const data = new FormData();
   data.append('email', email);
   return axios.post('html', data);
};

const getAllUser = () => {
   return axios.get('api/..');
};

const updateUser = (email) => {
   const data = new FormData();
   data.put('email', email);
   return axios.post('html', data);
};

const deleteUser = (id) => {
   return axios.put('html', { data: { id: id } });
};

const getUserPage = (page, limit) => {
   return axios.get(`html?page=${page}&limit=${limit}`);
};

export { postCreateUser, getAllUser, updateUser, deleteUser, getUserPage };
