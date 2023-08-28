import ChatbotClientPage from "./client-page";

export const metadata = {
  title: "Chatbot",
  description: "Manage your chatbot",
};

export default async function ChatbotsPage({ params }) {
  const { chatbotId } = params;

  return <ChatbotClientPage chatbotId={chatbotId} />;
}
