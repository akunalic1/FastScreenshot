import React, { useEffect } from "react";
import icons from "../constants/icons";
import Select from "react-select";

const IconsDropdow = ({ selectedIcon, setSelectedIcon }) => {
  useEffect(() => {
    setSelectedIcon({
      value: "fa-folder",
      text: "Folder",
      icon: icons["fa-folder"],
    });
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedIcon(selectedOption);
  };

  const createOptionsForDropdown = () => {
    return Object.entries(icons).map((icon) => {
      return {
        value: icon[0],
        text: icon[0].replace("fa-", ""),
        icon: icon[1],
      };
    });
  };

  return (
    <div className="icons-dropdown">
      <Select
        placeholder="Select Option"
        value={selectedIcon}
        getOptionLabel={(e) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {e.icon}
            <span style={{ marginLeft: 5 }}>{e.text}</span>
          </div>
        )}
        isSearchable={false}
        options={createOptionsForDropdown()}
        onChange={handleChange}
      />
    </div>
  );
};

export default IconsDropdow;
