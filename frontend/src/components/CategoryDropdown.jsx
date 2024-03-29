import React from "react";
import Select from "react-select";

const CategoryDropdown = ({ folderCategory, setFolderCategory }) => {
  const handleChange = (selectedOption) => {
    setFolderCategory(selectedOption);
  };

  const createOptionsForDropdown = () => {
    return [
      {
        value: "photo",
        text: "Photo",
        icon: null,
      },
      {
        value: "video",
        text: "Video",
        icon: null,
      },
    ];
  };
  return (
    <div className="icons-dropdown">
      <Select
        placeholder="Select folder category"
        value={folderCategory}
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

export default CategoryDropdown;
