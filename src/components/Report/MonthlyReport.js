import React from "react";
import { useState } from "react";
import { getMonthlyReport } from "../../services/apiService";
import { useEffect } from "react";
import "./Report.css";
import moment from "moment";
import { Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
const MonthlyReport = () => {
   var XLSX = require("xlsx");
   const [data, setData] = useState([]);
   const today = new Date();
   const [month, setMonth] = useState((today.getMonth() + 1).toString().padStart(2, "0"));
   const [year, setYear] = useState(today.getFullYear());
   const [date, setDate] = useState(`${year}-${month}`);
   const [responseBody, setResponseBody] = useState("");
   const navigate = useNavigate();
   const fetchData = async (date) => {
      let res = await getMonthlyReport(date);
      console.log(res);
      if (res.status === 200) {
         setData(res.data);
      }
   };
   const getTotalDays = () => {
      const [year, month] = date.split("-").map((str) => parseInt(str));
      return new Date(year, month, 0).getDate();
   };
   useEffect(() => {
      fetchData(date);
      getTotalDays();
   }, [date]);

   const exportExcel = () => {
      window.open(
         `https://cts-backend.azurewebsites.net/reports/export?monthYear=${date}`,
         "_blank",
      );
   };
   const [selectedMonth, setSelectedMonth] = useState("");

   const sixMonthsAgo = moment().subtract(3, "months").startOf("month"); //thêm startOf('month') để bắt đầu từ đầu tháng
   const options = [];

   // generating options from current month to 6 months ago
   const convertDate = (date) => {
      const dateVN = moment(date).format("[Tháng] MM [năm] YYYY"); // for "Tháng 03 năm 2023"
      return dateVN;
   };
   while (sixMonthsAgo.isSameOrBefore(moment())) {
      //thay isBefore() thành isSameOrBefore() để tính cả tháng hiện tại
      const monthString = sixMonthsAgo.format("YYYY-MM");
      options.push(
         <option key={monthString} value={monthString}>
            {convertDate(monthString)}
         </option>,
      );
      sixMonthsAgo.add(1, "month");
   }
   return (
      <div>
         <div className="d-flex justify-content-between align-content-center align-items-center py-3">
            <div>
               <h2 onClick={() => console.log(data)}>Báo cáo {convertDate(date)}</h2>
            </div>

            <div className="d-flex gap-3 align-items-center">
               <div>Chọn thời gian : </div>
               <Form>
                  <Form.Group controlId="formMonthSelect" className="">
                     {/* <Form.Label onClick={() => console.log(selectedMonth)}></Form.Label> */}
                     <Form.Control
                        as="select"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                     >
                        {/* <option value="">-- Select --</option> */}
                        {options}
                     </Form.Control>
                  </Form.Group>
               </Form>
            </div>
         </div>
         <div className="mt-3">
            <h4>Ghi chú:</h4>
            <div className="d-flex gap-3 justify-content-center align-items-center">
               <div className="d-flex gap-2">
                  <label>Đi đúng giờ:</label>
                  <div className="right_time px-2">Đ</div>
               </div>
               <div className="d-flex gap-2">
                  <label>Đi muộn:</label> <div className="late px-2">M</div>
               </div>
               <div className="d-flex gap-2">
                  <label>Nghỉ làm:</label> <div className="not_go px-2">N</div>
               </div>
               <div className="d-flex gap-2">
                  <label>Ngày lễ:</label> <div className="holiday px-2">L</div>
               </div>
               <div className="d-flex gap-2">
                  <label>Không có dữ liệu:</label>
                  <div
                     className="px-2 "
                     style={{
                        outline: "3px solid black",
                     }}
                  >
                     _
                  </div>
               </div>
            </div>
         </div>
         <table className="table-bordered mt-3 w-100 justify-content-around align-items-center">
            <thead>
               <tr className="">
                  {/* <th>STT</th> */}
                  <th className="px-2">Tên nhân viên</th>
                  {[...Array(getTotalDays())].map((e, i) => (
                     <th key={i} className="w-days">
                        {i + 1}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {data &&
                  data.map((user, index) => (
                     <tr key={index}>
                        {/* <td>{index + 1}</td> */}
                        <td className="px-2">
                           {user.staffName} #{user.staffId}
                        </td>
                        {user.dayCheck &&
                           user.dayCheck.map((e, i) => (
                              <td
                                 key={i}
                                 className={`w-days ${
                                    e === 1
                                       ? `right_time `
                                       : e === 2
                                       ? `late `
                                       : e === 3
                                       ? `not_go`
                                       : e === 4
                                       ? `holiday`
                                       : `not_yet`
                                 } `}
                              >
                                 {e === 1
                                    ? `Đ`
                                    : e === 2
                                    ? `M`
                                    : e === 3
                                    ? `N`
                                    : e === 4
                                    ? `L`
                                    : `_`}
                              </td>
                           ))}
                     </tr>
                  ))}
            </tbody>
         </table>
         <div className="mt-3 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={() => exportExcel()}>
               Xuất dữ liệu
            </button>
         </div>
      </div>
   );
};

export default MonthlyReport;
