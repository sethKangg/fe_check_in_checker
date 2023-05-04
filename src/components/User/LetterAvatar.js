import React from "react";
import "./Avatar.css";
function generateInitials(name) {
   // const initials = name.match(/\b\w/g) || [];
   // return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
   const names = name.split(" ");
   const firstInitial = names[0].charAt(0);
   const lastInitial = names[names.length - 1].charAt(0);
   return `${firstInitial}${lastInitial}`.toUpperCase();
}
const LetterAvatar = (props) => {
   const { name } = props;
   const initials = generateInitials(name);

   return <div className="Avatar">{initials}</div>;
};
export default LetterAvatar;
