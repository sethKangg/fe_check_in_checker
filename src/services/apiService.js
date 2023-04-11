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
   return axios.post(`auth/login`, {
      username: username + "",
      password: password + "",
   });
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

const getAllGroup = (page, size, groupName, staff) => {
   return axios.get(
      `groups/getAllGroups?page=${page}&size=${size}&groupName=${groupName}&staffId=${staff}`,
   );
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

const getAllProjects = (page, size, searchValue, staff) => {
   return axios.get(
      `projects/getAllProject?size=${size}&page=${page}&name=${searchValue}&staffId=${staff}`,
   );
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
   let data = {
      staffId: [memberId],
      projectId: "" + projectId,
   };
   return axios.delete(`projects/removeStaffFromProject`, {
      data: { staffId: [memberId], projectId: "" + projectId },
   });
};

const fetchListAvaiableStaff = (groupId) => {
   return axios.get(`staffs/getAvailableStaff/${groupId}`);
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
   axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
   return axios.put(`projects/editProject/${projectId}`, data);
};

const getStaffGroup = (groupId, page, size) => {
   return axios.get(`groups/getAllStaffInGroup?groupId=${groupId}&page=${page}&size=${size}`);
};

const getProfile = (username) => {
   return axios.get(`accounts/getProfile/${username}`);
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

const putProfile = (accountId, surname, firstName, dateOfBirth, phone) => {
   let data = {
      firstName,
      surname,
      dateOfBirth,
      phone,
   };
   return axios.put(`accounts/updateAccount/${accountId}`, {
      firstName: firstName,
      surname: surname,
      dateOfBirth: dateOfBirth,
      phone: phone,
   });
};

const getViewCaptured = (staffId, onlyMe, isError, startTime, endTime, name, page, size) => {
   return axios.get(
      `image/image-verify?staffId=${staffId}&onlyMe=${onlyMe}&isError=${isError}&startTime=${startTime}&endTime=${endTime}&name=${name}&page=${page}&size=${size}`,
   );
};

const getCalendar = (staffId, year, month) => {
   return axios.get(`timesheets/getTimesheet/${staffId}?yearMonth=${year}-${month}`);
};

const postImgTraining = (staffId, img) => {
   let data = {
      imgs: [img],
   };
   // return axios.post(`check-in/${staffId}/facial-recognition/setup`, data);
   return axios.post(`image-setup/setup/${staffId}`, data);
};

const getImgTrainStaff = (staffId) => {
   return axios.get(`staffs/${staffId}/get-image-setup?size=10`);
};

const postComplain = (content, typeId) => {
   let data = {
      content: content,
      complaintTypeId: typeId,
   };
   return axios.post(`complaints/sendComplaint`, data);
};
const fetchComplaint = (page, size, statusC, staff) => {
   return axios.get(
      `complaints/getAllComplaints?page=${page}&size=${size}&status=${statusC}&staffId=${staff}`,
   );
};
const putComplain = (complainId, complainStatus) => {
   return axios.put(`complaints/updateComplaint/${complainId}/${complainStatus}`);
};

const getListOptionComplaints = () => {
   return axios.get(`complaints/getAllComplaintTypes`);
};

const getListGL = () => {
   return axios.get(`staffs/getListGLAvailable`);
};
const deleteImgTraining = (staffId) => {
   return axios.put(`image-setup/remove-staff-setup/${staffId}`);
};
const forgotPass = (email) => {
   return axios.post(`accounts/sendForgotPassword?email=${email}`);
};
const changePassword = (staffId, pass, newPass, comfirmPass) => {
   let data = {
      password: pass,
      newPassword: newPass,
      confirmNewPassword: comfirmPass,
   };
   return axios.put(`accounts/changePassword/${staffId}`, data);
};
const getStaffByRole = (role) => {
   return axios.get(`staffs/getStaffByRole?role=${role}`);
};
const deleteMemberInGroup = (member) => {
   let data = {
      staffId: [member],
   };
   return axios.delete(`groups/removeStaffFromGroup`, {
      data: { staffId: [member] },
   });
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
   putProfile,
   getViewCaptured,
   getCalendar,
   postImgTraining,
   getImgTrainStaff,
   postComplain,
   fetchComplaint,
   putComplain,
   getListOptionComplaints,
   getListGL,
   deleteImgTraining,
   forgotPass,
   changePassword,
   getStaffByRole,
   deleteMemberInGroup,
};
