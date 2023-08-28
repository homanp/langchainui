import React, { useRef } from "react";
import {
  Avatar,
  Box,
  Code,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import remarkGfm from "remark-gfm";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { BeatLoader } from "react-spinners";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { TbCopy } from "react-icons/tb";
import { MemoizedReactMarkdown } from "../../lib/markdown";

export default function Message({ agent, message, isLastMessage }) {
  const loaderColor = useColorModeValue("gray.100", "white");
  const lastMessageReference = useRef();
  const unevenBackgroundColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      ref={isLastMessage ? lastMessageReference : undefined}
      backgroundColor={agent && unevenBackgroundColor}
      padding={4}
    >
      <HStack spacing={6} maxWidth="4xl" marginX="auto" alignItems="center">
        <Avatar
          borderRadius="md"
          src={agent && "/chatbot.png"}
          name={!agent && "User"}
          size="xs"
          alignSelf="flex-start"
        />
        <Stack spacing={4} fontSize="sm" flex={1}>
          {message ? (
            <MemoizedReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const value = String(children).replace(/\n$/, "");
                  const match = /language-(\w+)/.exec(className || "");

                  const handleCopyCode = () => {
                    navigator.clipboard.writeText(value);
                  };

                  return !inline ? (
                    <Box position="relative">
                      <HStack position="absolute" top={2} right={2}>
                        <Text fontSize="xs">{match && match[1]}</Text>
                        <IconButton
                          size="sm"
                          icon={<Icon as={TbCopy} fontSize="lg" />}
                          onClick={() => handleCopyCode()}
                        />
                      </HStack>
                      <SyntaxHighlighter
                        customStyle={{
                          fontSize: "12px",
                        }}
                        codeTagProps={{
                          style: {
                            lineHeight: "inherit",
                            fontSize: "inherit",
                          },
                        }}
                        style={dracula}
                        language={(match && match[1]) || ""}
                      >
                        {value}
                      </SyntaxHighlighter>
                    </Box>
                  ) : (
                    <Code fontSize="sm" className={className} {...props}>
                      {children}
                    </Code>
                  );
                },
              }}
              remarkPlugins={[remarkGfm]}
            >
              {message}
            </MemoizedReactMarkdown>
          ) : (
            <BeatLoader color={loaderColor} size={8} />
          )}
        </Stack>
      </HStack>
    </Box>
  );
}

Message.propTypes = {
  agent: PropTypes.string,
  message: PropTypes.string,
  isLastMessage: PropTypes.bool,
};
