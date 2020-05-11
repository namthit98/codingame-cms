import agent from "../libs/agent";
import { forEach } from "lodash";
export const createUser = async (user) => {
  let formData = new FormData();

  forEach(user, (data, key) => {
    formData.append(key, data);
  });

  const result = await agent.post("/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result.data;
};

export const listUser = async () => {
  const result = await agent.get("/users");

  return result.data;
};

export const updateStatus = async (user) => {
  const result = await agent.patch(`/users/${user._id}/status`);

  return result.data;
};

export const changePassword = async (data) => {
  const result = await agent.patch(`/users/change-password`, data);

  return result.data;
};

export const getOwn = async (data) => {
  const result = await agent.get(`/me`);

  return result.data;
};

export const forgetPassword = async ({ email }) => {
  const result = await agent.post(`/users/forget-password`, { email });

  return result.data;
};
