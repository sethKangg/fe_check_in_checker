import React from "react";
import { useState } from "react";
import { exportData, getMonthlyReport } from "../../services/apiService";
import { useEffect } from "react";
import "./Report.css";
import moment from "moment";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
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

   const sixMonthsAgo = moment().subtract(6, "months");
   const options = [];

   // generating options from current month to 6 months ago
   while (sixMonthsAgo.isBefore(moment())) {
      const monthString = sixMonthsAgo.format("YYYY-MM");
      options.push(
         <option key={monthString} value={monthString}>
            {monthString}
         </option>,
      );
      sixMonthsAgo.add(1, "month");
   }

   return (
      <div>
         <div className="d-flex justify-content-between align-content-center align-items-center py-3">
            <div>
               <h2 onClick={() => console.log(data)}>Báo cáo {date}</h2>
            </div>
            <div className="d-flex gap-3 align-items-center">
               <div>Chọn tháng : </div>
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
         <table className="table-bordered w-100 justify-content-around align-items-center">
            <thead>
               <tr className="">
                  <th className="">Name</th>
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
                        <td>{user.staffName}</td>
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
