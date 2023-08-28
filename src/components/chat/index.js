import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Stack } from "@chakra-ui/react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { createChatbotMessage } from "../../lib/api";
import ChatInput from "./input";
import ChatOuput from "./output";

const API_URL = process.env.NEXT_PUBLIC_LANGCHAIN_UI_API_URL;

export default function Chat({ id, ...properties }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [isSendingMessage, setIsSendingMessage] = useState();
  const decoder = new TextDecoder();

  const onSubmit = useCallback(
    async (values) => {
      let message = "";

      setIsSendingMessage(true);
      setMessages((previousMessages) => [
        ...previousMessages,
        { data: { response: values } },
      ]);

      createChatbotMessage(id, {
        message: values,
        agent: "user",
      });

      await fetchEventSource(`${API_URL}chatbots/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: values,
        }),
        async onmessage(event) {
          if (event.data !== "CLOSE") {
            message += event.data === "" ? `${event.data} \n` : event.data;
            setNewMessage(message);
          }

          if (event.data === "CLOSE") {
            setMessages((previousMessages) => [
              ...previousMessages,
              { agent: "ai", data: { response: message } },
            ]);

            createChatbotMessage(id, {
              message,
              agent: "ai",
            });

            setNewMessage();
          }
        },
      });
      setIsSendingMessage();
    },
    [id]
  );

  return (
    <Stack
      {...properties}
      minHeight="100vh"
      maxHeight="100vh"
      spacing={6}
      position="relative"
    >
      <ChatOuput
        isLoading={isSendingMessage}
        messages={messages}
        newMessage={newMessage}
        overflowY="auto"
        paddingBottom={40}
      />
      <ChatInput
        position="absolute"
        bottom="0"
        width="100%"
        isLoading={isSendingMessage}
        onSubmit={onSubmit}
        paddingY={6}
      />
    </Stack>
  );
}
