import React, { useState } from "react";
import "../style/modal.css";
import IconsDropdow from "./IconsDropdow";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

const ModalCreateEditFolder = ({
  parentFolderId,
  openModal,
  setOpenModal,
  setFolders,
}) => {
  const [folderName, setfolderName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("fa-folder");

  const addFolderToDb = async () => {
    axios.post("http://localhost:3001/folders", {
      name: folderName,
      icon: selectedIcon?.value,
      type: "custom",
      parentFolder: parentFolderId,
    });
  };

  const getAllFolders = async () => {
    const resp = await axios.get("http://localhost:3001/folders/all");
    setFolders(resp.data);
  };

  const handleChangeFolderName = (e) => {
    setfolderName(e.target.value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    await addFolderToDb();
    setOpenModal(false);
    await getAllFolders();
  };

  const handleCloseModal = (e) => {
    setOpenModal(false);
  };

  return (
    <div>
      <div
        className={classNames("shaddow", {
          hide: !openModal,
        })}
      >
        <div className="modal">
          <FontAwesomeIcon
            onClick={handleCloseModal}
            icon={faClose}
          ></FontAwesomeIcon>
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
            <button onClick={handleSumbit}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateEditFolder;
