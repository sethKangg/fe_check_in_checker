import _, { values } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { toast } from "react-toastify";
import {
   getAllMemberInProject,
   fetchListAvaiableStaff,
   postAddStaffProject,
   putStatusProject,
} from "../../services/apiService";
import ModalRemoveStaff from "./ModalRemoveStaff";
import TableMemberProject from "./TableMemberProject";
import { components } from "react-select";
import ModalConfirmDone from "./ModalConfirmDone";
import ModalInfo from "../User/ModalInfo";
import ModalSetStaffPM from "./ModalSetStaffPM";
const ModalViewProject = (pros) => {
   const { show, setShow, fetchListProject, PAGE_LIMIT, dataView } = pros;

   const handleClose = () => {
      setShow(false);
   };
   //    const handleShow = () => pros.setShow(true);

   const newGroupName = useRef("");
   const [listSelected, setListSelected] = useState([]);
   const [listMember, setListMember] = useState([]);
   const [listStaff, setListStaff] = useState([]);
   const [pageCount, setPageCount] = useState(1);
   const [currentPage, setCurrentPage] = useState(1);
   const [searchValue, setSearchValue] = useState("");
   const [dateRemove, setDataRemove] = useState([]);
   const LIMIT_MEMBER = 10;
   const [showRemove, setShowRemove] = useState(false);

   const [isLoading, setIsLoading] = useState(false);
   const [isLoading1, setIsLoading1] = useState(false);
   const [showDone, setShowDone] = useState(false);
   const [showInfo, setShowInfo] = useState(false);
   const [paramId, setParamId] = useState([]);
   const handleRemove = (item) => {
      setDataRemove(item);
      setShowRemove(true);
      // console.log(item);
   };

   const postStaffToProject = async (staffId, projectId) => {
      let res = await postAddStaffProject(staffId, projectId);
      if (res.status == 200) {
         toast.success("Thêm nhân viên thành công");
      }
   };
   const fetchListMemberProject = async (projectId, page, size) => {
      setIsLoading(true);
      try {
         const response = await getAllMemberInProject(projectId, page, size);
         //   const data = await response.json();
         //console.log(data);
         if (response.status == 200) {
            // console.log("LIST MEMBER: ", response);
            setListMember(response.data.list);
            setPageCount(response.data.allPages);
         }
      } catch (error) {
         // console.log("Error", error);
      } finally {
         setIsLoading(false);
      }
   };

   const fetchListStaff = async () => {
      setIsLoading1(true);
      try {
         const response = await fetchListAvaiableStaff(dataView.groupId);
         //   const data = await response.json();
         //console.log(data);
         if (response.status == 200) {
            // console.log("LIST Staff: ", response);
            setListStaff(response.data.list);
            // listSelected.current.value = response?.data?.list[0]?.id;
         }
      } catch (error) {
         // console.log("Error", error);
      } finally {
         setIsLoading1(false);
      }
   };

   useEffect(() => {
      const fetchData = async () => {
         if (show === true) {
            let res = await fetchListMemberProject(dataView.id, currentPage, LIMIT_MEMBER);
            let res2 = await fetchListStaff();
            // console.log(dataView);
         }
         // let res = await fetchListMemberProject(dataView.id);
         // Process the response here
      };

      fetchData();
   }, [show, currentPage]);

   const handleSubmit = async () => {
      // console.log(listSelected);
      let res = await postStaffToProject(listSelected, dataView.id);
      // if (res.status === 200) {
      //    toast.success(`Thêm thành công ${listSelected.length} thành viên !`);
      // }
      await fetchListMemberProject(dataView.id, 1, LIMIT_MEMBER);
      await fetchListStaff();
      handleClose();
      //   pros.setCurrentPage(1);
      //   return fetchListProject(1, "");
   };

   const handleDone = async () => {
      let res = await putStatusProject(dataView.id, 2);
      if (res.status == 200) {
         toast.success(`Cập nhật dự án ${dataView.projectName} thành công`);
         handleClose();
         await fetchListProject(1, "");
      } else {
         toast.error("Có lỗi trong quá trình cập nhật");
      }
   };

   // console.log("dataView", dataView);
   const newArray = listStaff.map((item) => {
      return { value: item.id, label: `${item.fullName} #${item.id}` };
   });
   const NoOptionsMessage = (props) => {
      return (
         <components.NoOptionsMessage {...props}>
            Không có nhân viên nào khả dụng
         </components.NoOptionsMessage>
      );
   };
   const handleClickInfo = (item) => {
      setShowInfo(true);
      setParamId(item);
   };
   // const handleClickSet = (item) => {
   //    setShowSet(true);
   //    setDataSet(item);
   // };
   return (
      <>
         <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header>
               <Modal.Title className="w-100">
                  <div className="d-flex justify-content-between">
                     <div>
                        Dự án{" "}
                        <b>
                           {dataView.projectName} - {dataView.id}
                        </b>
                     </div>
                     <div>
                        {dataView.status === "Processing" && (
                           <button className="btn btn-warning" onClick={() => handleDone()}>
                              Kết thúc dự án
                           </button>
                        )}
                     </div>
                  </div>
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {!isLoading && !isLoading1 ? (
                  <div className="row g-3">
                     <div className=" col-md-12  ">
                        <div className="d-flex justify-content-between">
                           <div>
                              <label>
                                 Người phụ trách: {dataView.projectManagerName} #{dataView.id}
                              </label>
                           </div>
                           <div>
                              <label>Thuộc nhóm: {dataView.projectName}</label>
                           </div>
                           <div>
                              <label>
                                 Trạng thái dự án:{" "}
                                 {dataView.status === "Done"
                                    ? "Hoàn thành"
                                    : dataView.status === "Cancel"
                                    ? "Hủy bỏ"
                                    : "Đang trong tiến trình"}
                              </label>
                           </div>
                        </div>
                        {dataView.status === "Processing" && (
                           <>
                              <label className="form-label">Thêm nhân viên mới</label>
                              <Select
                                 onChange={(event) => setListSelected(event)}
                                 className="basic-single"
                                 classNamePrefix="rt_sl_option"
                                 // defaultValue={newArray[0]}
                                 isClearable={true}
                                 isSearchable={true}
                                 closeMenuOnSelect={false}
                                 isMulti={true}
                                 // name="color"
                                 options={newArray}
                                 components={{ NoOptionsMessage }}
                              />
                           </>
                        )}
                     </div>
                     <div className="table-user mt-3">
                        <TableMemberProject
                           PAGE_LIMIT={LIMIT_MEMBER}
                           listMember={listMember}
                           pageCount={pageCount}
                           currentPage={currentPage}
                           searchValue={searchValue}
                           setCurrentPage={setCurrentPage}
                           handleRemove={handleRemove}
                           fetchListMember={fetchListMemberProject}
                           projectId={dataView.id}
                           data={dataView}
                           handleClickInfo={handleClickInfo}
                        />
                     </div>
                  </div>
               ) : (
                  <div>Đang tải dữ liệu ...</div>
               )}
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Đóng
               </Button>
               <Button variant="primary" onClick={handleSubmit}>
                  Thêm thành viên
               </Button>
            </Modal.Footer>
            <ModalRemoveStaff
               PAGE_LIMIT={LIMIT_MEMBER}
               fetchListMemberProject={fetchListMemberProject}
               show={showRemove}
               setShow={setShowRemove}
               dataDelete={dateRemove}
               projectId={dataView.id}
            />
         </Modal>
         <ModalConfirmDone show={showDone} setShow={setShowDone} confirm={handleDone} />
         <ModalInfo
            show={showInfo}
            setShow={setShowInfo}
            idParams={paramId.staffId}
            modalTitle={paramId.fullName}
            setId={setParamId}
         />
         {/* <ModalSetStaffPM
            show={showSet}
            setShow={setShowSet}
            data={dataSet}
            setData={setDataSet}
            fetchListMemberProject={fetchListMemberProject}
            projectId={dataView.id}
         /> */}
      </>
   );
};

export default ModalViewProject;
