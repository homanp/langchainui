"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Center,
  Container,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Tr,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbPlus, TbTrashX } from "react-icons/tb";
import { useAsync } from "react-use";
import { useForm } from "react-hook-form";
import PageHeader from "../../../components/page-header";
import { useSidebar } from "../../../lib/sidebar";
import {
  createChatbot,
  getChatbots,
  getDatasources,
  getPrompTemplates,
  removeChatbotById,
} from "../../../lib/api";

export default function ChatbotsClientPage() {
  const [showForm, setShowForm] = useState();
  const [chatbots, setChatbots] = useState([]);
  const [promptTemplates, setPromptTemplates] = useState([]);
  const [datasources, setDatasources] = useState([]);
  const buttonColorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
  const buttonBackgroundColor = useColorModeValue("black", "white");
  const borderBottomColor = useColorModeValue("gray.50", "#333");
  const router = useRouter();
  const menu = useSidebar();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm();

  const { loading: isLoading } = useAsync(async () => {
    const [
      { data: chatbots },
      { data: promptTemplates },
      { data: datasources },
    ] = await Promise.all([
      getChatbots(),
      getPrompTemplates(),
      getDatasources(),
    ]);

    setChatbots(chatbots);
    setPromptTemplates(promptTemplates);
    setDatasources(datasources);

    return;
  }, [getChatbots, getPrompTemplates, setChatbots]);

  const handleRemoveChatbot = useCallback(async (chatbotId) => {
    await removeChatbotById(chatbotId);

    setChatbots((prev) => prev.filter(({ id }) => id !== chatbotId));
  }, []);

  const onSubmit = useCallback(
    async (values) => {
      const { name, promptTemplateId, datasourceId } = values;
      const { data: chatbot } = await createChatbot({
        name,
        promptTemplateId: parseInt(promptTemplateId),
        datasourceId: parseInt(datasourceId),
      });

      router.push(`/app/chatbots/${chatbot.id}`);
    },
    [router]
  );

  return (
    <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "chatbots").icon}
        title="Chatbots"
      >
        <HStack>
          <Button
            leftIcon={<Icon as={TbPlus} />}
            colorScheme={buttonColorScheme}
            backgroundColor={buttonBackgroundColor}
            size="sm"
            onClick={() => setShowForm(true)}
            isLoading={isSubmitting}
            loadingText="Creating..."
          >
            New chatbot
          </Button>
        </HStack>
      </PageHeader>
      {isLoading && (
        <Center flex={1}>
          <Spinner size="sm" />
        </Center>
      )}
      {!isLoading && !showForm && (
        <TableContainer>
          <Table size="sm">
            <Tbody>
              {chatbots.map(({ id, name }) => (
                <Tr key={id}>
                  <Td
                    cursor="pointer"
                    _hover={{ opacity: 0.5 }}
                    borderBottomColor={borderBottomColor}
                  >
                    <Link href={`/app/chatbots/${id}`}>{name}</Link>
                  </Td>
                  <Td textAlign="right" borderBottomColor={borderBottomColor}>
                    <IconButton
                      size="sm"
                      icon={<Icon as={TbTrashX} fontSize="lg" />}
                      variant="ghost"
                      onClick={() => handleRemoveChatbot(id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {showForm && (
        <Center flex={1}>
          <Container maxWidth="md" as="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              <Stack spacing={1}>
                <Icon
                  fontSize="2xl"
                  as={menu.find(({ id }) => id === "chatbots").icon}
                />
                <Text>New chatbot</Text>
                <Text fontSize="sm" color="gray.500">
                  Create a new chatbot
                </Text>
              </Stack>
              <Stack spacing={3}>
                <FormControl isInvalid={errors?.name}>
                  <Input
                    size="sm"
                    placeholder="My chatbot..."
                    {...register("name", { required: true })}
                  />
                </FormControl>
                <FormControl>
                  <Select
                    size="sm"
                    {...register("promptTemplateId")}
                    placeholder="Select prompt template"
                  >
                    {promptTemplates.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <Select
                    size="sm"
                    {...register("datasourceId")}
                    placeholder="Select a datasource"
                  >
                    {datasources.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <HStack justifyContent="flex-end">
                <Button variant="ghost" size="sm" onClick={() => setShowForm()}>
                  Cancel
                </Button>
                <Button
                  colorScheme={buttonColorScheme}
                  backgroundColor={buttonBackgroundColor}
                  type="sumbit"
                  size="sm"
                  isLoading={isSubmitting}
                >
                  Save
                </Button>
              </HStack>
            </Stack>
          </Container>
        </Center>
      )}
    </Stack>
  );
}
