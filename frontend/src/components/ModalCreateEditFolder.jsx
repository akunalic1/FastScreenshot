import React, { useState } from "react";
import IconsDropdow from "./IconsDropdow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import axios from "axios";
import "../style/modal.css";
import "../style/app.css";

const ModalCreateEditFolder = ({
  parentFolder,
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
      parentFolder: parentFolder?.id,
      category: parentFolder?.category,
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
    setfolderName("");
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
        onClick={handleCloseModal}
      >
        <div className="modal">
          <div className="modal-wrapper">
            <FontAwesomeIcon
              className="sidebar-button modal-close-button"
              onClick={handleCloseModal}
              icon={faClose}
            ></FontAwesomeIcon>
            <form method="POST">
              <input
                className="folder-name-input"
                value={folderName}
                onChange={handleChangeFolderName}
                placeholder="Folder name"
              ></input>
              <IconsDropdow
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
              ></IconsDropdow>
              <button className="submit-folder-button" onClick={handleSumbit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateEditFolder;
