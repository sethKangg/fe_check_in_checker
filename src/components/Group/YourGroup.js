import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import "./Group.scss";
import { getAllGroup } from "../../services/apiService";
const YourGroup = () => {
   const numCards = 35; // number of cards to display
   const cards = [];

   const [currentPage, setCurrentPage] = useState(1);
   const [searchValue, setSearchValue] = useState("");

   const PAGE_LIMIT = 99;
   const debouncedSearchTerm = useDebounce(searchValue, 800);
   const [listGroup, setListGroup] = useState([]);
   const fetchListGroup = async (page, size, searchValue) => {
      let res = await getAllGroup(page, size, searchValue);
      console.log("groupData : ", res);
      if (res.status == 200) {
         setListGroup(res.data.list);
         // setPageCount(res.data.allPages);
      }
   };

   useEffect(() => {
      const fetchData = async () => {
         let res = await fetchListGroup(currentPage, PAGE_LIMIT, searchValue);
         // Process the response here
      };

      fetchData();
   }, [currentPage, debouncedSearchTerm]);

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

   return (
      <Container fluid className="p-0">
         <Row className="justify-content-center">
            <Col xs={12} md={12} lg={12}>
               <ListGroup className="list-group-flush">
                  <Row className="">
                     <Col xs={12} sm={8} md={6} lg={4} className="mt-3  ">
                        <Card className="card-add">
                           <Card.Body className="d-flex align-items-center">
                              <div className="buttons">
                                 <div className="fill">Add new group</div>
                              </div>
                           </Card.Body>
                        </Card>
                     </Col>
                     {listGroup.map((group, index) => {
                        return (
                           <Col xs={12} sm={8} md={6} lg={4} key={group.id} className="mt-3  ">
                              <Card>
                                 <Card.Body>
                                    <Card.Title>{group.groupName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                       {group.groupLeaderId}
                                    </Card.Subtitle>
                                    <Card.Text>Status</Card.Text>
                                    <Button variant="primary">View</Button>
                                 </Card.Body>
                              </Card>
                           </Col>
                        );
                     })}
                  </Row>
               </ListGroup>
            </Col>
         </Row>
      </Container>
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

export default YourGroup;
