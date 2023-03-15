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
      `accounts/getAllAccount?page=${page}&size=${size}&username=${searchValue}&enable=${filterMode}`,
   );
};

const getStaff = (page, size, searchValue, filterMode) => {
   return axios.get(
      `staffs/getAllStaff?page=${page}&size=${size}&name=${searchValue}&enable=${filterMode}`,
   );
};

const getListLevel = () => {
   return axios.get(`levels/getAllLevels`);
};

const putLevelStaff = (idStaff, levelUpdate) => {
   return axios.put(`staffs/changePromotionLevel`, {
      staffId: idStaff,
      levelId: levelUpdate,
   });
};

const putStatusAccount = (idAccount) => {
   return axios.put(`accounts/changeEnableAccount/${idAccount}`);
};

const getAllGroup = (page, size, groupName) => {
   return axios.get(`groups/getAllGroups?page=${page}&size=${size}&groupName=${groupName}`);
};

const postCreateGroup = (groupName, groupLeader) => {
   let data = {
      groupName: groupName,
      groupLeader: groupLeader,
   };
   return axios.post(`groups/createGroup`, data);
};

const deleteGroup = (groupID) => {
   return axios.delete(`groups/deleteGroup/${groupID}`);
};

const getAllProjects = (page, size, searchValue) => {
   return axios.get(`projects/getAllProject?size=${size}&page=${page}&name=${searchValue}`);
};

const postAddProject = (staffId, projectId) => {
   let data = {
      staffId: staffId,
      projectId: projectId,
   };
   return axios.post(`projects/addStaffToProject`, data);
};

const getAllMemberInProject = (projectID) => {
   return axios.get(`projects/getAllStaffInProject?projectId=${projectID}`);
};

export {
   putLevelStaff,
   putStatusAccount,
   postCreateUser,
   getAllUser,
   updateUser,
   deleteUser,
   getUserPage,
   postLogin,
   getTestAPI,
   getCombineUser,
   getStaff,
   getListLevel,
   getAllGroup,
   postCreateGroup,
   deleteGroup,
   getAllProjects,
   postAddProject,
   getAllMemberInProject,
};
