import axios from "../utils/axiosCustomize";
const postCreateUser = (
   username,
   password,
   roleId,
   email,
   firstName,
   surname,
   dateOfBirth,
   phone,
) => {
   let data = {
      username: username,
      password: password,
      roleId: +roleId,
      staffDTO: {
         email: email,
         firstName: firstName,
         surname: surname,
         phone: phone,
         dateOfBirth: dateOfBirth,
         promotionLevelId: 1,
      },
   };

   return axios.post("accounts/addAccount", data);
};

const getAllUser = () => {
   return axios.get("accounts/getAllAccount");
};

const updateUser = (email) => {
   const data = new FormData();
   data.put("email", email);
   return axios.post("html", data);
};

const deleteUser = (id) => {
   return axios.put("html", { data: { id: id } });
};

const getUserPage = (page, limit) => {
   return axios.get(`accounts/getAllAccount?page=${page}&size=${limit}`);
};

const postLogin = (username, password) => {
   return axios.post(`auth/login`, { username, password });
};

const getTestAPI = () => {
   return axios.get("entries");
};

const getCombineUser = (page, size, searchValue, filterMode) => {
   return axios.get(
      `accounts/getAllAccount?page=${page}&size=${size}&username=${searchValue}&filter=${filterMode}`,
   );
};

export {
   postCreateUser,
   getAllUser,
   updateUser,
   deleteUser,
   getUserPage,
   postLogin,
   getTestAPI,
   getCombineUser,
};
