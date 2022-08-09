import React, { useState } from "react";
import "../style/modal.css";
import IconsDropdow from "./IconsDropdow";

const ModalCreateEditFolder = () => {
  const [folderName, setfolderName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("fa-folder");

  const handleChangeFolderName = (e) => {
    setfolderName(e.target.value);
  };

  return (
    <div>
      <div className="shaddow">
        <div className="modal">
          <form method="POST">
            <input
              value={folderName}
              onChange={handleChangeFolderName}
              placeholder="Folder name"
            ></input>
            <IconsDropdow
              selectedIcon={selectedIcon}
              setSelectedIcon={setSelectedIcon}
            ></IconsDropdow>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateEditFolder;
