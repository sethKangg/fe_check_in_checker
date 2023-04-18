import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import imgURLBase from "../../../assets/Images/success-by-date/2023-03-24/bao_vu_2023-03-24T03_42_55.519865300_0.810034.jpg";

import { getViewCaptured } from "../../../services/apiService";
import "./ViewCaptured.css";
import TableCaptured from "./TableCaptured";
const ViewCaptured = () => {
   const account = useSelector((state) => state.user.account);
   // console.log(account);
   const maxDate = new Date().toISOString().substring(0, 10);
   const toDay = new Date();
   const minDate = new Date(toDay.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10);
   const [startDay, setStartDay] = useState(new Date().toISOString().substring(0, 10));
   const [endDay, setEndDay] = useState(new Date().toISOString().substring(0, 10));

   const [listVB, setListVB] = useState([]);
   const [onlyMe, setOnlyMe] = useState(0);
   const [isError, setIsError] = useState(0);
   const [searchValue, setSearchValue] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const [pageCount, setPageCount] = useState(1);
   const [isEnding, setIsEnding] = useState(false);
   const [indexBtn, setIndexBtn] = useState(1);
   const LIST_LIMIT = 10;
   const debouncedSearchTerm = useDebounce(searchValue, 800);
   const fetchListCaptured = async () => {
      let res = await getViewCaptured(
         account.id,
         onlyMe,
         isError,
         startDay,
         endDay,
         debouncedSearchTerm,
         currentPage,
         LIST_LIMIT,
      );
      if (res.status === 200) {
         console.log(res.data);
         let down = _.chain(res.data.content)
            .groupBy("verifyDate")
            .map((objs, key) => ({
               verifyDate: key,
               data: objs,
            }))
            .value();
         let final = {
            list: {
               ...down,
            },
            size: res.data.size,
            pageCount: res.data.totalPages,
            isEnding: res.data.last,
         };
         // const list = Object.values(final.list).map((item) => JSON.parse(item));
         const list = Object.values(final.list);
         setListVB(list);
         setPageCount(final.pageCount);
         console.log(final);
         // console.log("down list>>>", down);
      }
   };

   const clickBtnIdx = (ind) => {
      setIndexBtn(ind);
      setSearchValue("");
      setCurrentPage(1);
      if (ind === 1) {
         setIsError(0);
         setOnlyMe(0);
      } else if (ind === 2) {
         setIsError(0);
         setOnlyMe(1);
      } else {
         setIsError(1);
         setOnlyMe(0);
      }
   };

   const handleSrcImg = (img) => {
      let src = null;
      try {
         src = require(`../../../assets/Images${img}`);
      } catch {
         src = require(`../../../assets/error.jpg`);
      }
      return src;
   };
   const handleSearch = (e) => {
      setCurrentPage(1);
      setSearchValue(e.target.value);
   };
   useEffect(() => {
      // console.log(startDay);
      fetchListCaptured();
   }, [onlyMe, isError, startDay, endDay, debouncedSearchTerm, currentPage]);
   return (
      <div className="container-3 d-flex flex-column">
         <div className="title-vc">
            <h2 className="d-flex justify-content-center">
               Bảng thống kê nhận diện khuôn mặt của nhân viên
            </h2>
         </div>
         <div>
            <InputGroup className="my-3">
               <Form.Control
                  placeholder="Tìm theo tên tài khoản"
                  value={searchValue}
                  onChange={(e) => handleSearch(e)}
               />
            </InputGroup>
         </div>
         <div className=" d-flex justify-content-between ">
            <div className="">
               <div className="mb-1">Bắt đầu từ</div>
               <input
                  type="date"
                  max={endDay}
                  min={minDate}
                  onChange={(e) => setStartDay(e.target.value)}
                  defaultValue={startDay}
                  pattern="\d{1,2}/\d{1,2}/\d{4}"
                  placeholder="dd/MM/yyyy"
               />
            </div>

            <div className="">
               <div className="mb-1">Đến ngày </div>
               <input
                  type="date"
                  max={maxDate}
                  min={startDay}
                  onChange={(e) => setEndDay(e.target.value)}
                  defaultValue={endDay}
                  // pattern="\d{1,2}/\d{1,2}/\d{4}"
                  // placeholder="dd/MM/yyyy"
               />
            </div>
         </div>
         <div className="d-flex justify-content-between mt-3 align-items-center ">
            <div className="d-flex gap-3 ">
               <button
                  className={`${indexBtn === 1 ? "btn-view-active" : "btn-view"}`}
                  onClick={(e) => clickBtnIdx(1)}
               >
                  TẤT CẢ
               </button>
               <button
                  className={`${indexBtn === 2 ? "btn-view-active" : "btn-view"}`}
                  onClick={(e) => clickBtnIdx(2)}
               >
                  BẢN THÂN
               </button>
               <button
                  className={`${indexBtn === 3 ? "btn-view-active" : "btn-view"}`}
                  onClick={(e) => clickBtnIdx(3)}
               >
                  ẢNH LỖI
               </button>
            </div>

            {/* <div className="d-flex gap-3 ">
               <button className="btn-slash">Cài đặt</button>
               <button className="btn-slash">Sửa</button>
               <button className="btn-slash">Chọn tất cả</button>
            </div> */}
         </div>
         <div>
            <TableCaptured
               listVB={listVB}
               setCurrentPage={setCurrentPage}
               pageCount={pageCount}
               handleSrcImg={handleSrcImg}
            />
         </div>
      </div>
   );
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
};

export default ViewCaptured;
