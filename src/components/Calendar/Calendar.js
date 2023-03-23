import React, { useEffect, useState } from "react";
import "./Calendar.css";
const Calendar = () => {
   const today = new Date();
   // const [activeDay, setActiveDay] = useState("");
   const [month, setMonth] = useState(today.getMonth());
   const [year, setYear] = useState(today.getFullYear());
   const [prev, setPrev] = useState();
   const [after, setAfter] = useState();
   const [days, setDays] = useState();
   const [prevDays, setPrevDays] = useState();
   const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];
   const prevMonth = () => {
      const newMonth = month - 1;
      const newYear = year - (newMonth === -1 ? 1 : 0);

      // Set the new month and year values to the state
      setMonth(newMonth === -1 ? 11 : newMonth);
      setYear(newMonth === -1 ? year - 1 : newYear);
   };

   const nextMonth = () => {
      const newMonth = month + 1;
      const newYear = year + (newMonth === 12 ? 1 : 0);

      // Set the new month and year values to the state
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

      console.log("console.log(month, year);", month, year);

      setPrev(day);
      setPrevDays(prevDays);
      setDays(lastDate);
      setAfter(nextDays);

      // console.log("prev day >>>", day);
      // console.log("days >>>", lastDate);
      // console.log("next days >>>", nextDays);
   };
   useEffect(() => {
      initCalendar();
   }, [month, year]);
   return (
      <div className="container-2">
         <div className="left">
            <div className="calendar">
               <div className="month">
                  <i className="fas fa-angle-left prev" onClick={() => prevMonth()}>
                     Tháng trước
                  </i>
                  <div className="date">{months[month] + " " + year} </div>
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
                        {prevDays - i + 1}
                     </div>
                  ))}
                  {/* days */}
                  {[...Array(days)].map((e, i) => (
                     <div
                        key={i}
                        className={`day ${
                           i === new Date().getDate() &&
                           year === new Date().getFullYear() &&
                           month === new Date().getMonth() &&
                           `today active`
                        }`}
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

                  {/* <div key={i} className="day prev-date">
                        26
                     </div> */}

                  {/* <div className="day ">1</div>
                  <div className="day today active">21</div>
                  <div className="day next-date">1</div> */}
               </div>
               <div className="goto-today">
                  <div className="goto">
                     <input type="text" placeholder="mm/yyyy" className="date-input" />
                     <button className="goto-btn">Go</button>
                  </div>
                  <button className="today-btn">Today</button>
               </div>
            </div>
         </div>
         {/* <div className="right">
            <div className="today-date">
               <div className="event-day">wed</div>
               <div className="event-date">12th december 2022</div>
            </div>
            <div className="events"></div>
            <div className="add-event-wrapper">
               <div className="add-event-header">
                  <div className="title">Add Event</div>
                  <i className="fas fa-times close"></i>
               </div>
               <div className="add-event-body">
                  <div className="add-event-input">
                     <input type="text" placeholder="Event Name" className="event-name" />
                  </div>
                  <div className="add-event-input">
                     <input type="text" placeholder="Event Time From" className="event-time-from" />
                  </div>
                  <div className="add-event-input">
                     <input type="text" placeholder="Event Time To" className="event-time-to" />
                  </div>
               </div>
               <div className="add-event-footer">
                  <button className="add-event-btn">Add Event</button>
               </div>
            </div>
         </div> */}
         <button className="add-event">
            <i className="fas fa-plus"></i>
         </button>
      </div>
   );
};

export default Calendar;
