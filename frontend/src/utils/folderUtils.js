import axios from "../api/axios";

export const getAllFolders = async (callback) => {
  const resp = await axios.get("/folders/all");
  callback(resp.data);
};
