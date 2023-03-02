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
   var data = JSON.stringify({
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
   });

   var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://192.168.1.13:8080/accounts/addAccount",
      headers: {
         "Content-Type": "application/json",
      },
      data: data,
   };

   axios(config)
      .then(function (response) {
         // console.log(JSON.stringify(response));
      })
      .catch(function (error) {
         // console.log(error);
      });
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
