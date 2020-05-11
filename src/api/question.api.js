import agent from "../libs/agent";

export const createQuestion = async (data) => {
  const result = await agent.post("/questions/create", data);

  return result.data;
};

export const listQuestions = async (query) => {
  const result = await agent.get("/questions", {
    params: query,
  });

  return result.data;
};

export const getQuestion = async (id) => {
  const result = await agent.get("/questions/" + id);

  return result.data;
};

export const updateQuestionStatus = async (user) => {
  const result = await agent.patch(`/questions/${user._id}/status`);

  return result.data;
};
