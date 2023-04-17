import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCalendar, getStaff } from "../../services/apiService";
import "./Calendar.css";
import ViewCalendar from "./ViewCalendar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import { components } from "react-select";
const Calendar = (pros) => {
   const params = useParams();
   const account = useSelector((state) => state.user.account);
   const [idParams, setIdParams] = useState(account.id);
   const [nameTitle, setNameTitle] = useState(`${account.staffName} #${account.id}`);
   const [show, setShow] = useState(false);
   const [dataClick, setDataClick] = useState("");
   const [dataList, setDataList] = useState([]);
   const [selectValue, setSelectValue] = useState([]);
   const today = new Date();
   // const [activeDay, setActiveDay] = useState("");
   const [month, setMonth] = useState(today.getMonth());
   const [year, setYear] = useState(today.getFullYear());
   const [prev, setPrev] = useState();
   const [after, setAfter] = useState();
   const [days, setDays] = useState();
   const [prevDays, setPrevDays] = useState();
   const [listDay, setListDay] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isLoading1, setIsLoading1] = useState(false);
   const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
   ];
   const prevMonth = () => {
      const newMonth = month - 1;
      const newYear = year - (newMonth === -1 ? 1 : 0);

      setMonth(newMonth === -1 ? 11 : newMonth);
      setYear(newMonth === -1 ? year - 1 : newYear);
   };

   const nextMonth = () => {
      const newMonth = month + 1;
      const newYear = year + (newMonth === 12 ? 1 : 0);

      setMonth(newMonth === 12 ? 0 : newMonth);
      setYear(newYear);
   };
   const initCalendar = () => {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const prevLastDay = new Date(year, month, 0);
      const prevDays = prevLastDay.getDate();
      const lastDate = lastDay.getDate();
      const day = firstDay.getDay();
      const nextDays = 7 - lastDay.getDay() - 1;

      // console.log("console.log(month, year);", month, year);

      setPrev(day);
      setPrevDays(prevDays);
      setDays(lastDate);
      setAfter(nextDays);
   };

   const handleClickDay = (day) => {
      // console.log(month + 1, month === today.getMonth(), year === today.getFullYear());
      // const date = new Date(
      //    `${year}-${month + 1 < 10 ? "0" + (month + 1) : month + 1}-${
      //       day + 1 < 10 ? "0" + (day + 1) : day + 1
      //    }`,
      // );
      const date = new Date(`${year}-${month + 1}-${day + 1}`);
      if (date > today.getTime()) return toast.error("Chỉ xem được thông tin đến ngày hôm nay");
      setShow(true);
      setDataClick(day);
   };

   const fetchDataCalendar = async () => {
      let monthApi = month + 1;
      if (monthApi < 10) monthApi = "0" + monthApi;
      let res = await getCalendar(idParams, year, monthApi);
      // console.log("res>>>", res.data);
      if (res.status === 200) {
         setListDay(res.data.dto.dayCheck);
      }
   };

   const fetchListStaff = async () => {
      try {
         setIsLoading1(true);
         let res = await getStaff(1, 99, "", 2);
         if (res.status === 200) {
            setDataList(res.data.list);
            setSelectValue(account.id);
            // console.log(res.data);
         } else {
            toast.error("Có lỗi khi load danh sách lịch của nhân viên khác");
         }
      } catch (error) {
      } finally {
         setIsLoading1(false);
      }
   };
   useEffect(() => {
      fetchListStaff();
   }, []);
   useEffect(() => {
      fetchDataCalendar();
      initCalendar();
   }, [month, year, idParams]);
   const NoOptionsMessage = (props) => {
      return (
         <components.NoOptionsMessage {...props}>
            Không có tùy chọn khả dụng
         </components.NoOptionsMessage>
      );
   };
   const newArray = dataList.map((item) => {
      return { value: item.id, label: `${item.fullName} #${item.id}` };
   });
   const handleSelect = (e) => {
      setIdParams(e.value);
      setNameTitle(e.label);
   };
   return (
      <>
         <div className="container-2">
            <div className="left">
               <div className="my-3">
                  <h1 onClick={() => console.log(idParams === selectValue)}>
                     Lịch chấm công
                     <b> {months[month]} </b>
                     của
                     <b
                        style={{
                           color: "#ffeb4b",
                        }}
                     >
                        {" "}
                        {nameTitle}
                     </b>
                  </h1>
               </div>
               <div className="calendar">
                  <div className="month">
                     <i className="fas fa-angle-left prev" onClick={() => prevMonth()}>
                        Tháng trước
                     </i>
                     <div className="date" onClick={() => console.log(listDay)}>
                        <b>{months[month] + " Năm " + year}</b>
                     </div>
                     <i className="fas fa-angle-right next" onClick={() => nextMonth()}>
                        Tháng sau
                     </i>
                  </div>
                  <div className="weekdays">
                     <div>CN</div>
                     <div>T2</div>
                     <div>T3</div>
                     <div>T4</div>
                     <div>T5</div>
                     <div>T6</div>
                     <div>T7</div>
                  </div>
                  <div className="days">
                     {/* prev */}
                     {[...Array(prev)].map((e, i) => (
                        <div key={i} className="day prev-date">
                           {prevDays - prev + i + 1}
                        </div>
                     ))}
                     {/* days */}
                     {/* {[...Array(days)].map((e, i) => ( */}
                     {listDay.map((e, i) => (
                        <div
                           key={i}
                           className={`
                     day 
                     ${
                        i + 1 === new Date().getDate() &&
                        year === new Date().getFullYear() &&
                        month === new Date().getMonth() &&
                        `today `
                        // `right_time`
                        // `late`
                     }
                     
                     ${
                        e === 1
                           ? `right_time `
                           : e === 2
                           ? `late `
                           : e === 3
                           ? `not_go`
                           : e === 4
                           ? `holiday`
                           : `not_yet`
                     }

                     `}
                           onClick={() => {
                              handleClickDay(i);
                           }}
                        >
                           {i + 1}
                        </div>
                     ))}
                     {/* days after */}
                     {[...Array(after)].map((e, i) => (
                        <div key={i} className="day next-date ">
                           {i + 1}
                        </div>
                     ))}
                  </div>
                  <div className="goto-today">
                     <button
                        className="today-btn"
                        onClick={() => {
                           setMonth(today.getMonth());
                           setYear(today.getFullYear());
                        }}
                     >
                        Trở về tháng hiện nay
                     </button>
                  </div>
               </div>
            </div>
            <div className="right">
               <div>
                  {isLoading1 ? (
                     "Đang tải dữ liệu"
                  ) : (
                     <Select
                        // ref={assignGroupLeader}
                        onChange={(event) => handleSelect(event)}
                        className="basic-single"
                        classNamePrefix="rt_sl_option"
                        value={selectValue}
                        options={newArray}
                        isSearchable={true}
                        // closeMenuOnSelect={false}
                        placeholder={<div>Chọn lịch theo nhân viên</div>}
                        components={{ NoOptionsMessage }}
                     />
                  )}
               </div>

               <div className="d-flex align-items-center mt-3 ">
                  <div className="box right_time"></div>
                  <div className=""> : Đi đúng giờ</div>
               </div>
               <div className="d-flex align-items-center mt-3">
                  <div className="box late"></div>
                  <div className=""> : Đi muộn </div>
               </div>
               <div className="d-flex align-items-center mt-3">
                  <div className="box not_go"></div>
                  <div className=""> : Không đi làm </div>
               </div>
               <div className="d-flex align-items-center mt-3">
                  <div className="box holiday   "></div>
                  <div className=""> : Ngày lễ </div>
               </div>
            </div>
            <button className="add-event">
               <i className="fas fa-plus"></i>
            </button>
         </div>
         {/* {month === todaynth() && year === today.getFullYear() && ( */}
         <ViewCalendar
            show={show}
            setShow={setShow}
            day={dataClick}
            month={month}
            year={year}
            idParams={idParams}
            initCalendar={initCalendar}
            fetchDataCalendar={fetchDataCalendar}
         />
      </>
   );
};

export default Calendar;
