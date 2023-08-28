import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import {
  Button,
  Center,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { useAsync, useAsyncFn } from "react-use";
import { getPrompTemplates, updateChatbotById } from "../../lib/api";
import { TbChevronDown } from "react-icons/tb";

export default function AssignPromptTemplate({ chatbot, onChange }) {
  const popoverBackgroundColor = useColorModeValue("white", "#2F3239");
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { loading: isLoading, value: promptTemplates = [] } =
    useAsync(async () => {
      const { data } = await getPrompTemplates();

      return data;
    }, []);

  const [{ loading: isSelectingPromptTemplate }, handleSelect] = useAsyncFn(
    async (promptTemplateId) => {
      onToggle();
      const { id, chatbotData } = chatbot;
      const { data } = await updateChatbotById(id, {
        ...chatbotData,
        promptTemplateId: promptTemplateId || null,
      });

      onChange(data);
    },
    [onChange, onToggle, updateChatbotById]
  );

  return (
    <Stack spacing={1} alignItems="flex-start">
      <Text fontSize="sm" fontWeight={500} color="gray.500">
        Prompt templates
      </Text>
      <Popover placement="bottom-start" isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <Button
            onClick={onToggle}
            fontWeight="normal"
            size="sm"
            isLoading={isLoading || isSelectingPromptTemplate}
            rightIcon={<Icon as={TbChevronDown} />}
          >
            {promptTemplates.find(({ id }) => id === chatbot.promptTemplateId)
              ?.name || "Select template"}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          maxWidth="3xs"
          backgroundColor={popoverBackgroundColor}
          overflow="hidden"
        >
          <PopoverCloseButton />
          <PopoverHeader fontSize="sm" fontWeight="500">
            Prompt templates
          </PopoverHeader>
          <PopoverBody
            fontSize="sm"
            paddingX={1}
            maxHeight="200px"
            overflowY="auto"
          >
            <Stack>
              {isLoading && (
                <Center marginY={10}>
                  <Spinner size="sm" />
                </Center>
              )}
              <Button
                size="sm"
                variant="ghost"
                fontWeight="normal"
                justifyContent="flex-start"
                onClick={() => handleSelect()}
              >
                None
              </Button>
              {!isLoading &&
                promptTemplates.map(({ id, name }) => (
                  <Button
                    key={id}
                    size="sm"
                    variant="ghost"
                    fontWeight="normal"
                    justifyContent="flex-start"
                    onClick={() => handleSelect(id)}
                  >
                    {name}
                  </Button>
                ))}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Stack>
  );
}

AssignPromptTemplate.propTypes = {
  chatbot: PropTypes.object,
  onChange: PropTypes.func,
};
