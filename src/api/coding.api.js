import agent from "../libs/agent";

export const runTest = async (data) => {
  const result = await agent.post("/coding/run", data);

  return result.data;
};