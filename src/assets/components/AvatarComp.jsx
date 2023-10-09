import React from "react";
import Avatar from "@mui/material/Avatar";

export const AvatarComp = ({ name }) => {
  function stringToColor(str) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < str.length; i += 1) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(str) {
    if (!str) return { children: "" }; // Return an empty string if str is undefined

    const names = str.split(" ");
    const initials = names.map((name) => name[0]).join(""); // This will not throw an error if name is undefined

    return {
      sx: {
        bgcolor: stringToColor(str),
      },
      children: initials,
    };
  }

  return (
    <div className="flex justify-center items-center ">
      <Avatar {...stringAvatar(name)} />
    </div>
  );
};
