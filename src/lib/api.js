import ky from "ky";

const baseUrl =
  process.env.NEXT_ENV === "production"
    ? "https://langchain-ui.vercel.app"
    : "http://localhost:3000";

const api = ky.create({ prefixUrl: baseUrl });

export const ingestData = async (data) =>
  ky.post("/api/datasources/ingest", { json: data }).json();

export const createDatasource = async (data) =>
  ky.post("/api/datasources", { json: data }).json();

export const createChatbot = async (data) =>
  ky.post("/api/chatbots", { json: data }).json();

export const createChatbotMessage = async (id, data) =>
  ky
    .post(`/api/chatbots/${id}/messages`, {
      json: { ...data },
      timeout: 60000,
    })
    .json();

export const createPromptTemplate = (data) =>
  ky.post("/api/prompt-templates", { json: data }).json();

export const getChatbotById = async (id) =>
  ky.get(`/api/chatbots/${id}`).json();

export const getChatbots = async () => ky.get("/api/chatbots").json();

export const getDatasources = async () => ky.get("/api/datasources").json();

export const getMessagesByChatbotId = async (chatbotId) =>
  ky.get(`/api/chatbots/${chatbotId}/messages`).json();

export const getPromptVariables = (string) => {
  let variables = [];
  let regex = /{{(.*?)}}/g;
  let match;

  while ((match = regex.exec(string))) {
    variables.push(match[1].trim());
  }

  return variables;
};

export const getPrompTemplates = async () =>
  ky.get("/api/prompt-templates").json();

export const removePromptTemplateById = async (id) =>
  ky.delete(`/api/prompt-templates/${id}`).json();

export const removeChatbotById = async (id) =>
  ky.delete(`/api/chatbots/${id}`).json();

export const removeDatasourceById = async (id) =>
  ky.delete(`/api/datasources/${id}`).json();

export const sendChatMessage = async ({ id, message, history }) =>
  ky
    .post(`/api/v1/chatbots/${id}`, {
      json: { message, history },
      timeout: 60000,
    })
    .json();

export const updateChatbotById = async (id, data) =>
  ky
    .patch(`/api/chatbots/${id}`, {
      json: { ...data },
    })
    .json();
