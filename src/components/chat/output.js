import React, { useEffect, useRef } from "react";
import { Box, Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Message from "./message";

export default function ChatOuput({
  messages,
  newMessage,
  isLoading,
  ...properties
}) {
  const lastMessageReference = useRef();

  useEffect(() => {
    if (lastMessageReference?.current) {
      lastMessageReference?.current.scrollIntoView();
    }
  }, [messages]);

  const showAIMessage = isLoading || newMessage;

  return (
    <Stack flex={1} maxWidth="100%" {...properties}>
      <Stack spacing={0}>
        {messages.map(({ agent, data: { response } }, index) => (
          <Message
            key={index}
            agent={agent}
            message={response}
            isLastMessage={index + 1 === messages.length}
          />
        ))}
        {showAIMessage && (
          <Box ref={lastMessageReference}>
            <Message agent="ai" message={newMessage} isLastMessage={true} />
          </Box>
        )}
      </Stack>
    </Stack>
  );
}

ChatOuput.propTypes = {
  messages: PropTypes.array,
  newMessage: PropTypes.string,
  isLoading: PropTypes.bool,
};
