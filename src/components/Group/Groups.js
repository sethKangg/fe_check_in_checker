import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Card, Button, InputGroup, Form } from "react-bootstrap";
import "./Group.scss";
import { getAllGroup } from "../../services/apiService";
import ModalAddGroup from "./ModalAddGroup";
import ModalViewGroup from "./ModalViewGroup";
import { useSelector } from "react-redux";
const Groups = () => {
   const numCards = 35; // number of cards to display
   const cards = [];

   const [currentPage, setCurrentPage] = useState(1);
   const [searchValue, setSearchValue] = useState("");
   const [showModalView, setShowModalView] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [dataView, setDataView] = useState([]);
   const PAGE_LIMIT = 10;
   const debouncedSearchTerm = useDebounce(searchValue, 800);
   const [listGroup, setListGroup] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const account = useSelector((state) => state.user.account);
   const staffId = account.roleName === "Human resource" ? "0" : account.id;

   const fetchListGroup = async (page, size, searchValue) => {
      try {
         setIsLoading(true);
         let res = await getAllGroup(page, size, searchValue, staffId);
         // console.log("groupData : ", res);
         if (res.status == 200) {
            setListGroup(res.data.list);
            // setPageCount(res.data.allPages);
         }
      } catch (error) {
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      const fetchData = async () => {
         let res = await fetchListGroup(currentPage, PAGE_LIMIT, searchValue);
         // Process the response here
      };

      fetchData();
   }, [currentPage, debouncedSearchTerm]);

   const handleSearch = (e) => {
      setSearchValue(e.target.value);
      setCurrentPage(1);
      // let res = await fetchListUser(1, PAGE_LIMIT, searchValue, filterIndex);
      // console.log(res);
   };
   const handleShowHideModal = (value) => {
      setShowModal(value);
   };
   // create an array of cards to display
   for (let i = 1; i <= numCards; i++) {
      cards.push(
         <Col xs={12} sm={8} md={6} lg={4} key={i} className="mt-3 ">
            <Card>
               <Card.Body>
                  <Card.Title>Group {i}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Group Leader</Card.Subtitle>
                  <Card.Text>Status</Card.Text>
                  <Button variant="primary">View</Button>
               </Card.Body>
            </Card>
         </Col>,
      );
   }
   const handleView = (item) => {
      setShowModalView(true);
      setDataView(item);
   };
   if (isLoading)
      return (
         <div className="mt-3 py-3 d-flex justify-content-center">
            <h3>Đang tải dữ liệu</h3>
         </div>
      );
   return (
      <>
         <Container fluid className="py-5">
            <div>
               <InputGroup className=" my-3">
                  <Form.Control
                     placeholder="Tìm theo tên nhóm"
                     value={searchValue}
                     onChange={(e) => handleSearch(e)}
                  />
               </InputGroup>
            </div>

            {/* <Row className="justify-content-center"> */}
            {/* <Col xs={12} md={12} lg={12}> */}
            <ListGroup className="list-group-flush">
               <Row className="">
                  {account.roleName === "Human resource" && (
                     <Col xs={12} sm={8} md={6} lg={4} className="mt-3  ">
                        <Card className="card-add">
                           <Card.Body className="d-flex align-items-center">
                              <div className="buttons" onClick={() => handleShowHideModal(true)}>
                                 <div className="fill">Thêm nhóm mới </div>
                              </div>
                           </Card.Body>
                        </Card>
                     </Col>
                  )}
                  {listGroup.map((group, index) => {
                     return (
                        <Col xs={12} sm={8} md={6} lg={4} key={group.id} className="mt-3  ">
                           <Card>
                              <Card.Body>
                                 <Card.Title>
                                    <b>{group.groupName}</b>
                                 </Card.Title>
                                 <Card.Subtitle className="mb-2 text-muted">
                                    Trưởng nhóm: <b>{group.groupLeaderName}</b>
                                 </Card.Subtitle>
                                 {/* <Card.Text>Status</Card.Text> */}
                                 <div className="d-flex justify-content-end w-100 ">
                                    <Button variant="primary" onClick={() => handleView(group)}>
                                       Chi tiết
                                    </Button>
                                 </div>
                              </Card.Body>
                           </Card>
                        </Col>
                     );
                  })}
               </Row>
            </ListGroup>
            {/* </Col> */}
            {/* </Row> */}
         </Container>
         {account.roleName === "Human resource" && (
            <ModalAddGroup
               PAGE_LIMIT={PAGE_LIMIT}
               show={showModal}
               setShow={handleShowHideModal}
               fetchListGroup={fetchListGroup}
            />
         )}
         <ModalViewGroup show={showModalView} setShow={setShowModalView} dataView={dataView} />
      </>
   );
};

function useDebounce(value, delay) {
   // State and setters for debounced value
   const [debouncedValue, setDebouncedValue] = useState(value);

   useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);

      return () => {
         clearTimeout(handler);
      };
   }, [value, delay]);

   return debouncedValue;
}

export default Groups;
