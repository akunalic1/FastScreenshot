module.exports = findAllSubfolders = (folders) => {
  return folders
    .map((folder) => {
      const subfolders = folders.filter(
        (folder2) => folder2.parentFolder === folder.id
      );
      if (subfolders.length) findAllSubfolders(subfolders);
      folder.subfolders = subfolders;
      return folder;
    })
    .filter((folder) => folder.parentFolder === null);
};
