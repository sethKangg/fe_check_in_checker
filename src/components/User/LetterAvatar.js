import React from "react";
import "./Avatar.css";
function generateInitials(name) {
   const initials = name.match(/\b\w/g) || [];
   return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
}
const LetterAvatar = (props) => {
   const { name } = props;
   const initials = generateInitials(name);

   return <div className="Avatar">{initials}</div>;
};
export default LetterAvatar;
