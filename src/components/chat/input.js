import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Container,
  HStack,
  Icon,
  IconButton,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbSend } from "react-icons/tb";
import autosize from "autosize";
import { BeatLoader } from "react-spinners";

export default function ChatInput({ isLoading, onSubmit, ...properties }) {
  const backgroundColor = useColorModeValue("gray.100", "gray.700");
  const backgroundGradient = useColorModeValue(
    "linear(to-t, white, transparent)",
    "linear(to-t, gray.800, transparent)"
  );
  const loaderColor = useColorModeValue("gray.100", "white");
  const iconColor = useColorModeValue("gray.500", "white");
  const [message, setMessage] = useState();
  const textareaReference = useRef();

  const handleKeyDown = useCallback(
    (event) => {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();

        onSubmit(message);
        setMessage("");

        autosize.destroy(textareaReference?.current);
      }
    },
    [message, onSubmit]
  );

  useEffect(() => {
    const ref = textareaReference?.current;

    autosize(ref);

    return () => {
      autosize.destroy(ref);
    };
  }, []);

  useEffect(() => {
    const ref = textareaReference?.current;

    if (!isLoading) {
      ref.focus();
    }
  }, [isLoading]);

  return (
    <Box {...properties} bgGradient={backgroundGradient}>
      <Container alignSelf="center" maxWidth="4xl">
        <HStack
          backgroundColor={backgroundColor}
          borderWidth="1px"
          paddingY={2}
          paddingLeft={4}
          paddingRight={2}
          borderRadius="md"
          alignItems="center"
        >
          <Textarea
            ref={textareaReference}
            isDisabled={isLoading}
            autoFocus={!isLoading && true}
            variant="unstyled"
            value={message}
            fontWeight={500}
            placeholder="Send a message"
            onKeyDown={handleKeyDown}
            backgroundColor="transparent"
            onChange={(event) => setMessage(event.target.value)}
            flex={1}
            rows={1}
            size="sm"
            outline="none"
            resize="none"
          />
          {isLoading ? (
            <Stack
              alignSelf="flex-end"
              alignItems="center"
              justifyContent="center"
              height="30px"
            >
              <BeatLoader color={loaderColor} size={5} />
            </Stack>
          ) : (
            <IconButton
              alignSelf="flex-end"
              variant="ghost"
              size="sm"
              onClick={() => onSubmit(message)}
              icon={<Icon as={TbSend} color={iconColor} fontSize="lg" />}
            />
          )}
        </HStack>
      </Container>
    </Box>
  );
}

ChatInput.propTypes = {
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
};
