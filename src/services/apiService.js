import axios from 'axios';
const postCreateUser = (email) => {
   const data = new FormData();
   data.append('email', email);
   return axios.post('html', data);
};

const getAllUser = () => {
   return axios.get('api/..');
};
export { postCreateUser, getAllUser };
