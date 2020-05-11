import agent from "../libs/agent";

export const login = async (user) => {
  const result = await agent.post("/auth/login", user);

  return result.data;
};