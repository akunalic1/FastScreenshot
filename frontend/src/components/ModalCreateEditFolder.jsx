import React, { useState, useEffect, createRef } from "react";
import IconsDropdow from "./IconsDropdow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import axios from "../api/axios";
import "../style/modal.css";
import "../style/app.css";
import CategoryDropdown from "./CategoryDropdown";

const ModalCreateEditFolder = ({
  parentFolder,
  openModal,
  setOpenModal,
  setFolders,
  openedMenuOption,
}) => {
  const [folderName, setfolderName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("fa-folder");
  const [folderCategory, setFolderCategory] = useState({
    value: "photo",
    text: "Photo",
    icon: null,
  });

  const folderNameInputRef = createRef();

  useEffect(() => {
    clearValidationBorder();
  }, []);

  useEffect(() => {
    openedMenuOption && ["Folders", "Photos", "Tags"].includes(openedMenuOption)
      ? setFolderCategory({
          value: "photo",
          text: "Photo",
          icon: null,
        })
      : setFolderCategory({
          value: "video",
          text: "Video",
          icon: null,
        });
  }, [openedMenuOption]);

  const clearValidationBorder = () => {
    folderNameInputRef?.current?.classList.remove("success");
    folderNameInputRef?.current?.classList.remove("error");
  };

  const addFolderToDb = async () => {
    axios.post("/folders", {
      name: folderName,
      icon: selectedIcon?.value,
      type: "custom",
      parentFolder: parentFolder?.id || null,
      category: parentFolder?.category || folderCategory.value,
    });
  };

  const getAllFolders = async () => {
    const resp = await axios.get("/folders/all");
    setFolders(resp.data);
  };

  const handleChangeFolderName = (e) => {
    if (e.target.value.length > 2) {
      folderNameInputRef.current.classList.remove("error");
      folderNameInputRef.current.classList.add("success");
    } else {
      folderNameInputRef.current.classList.remove("success");
      folderNameInputRef.current.classList.add("error");
    }
    setfolderName(e.target.value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (
      !folderNameInputRef.current.classList.value.includes("error") &&
      folderNameInputRef.current.value.length !== 0
    ) {
      await addFolderToDb();
      setOpenModal(false);
      setfolderName("");
      await getAllFolders();
    }
  };

  const handleCloseModal = (e) => {
    setOpenModal(false);
    clearValidationBorder();
  };

  return (
    <div>
      <div
        className={classNames("shaddow", {
          //  hide: !openModal,
        })}
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
                ref={folderNameInputRef}
              ></input>
              {openedMenuOption === "Folders" && (
                <CategoryDropdown
                  folderCategory={folderCategory}
                  setFolderCategory={setFolderCategory}
                  openedMenuOption={openedMenuOption}
                ></CategoryDropdown>
              )}
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
