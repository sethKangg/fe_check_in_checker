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

const postAddStaffProject = (staffObj, projectId) => {
   // let data = {
   //    staffId: staffId,
   //    projectId: projectId,
   // };
   const newArray = staffObj.map((obj) => obj.value + "");
   const resultObject = { staffId: newArray, projectId: projectId + "" };
   return axios.post(`projects/addStaffToProject`, resultObject);
};

const getAllMemberInProject = (projectID, page, size) => {
   return axios.get(
      `projects/getAllStaffInProject?projectId=${projectID}&page=${page}&size=${size}`,
   );
};

const deleteMemberInProject = (memberId, projectId) => {
   // var data = JSON.stringify({
   //    staffId: [memberId],
   //    projectId: "" + projectId,
   // });

   // var config = {
   //    method: "delete",
   //    maxBodyLength: Infinity,
   //    url: "https://cts-backend.azurewebsites.net/projects/removeStaffFromProject",
   //    headers: {
   //       "Content-Type": "application/json",
   //    },
   //    data: data,
   // };

   // axios(config).then(function (response) {
   //    return response;
   // });
   let data = {
      staffId: [memberId],
      projectId: "" + projectId,
   };
   return axios.delete(`projects/removeStaffFromProject`, {
      data: { staffId: [memberId], projectId: "" + projectId },
   });
};

const fetchListAvaiableStaff = () => {
   return axios.get(`staffs/getAvailableStaff`);
};

const putStatusProject = (projectId, statusNum) => {
   return axios.put(`projects/changeProjectStatus/${projectId}/${statusNum}`);
};

const getListPMAvaiable = () => {
   return axios.get(`staffs/getListPMAvailable`);
};

const postNewProject = (projectName, projectManagerId, groupId) => {
   let data = {
      projectName: projectName,
      projectManagerId: projectManagerId,
      groupId: groupId,
      status: "In Progressing",
   };
   return axios.post(`projects/addProject`, data);
};

const putProject = (projectId, projectName, projectManagerId, groupId) => {
   let data = {
      projectName: projectName,
      projectManagerId: projectManagerId,
      groupId: groupId,
   };
   return axios.put(`projects/editProject/${projectId}`, data);
};

const getStaffGroup = (groupId, page, size) => {
   return axios.get(`groups/getAllStaffInGroup?groupId=${groupId}&page=${page}&size=${size}`);
};

const getProfile = (username) => {
   return axios.get(`profiles/${username}`);
};

const addRecognizeImg = (img) => {
   let data = {
      imageSetupVggDTO: {
         imgs: [img],
      },
   };
   return axios.post(`check-in/facial-recognition/verify`, data);
};

const getStaffAvaiableGroup = () => {
   return axios.get("staffs/getListStaffAvailableAddToGroup");
};

const postAddStaffGroup = (staffObj, groupId) => {
   const newArray = staffObj.map((obj) => obj.value);
   const resultObject = { staffId: newArray, projectId: groupId };
   return axios.post(`groups/addStaffToGroup`, resultObject);
};

// const deleteStaffGroup = ()

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
   postAddStaffProject,
   getAllMemberInProject,
   deleteMemberInProject,
   fetchListAvaiableStaff,
   putStatusProject,
   getListPMAvaiable,
   postNewProject,
   putProject,
   getStaffGroup,
   getProfile,
   addRecognizeImg,
   getStaffAvaiableGroup,
   postAddStaffGroup,
};
